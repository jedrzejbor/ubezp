import React, { useState } from 'react';
import { Box } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SxProps, Theme } from '@mui/system';

// Local SVG asset used for the home icon
import homeIcon from '@/assets/home-icon.svg';
const FIGMA_HOME_SVG = homeIcon;

const HomeIcon: React.FC<SvgIconProps> = (props) => {
  const [failed, setFailed] = useState(false);
  const { sx, fontSize } = props as { sx?: SxProps<Theme>; fontSize?: SvgIconProps['fontSize'] };

  // Determine size: allow overriding via sx.fontSize (number or numeric string) or fontSize prop
  // Default to 24px to match other icons used in navigation
  let resolvedSize = 24;
  if (fontSize === 'small') resolvedSize = 20;

  if (sx && typeof sx === 'object' && !Array.isArray(sx)) {
    const maybeFontSize = (sx as { fontSize?: number | string }).fontSize;
    if (typeof maybeFontSize === 'number') {
      resolvedSize = maybeFontSize;
    } else if (typeof maybeFontSize === 'string') {
      const parsed = parseInt(maybeFontSize, 10);
      if (!Number.isNaN(parsed)) {
        resolvedSize = parsed;
      }
    }
  }

  if (failed) {
    // fallback to MUI icon so the app always shows an icon
    return (
      <HomeOutlinedIcon
        sx={{
          fontSize: resolvedSize,
          width: resolvedSize,
          height: resolvedSize,
          ...(sx as object)
        }}
      />
    );
  }

  return (
    <Box
      component="img"
      src={FIGMA_HOME_SVG}
      alt="home"
      onError={() => setFailed(true)}
      sx={{ width: resolvedSize, height: resolvedSize, display: 'block', ...(sx as object) }}
    />
  );
};

export default HomeIcon;
