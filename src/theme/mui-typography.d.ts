import type { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: CSSProperties;
  }
}

// Update the Typography's allowed `variant` prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}
