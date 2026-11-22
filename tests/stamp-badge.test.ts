import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StampBadge } from '@/components/ui/StampBadge';

describe('StampBadge Component', () => {
  it('renders default red stamp badge with -2deg rotation and uppercase styling', () => {
    const html = renderToStaticMarkup(
      React.createElement(StampBadge, { label: 'LULUS' })
    );

    expect(html).toContain('LULUS');
    expect(html).toContain('rotate(-2deg)');
    expect(html).toContain('border-[#c4402a]');
    expect(html).toContain('text-[#c4402a]');
    expect(html).toContain('font-mono');
    expect(html).toContain('border-2');
    expect(html).toContain('uppercase');
  });

  it('renders green stamp badge for passing/free badges', () => {
    const html = renderToStaticMarkup(
      React.createElement(StampBadge, { label: 'RESMI BKN', variant: 'green' })
    );

    expect(html).toContain('RESMI BKN');
    expect(html).toContain('border-[#2f5a44]');
    expect(html).toContain('text-[#2f5a44]');
  });

  it('renders amber stamp badge for warning/attention items', () => {
    const html = renderToStaticMarkup(
      React.createElement(StampBadge, { label: 'AMBANG BATAS', variant: 'amber' })
    );

    expect(html).toContain('AMBANG BATAS');
    expect(html).toContain('border-[#b67a18]');
    expect(html).toContain('text-[#b67a18]');
  });

  it('renders neutral stamp badge for archived/standard tags', () => {
    const html = renderToStaticMarkup(
      React.createElement(StampBadge, { label: 'TERTUTUP', variant: 'neutral' })
    );

    expect(html).toContain('TERTUTUP');
    expect(html).toContain('border-[#4b463d]');
    expect(html).toContain('text-[#4b463d]');
  });

  it('supports custom rotation angle and extra className', () => {
    const html = renderToStaticMarkup(
      React.createElement(StampBadge, {
        label: 'CUSTOM',
        rotate: 4,
        className: 'extra-test-class',
      })
    );

    expect(html).toContain('rotate(4deg)');
    expect(html).toContain('extra-test-class');
  });
});
