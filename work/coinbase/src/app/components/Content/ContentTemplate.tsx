'use client';
import { Text } from '@coinbase/cds-web/typography';
import { ReactNode } from 'react';

export interface ContentTemplateProps {
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  children?: ReactNode;
}

export const ContentTemplate = ({
  title,
  subtitle,
  headerAction,
  children,
}: ContentTemplateProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        backgroundColor: '#f8f8f8',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      {(title || headerAction) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {title && (
              <Text as="h1" font="title2">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text as="p" font="body" color="fgMuted">
                {subtitle}
              </Text>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};
