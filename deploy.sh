#!/bin/bash
# ==============================================================================
# BEDAHSOAL - Multi-Exam CBT Platform - Smart Deployment Script
# Karakteristik: "Hanya Build Saat Dibutuhkan" (Zero-Waste Rebuild)
# ==============================================================================

set -e

# Warna terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m' # No Color

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Muat variabel dari .env jika ada agar konfigurasi port dan environment selaras
if [ -f .env ]; then
    set -a
    source .env 2>/dev/null || true
    set +a
fi

echo -e "${CYAN}========================================================================${NC}"
echo -e "${CYAN}  ____  _____ ____    _    _   _   ____   ___    _    _     ${NC}"
echo -e "${CYAN} | __ )| ____|  _ \  / \  | | | | / ___| / _ \  / \  | |    ${NC}"
echo -e "${CYAN} |  _ \|  _| | | | |/ _ \ | |_| | \___ \| | | |/ _ \ | |    ${NC}"
echo -e "${CYAN} | |_) | |___| |_| / ___ \|  _  |  ___) | |_| / ___ \| |___ ${NC}"
echo -e "${CYAN} |____/|_____|____/_/   \_\_| |_| |____/ \___/_/   \_\_____|${NC}"
echo -e "${CYAN}                                                         ${NC}"
echo -e "${BOLD}${CYAN}🎯 BEDAHSOAL CBT PLATFORM - SMART DEPLOYMENT${NC}"
echo -e "${CYAN}   Zero-Waste Rebuild & Intelligent Change Detection${NC}"
echo -e "${CYAN}========================================================================${NC}"

# ------------------------------------------------------------------------------
# 0. Evaluasi Argumen CLI
# ------------------------------------------------------------------------------
CHECK_ONLY=false
FORCE_MODE="AUTO" # AUTO | TOTAL

print_help() {
    echo -e "${BOLD}Penggunaan:${NC} ./deploy.sh [OPSI]"
    echo ""
    echo -e "${BOLD}Opsi:${NC}"
    echo -e "  ${GREEN}(tanpa opsi)${NC}                  Auto-detect cerdas: otomatis mendeteksi apakah butuh"
    echo -e "                                Build Image Baru atau Skip Build (Zero-Waste Rebuild)."
    echo -e "  ${YELLOW}--check, -c, --status${NC}         Mode cek (dry-run): hanya analisa perubahan tanpa build/deploy."
    echo -e "  ${YELLOW}--total, --full, -t, --build${NC}  Paksa BUILD TOTAL (rebuild seluruh Docker multi-stage image)."
    echo -e "  ${YELLOW}--help, -h${NC}                    Tampilkan panduan bantuan ini."
    exit 0
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --help|-h)
            print_help
            ;;
        --check|-c|--status)
            CHECK_ONLY=true
            shift
            ;;
        --total|--full|-t|--build|-b|rebuild)
            FORCE_MODE="TOTAL"
            shift
            ;;
        *)
            echo -e "${YELLOW}⚠️  Argumen tidak dikenal: $1. Melanjutkan dengan mode auto-detect.${NC}"
            shift
            ;;
    esac
done

# ------------------------------------------------------------------------------
# 1. Deteksi Command Docker Compose
# ------------------------------------------------------------------------------
DOCKER_COMPOSE=""
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
    DOCKER_COMPOSE="docker-compose"
fi

if [ "$CHECK_ONLY" = false ]; then
    if [ -z "$DOCKER_COMPOSE" ]; then
        echo -e "${RED}❌ Docker Compose tidak ditemukan di sistem! Silakan install docker compose.${NC}"
        exit 1
    fi
    echo -e "${BLUE}ℹ️  Menggunakan binary:${NC} $DOCKER_COMPOSE"
elif [ -n "$DOCKER_COMPOSE" ]; then
    echo -e "${BLUE}ℹ️  Terdeteksi binary:${NC} $DOCKER_COMPOSE"
fi

# ------------------------------------------------------------------------------
# 2. Update dari Git (jika berada di git repository dan bukan mode check)
# ------------------------------------------------------------------------------
if [ -d ".git" ] && [ "$CHECK_ONLY" = false ]; then
    echo -e "\n${BLUE}🔄 Memeriksa pembaruan dari repository Git (origin/main)...${NC}"
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
    if git remote get-url origin >/dev/null 2>&1; then
        git fetch origin "$CURRENT_BRANCH" --quiet || true
        LOCAL_HASH=$(git rev-parse HEAD 2>/dev/null || echo "")
        REMOTE_HASH=$(git rev-parse "origin/$CURRENT_BRANCH" 2>/dev/null || echo "")

        if [ -n "$REMOTE_HASH" ] && [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
            echo -e "${YELLOW}📥 Ditemukan commit baru di remote. Melakukan sinkronisasi bersih bebas konflik...${NC}"
            git merge --abort 2>/dev/null || true
            git rebase --abort 2>/dev/null || true
            git reset --hard "origin/$CURRENT_BRANCH"
            git stash clear 2>/dev/null || true
            echo -e "${GREEN}✓ Sinkronisasi Git selesai tanpa konflik (${REMOTE_HASH:0:7}).${NC}"
        else
            echo -e "${GREEN}✓ Kode lokal sudah up-to-date dengan remote.${NC}"
        fi
    else
        echo -e "${CYAN}ℹ️  Remote git 'origin' belum terkonfigurasi. Melewati git sync.${NC}"
    fi
fi

# ------------------------------------------------------------------------------
# 3. Logika Analisis Perubahan: Granular Component Hash Calculation
# ------------------------------------------------------------------------------
hash_string() {
    if command -v shasum >/dev/null 2>&1; then
        shasum 2>/dev/null | awk '{print $1}'
    elif command -v sha1sum >/dev/null 2>&1; then
        sha1sum 2>/dev/null | awk '{print $1}'
    elif command -v md5sum >/dev/null 2>&1; then
        md5sum 2>/dev/null | awk '{print $1}'
    else
        cksum 2>/dev/null | awk '{print $1}'
    fi
}

calc_component_hash() {
    local paths=("$@")
    if command -v git >/dev/null 2>&1 && [ -d ".git" ]; then
        local tree_hashes=""
        for p in "${paths[@]}"; do
            if [ -e "$p" ]; then
                local clean_p="${p%/}"
                local h
                h=$(git rev-parse "HEAD:$clean_p" 2>/dev/null || echo "untracked")
                tree_hashes="${tree_hashes}:${p}=${h}"
            fi
        done
        local status_diff
        status_diff=$(git status --porcelain -- "${paths[@]}" 2>/dev/null || echo "")
        echo "${tree_hashes}_${status_diff}" | hash_string
    else
        find "${paths[@]}" -type f 2>/dev/null | sort | xargs shasum 2>/dev/null | hash_string
    fi
}

# Daftar path pembentuk komponen
DEPS_PATHS=(
    "Dockerfile"
    "docker-compose.yml"
    ".dockerignore"
    "package.json"
    "package-lock.json"
    "prisma/schema.prisma"
)

APP_PATHS=(
    "src/"
    "public/"
    "next.config.ts"
    "tsconfig.json"
)

STATE_FILE=".last_docker_build_state"
LEGACY_HASH_FILE=".last_docker_build_hash"

LAST_DEPS_HASH=""
LAST_APP_HASH=""
LAST_COMPOSITE_HASH=""
LAST_BUILD_DATE=""
LAST_BUILD_TYPE=""

if [ -f "$STATE_FILE" ]; then
    LAST_DEPS_HASH=$(grep "^LAST_DEPS_HASH=" "$STATE_FILE" 2>/dev/null | cut -d'=' -f2- || echo "")
    LAST_APP_HASH=$(grep "^LAST_APP_HASH=" "$STATE_FILE" 2>/dev/null | cut -d'=' -f2- || echo "")
    LAST_COMPOSITE_HASH=$(grep "^LAST_COMPOSITE_HASH=" "$STATE_FILE" 2>/dev/null | cut -d'=' -f2- || echo "")
    LAST_BUILD_DATE=$(grep "^LAST_BUILD_TIMESTAMP=" "$STATE_FILE" 2>/dev/null | cut -d'=' -f2- || echo "")
    LAST_BUILD_TYPE=$(grep "^LAST_BUILD_TYPE=" "$STATE_FILE" 2>/dev/null | cut -d'=' -f2- || echo "")
elif [ -f "$LEGACY_HASH_FILE" ]; then
    LAST_COMPOSITE_HASH=$(cat "$LEGACY_HASH_FILE" 2>/dev/null || echo "")
fi

# Hitung hash terkini
CUR_DEPS_HASH=$(calc_component_hash "${DEPS_PATHS[@]}")
CUR_APP_HASH=$(calc_component_hash "${APP_PATHS[@]}")
CUR_COMPOSITE_HASH=$(echo "${CUR_DEPS_HASH}:${CUR_APP_HASH}" | hash_string)

# Cek keberadaan Image Docker di lokal
IMAGE_EXISTS=false
if command -v docker >/dev/null 2>&1; then
    if docker image inspect bedahsoal-cbt:latest >/dev/null 2>&1; then
        IMAGE_EXISTS=true
    fi
elif [ -n "$DOCKER_COMPOSE" ]; then
    if $DOCKER_COMPOSE images -q cbt-app 2>/dev/null | grep -q . ; then
        IMAGE_EXISTS=true
    fi
fi

# Evaluasi status perubahan per komponen
DEPS_CHANGED=false
APP_CHANGED=false

if [ -z "$LAST_DEPS_HASH" ] || [ "$CUR_DEPS_HASH" != "$LAST_DEPS_HASH" ]; then
    DEPS_CHANGED=true
fi

if [ -z "$LAST_APP_HASH" ] || [ "$CUR_APP_HASH" != "$LAST_APP_HASH" ]; then
    APP_CHANGED=true
fi

# Jika hanya ada legacy composite hash file
if [ -n "$LAST_COMPOSITE_HASH" ] && [ -z "$LAST_DEPS_HASH" ]; then
    if [ "$CUR_COMPOSITE_HASH" = "$LAST_COMPOSITE_HASH" ]; then
        DEPS_CHANGED=false
        APP_CHANGED=false
    else
        DEPS_CHANGED=true
        APP_CHANGED=true
    fi
fi

# ------------------------------------------------------------------------------
# 4. Matriks Keputusan Build Cerdas (Zero-Waste)
# ------------------------------------------------------------------------------
DECIDED_BUILD="NONE" # NONE | TOTAL
BUILD_REASON=""

if [ "$FORCE_MODE" = "TOTAL" ]; then
    DECIDED_BUILD="TOTAL"
    BUILD_REASON="Permintaan eksplisit pengguna (--total / --full / -t / --build)"
else
    # Mode AUTO DETECT
    if [ "$IMAGE_EXISTS" = false ]; then
        DECIDED_BUILD="TOTAL"
        BUILD_REASON="Image Docker (bedahsoal-cbt:latest) belum tersedia di host"
    elif [ ! -f "$STATE_FILE" ] && [ ! -f "$LEGACY_HASH_FILE" ]; then
        DECIDED_BUILD="TOTAL"
        BUILD_REASON="Belum ada riwayat build sebelumnya (.last_docker_build_state)"
    elif [ "$DEPS_CHANGED" = true ] && [ "$APP_CHANGED" = true ]; then
        DECIDED_BUILD="TOTAL"
        BUILD_REASON="Terdeteksi perubahan dependensi core dan kode aplikasi"
    elif [ "$DEPS_CHANGED" = true ]; then
        DECIDED_BUILD="TOTAL"
        BUILD_REASON="Terdeteksi perubahan dependensi core (Dockerfile, docker-compose.yml, package.json, prisma)"
    elif [ "$APP_CHANGED" = true ]; then
        DECIDED_BUILD="TOTAL"
        BUILD_REASON="Terdeteksi perubahan kode aplikasi (src/, public/, configs)"
    else
        DECIDED_BUILD="NONE"
        BUILD_REASON="Semua kode sumber dan dependensi up-to-date dan image Docker sudah siap"
    fi
fi

# ------------------------------------------------------------------------------
# 5. Dashboard Visualisasi Hasil Deteksi
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}${CYAN}========================================================================${NC}"
echo -e "${BOLD}${CYAN}🔍 ANALISIS PERUBAHAN & DETEKSI KEBUTUHAN BUILD${NC}"
echo -e "${BOLD}${CYAN}========================================================================${NC}"

# Status Dependensi
if [ "$DEPS_CHANGED" = true ]; then
    echo -e "  • ${YELLOW}[! BERUBAH]${NC}   ${BOLD}Dependensi Core${NC}  (Dockerfile, docker-compose.yml, package.json, prisma)"
    if [ -n "$LAST_DEPS_HASH" ]; then
        echo -e "    ${CYAN}Hash Sebelumnya :${NC} ${LAST_DEPS_HASH:0:16}..."
    fi
    echo -e "    ${CYAN}Hash Terkini    :${NC} ${CUR_DEPS_HASH:0:16}..."
else
    echo -e "  • ${GREEN}[✓ UP-TO-DATE]${NC} ${BOLD}Dependensi Core${NC}  (Dockerfile, docker-compose.yml, package.json, prisma)"
    echo -e "    ${CYAN}Hash Saat Ini   :${NC} ${CUR_DEPS_HASH:0:16}..."
fi

echo ""

# Status Aplikasi
if [ "$APP_CHANGED" = true ]; then
    echo -e "  • ${YELLOW}[! BERUBAH]${NC}   ${BOLD}Kode Aplikasi${NC}    (src/, public/, next.config.ts, tsconfig.json)"
    if [ -n "$LAST_APP_HASH" ]; then
        echo -e "    ${CYAN}Hash Sebelumnya :${NC} ${LAST_APP_HASH:0:16}..."
    fi
    echo -e "    ${CYAN}Hash Terkini    :${NC} ${CUR_APP_HASH:0:16}..."
else
    echo -e "  • ${GREEN}[✓ UP-TO-DATE]${NC} ${BOLD}Kode Aplikasi${NC}    (src/, public/, next.config.ts, tsconfig.json)"
    echo -e "    ${CYAN}Hash Saat Ini   :${NC} ${CUR_APP_HASH:0:16}..."
fi

echo ""

# Status Image Docker
if [ "$IMAGE_EXISTS" = true ]; then
    echo -e "  • ${GREEN}[✓ DITEMUKAN]${NC}  ${BOLD}Docker Image${NC}     (bedahsoal-cbt:latest tersedia di host)"
else
    echo -e "  • ${YELLOW}[! TIDAK ADA]${NC}  ${BOLD}Docker Image${NC}     (bedahsoal-cbt:latest belum dibuild di host)"
fi

echo -e "${CYAN}------------------------------------------------------------------------${NC}"

# Tampilkan Keputusan Build
case "$DECIDED_BUILD" in
    TOTAL)
        echo -e "  🎯 ${BOLD}KEPUTUSAN BUILD:${NC} ${MAGENTA}${BOLD}[BUILD TOTAL / FULL REBUILD]${NC}"
        echo -e "  💡 ${BOLD}Alasan         :${NC} ${BUILD_REASON}"
        echo -e "  ⚡ ${BOLD}Dampak         :${NC} Menjalankan Docker multi-stage build untuk container cbt-app."
        ;;
    NONE)
        echo -e "  🎯 ${BOLD}KEPUTUSAN BUILD:${NC} ${GREEN}${BOLD}[SKIP BUILD / ZERO-WASTE]${NC}"
        echo -e "  💡 ${BOLD}Alasan         :${NC} ${BUILD_REASON}"
        echo -e "  ⚡ ${BOLD}Dampak         :${NC} Menggunakan image Docker yang sudah ada. Start instan (~1-2 detik)!"
        ;;
esac
echo -e "${BOLD}${CYAN}========================================================================${NC}"

# Jika hanya mode check (dry-run), selesai di sini
if [ "$CHECK_ONLY" = true ]; then
    echo -e "\n${GREEN}✓ Mode cek (--check) selesai. Tidak ada proses build atau deploy yang dieksekusi.${NC}"
    exit 0
fi

# ------------------------------------------------------------------------------
# 6. Fungsi Menyimpan State Build Sukses
# ------------------------------------------------------------------------------
save_build_state() {
    local b_type="$1"
    local timestamp
    timestamp=$(date "+%Y-%m-%dT%H:%M:%S%z" 2>/dev/null || date)
    cat <<EOF > "$STATE_FILE"
LAST_BUILD_TIMESTAMP=${timestamp}
LAST_BUILD_TYPE=${b_type}
LAST_DEPS_HASH=${CUR_DEPS_HASH}
LAST_APP_HASH=${CUR_APP_HASH}
LAST_COMPOSITE_HASH=${CUR_COMPOSITE_HASH}
EOF
    echo "$CUR_COMPOSITE_HASH" > "$LEGACY_HASH_FILE"
}

# ------------------------------------------------------------------------------
# 7. Eksekusi Build Sesuai Keputusan
# ------------------------------------------------------------------------------
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

case "$DECIDED_BUILD" in
    TOTAL)
        echo -e "\n${MAGENTA}🔨 [MENJALANKAN BUILD DOCKER]${NC} Membangun image multi-stage cbt-app..."
        $DOCKER_COMPOSE build cbt-app
        save_build_state "TOTAL"
        echo -e "${GREEN}✓ Build Docker cbt-app berhasil diselesaikan.${NC}"
        ;;
    NONE)
        echo -e "\n${GREEN}⚡ [SKIP BUILD / ZERO-WASTE] Menggunakan image Docker yang sudah ada.${NC}"
        ;;
esac

# ------------------------------------------------------------------------------
# 8. Jalankan Container di Background
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}🚀 Menjalankan container layanan cbt-app di latar belakang...${NC}"
$DOCKER_COMPOSE up -d cbt-app

# ------------------------------------------------------------------------------
# 9. Verifikasi Healthcheck Endpoint
# ------------------------------------------------------------------------------
HOST_PORT="${APP_PORT:-3000}"
MAX_RETRIES=25
COUNT=0
HEALTHY=false

echo -e "\n${BLUE}⏳ Menunggu kesiapan server (Healthcheck http://localhost:${HOST_PORT}/api/health)...${NC}"
while [ $COUNT -lt $MAX_RETRIES ]; do
    sleep 2
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${HOST_PORT}/api/health" 2>/dev/null || true)
    if [ -z "$HTTP_CODE" ]; then
        HTTP_CODE="000"
    fi

    if [ "$HTTP_CODE" = "200" ]; then
        HEALTHY=true
        break
    fi
    COUNT=$((COUNT + 1))
    echo -n "."
done
echo ""

if [ "$HEALTHY" = true ]; then
    echo -e "${GREEN}========================================================================${NC}"
    echo -e "${GREEN}🎉 DEPLOYMENT BERHASIL & CBT PLATFORM AKTIF BERJALAN!${NC}"
    echo -e "${GREEN}========================================================================${NC}"
    echo -e "${CYAN}🌐 Web Portal & Ujian :${NC} http://localhost:${HOST_PORT}"
    echo -e "${CYAN}🩺 Healthcheck API     :${NC} http://localhost:${HOST_PORT}/api/health"
    echo -e "${CYAN}📊 Status Container    :${NC} ${GREEN}Running (Healthy)${NC}"
    echo -e "${CYAN}⚡ Deployment Mode     :${NC} ${DECIDED_BUILD}"
    echo -e "${CYAN}========================================================================${NC}"
else
    echo -e "${RED}⚠️  Peringatan: Server belum merespon 200 OK pada http://localhost:${HOST_PORT}/api/health.${NC}"
    echo -e "${YELLOW}📋 Status Container:${NC}"
    $DOCKER_COMPOSE ps
    echo -e "\n${YELLOW}📋 30 Baris Log Container Terakhir:${NC}"
    $DOCKER_COMPOSE logs --tail 30 cbt-app
    echo -e "\n${YELLOW}💡 Untuk memantau log berkelanjutan, jalankan:${NC}"
    echo -e "   $DOCKER_COMPOSE logs -f cbt-app"
    exit 1
fi
