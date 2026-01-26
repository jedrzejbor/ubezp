import React, { useState } from 'react';
import { Box } from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SxProps, Theme } from '@mui/system';
import shieldSvg from '@/assets/shield.svg';

const ShieldIcon: React.FC<SvgIconProps> = (props) => {
  const [failed, setFailed] = useState(false);
  const { sx, fontSize } = props as { sx?: SxProps<Theme>; fontSize?: SvgIconProps['fontSize'] };

  let resolvedSize = 24;
  if (fontSize === 'small') resolvedSize = 20;

  if (sx && typeof sx === 'object' && !Array.isArray(sx)) {
    const maybeFontSize = (sx as { fontSize?: number | string }).fontSize;
    if (typeof maybeFontSize === 'number') {
      resolvedSize = maybeFontSize;
    } else if (typeof maybeFontSize === 'string') {
      const parsed = parseInt(maybeFontSize, 10);
      if (!Number.isNaN(parsed)) resolvedSize = parsed;
    }
  }

  if (failed) {
    // fallback: simple box placeholder
    return <Box sx={{ width: resolvedSize, height: resolvedSize, bgcolor: 'divider' }} />;
  }

  return (
    <Box
      component="img"
      src={shieldSvg}
      alt="shield"
      onError={() => setFailed(true)}
      sx={{ width: resolvedSize, height: resolvedSize, display: 'block', ...(sx as object) }}
    />
  );
};

export default ShieldIcon;
