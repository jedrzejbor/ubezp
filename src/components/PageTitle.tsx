import React from 'react';
import { Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/system';

interface PageTitleProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Reusable page title that applies the Figma-provided mobile H4 styles.
 * Use this for top-level page headings to keep styling consistent.
 */
const PageTitle: React.FC<PageTitleProps> = ({ children, sx }) => {
  return (
    <Typography
      component="h1"
      sx={{
        color: 'var(--Text-Primary, #32343A)',
        fontFeatureSettings: `"liga" off, "clig" off`,
        fontFamily: 'Roboto, Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 300,
        lineHeight: '123.5%',
        letterSpacing: '0.25px',
        ...((sx as object) || {})
      }}
    >
      {children}
    </Typography>
  );
};

export default PageTitle;
