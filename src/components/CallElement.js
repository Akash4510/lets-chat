import React from 'react';
import { Box, Stack, Typography, Avatar, IconButton } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Phone,
  VideoCamera,
} from 'phosphor-react';

const CallElement = ({ name, img, online }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#FFFFFF'
            : alpha(theme.palette.background.default, 0.4),
      }}
      p={2}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={1.5} direction="row" alignItems="center">
          <IconButton>
            <Phone color="green" />
          </IconButton>
          <IconButton>
            <VideoCamera color="green" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

const CallLogElement = ({ name, img, time, online, incoming, missed }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#FFFFFF'
            : alpha(theme.palette.background.default, 0.4),
      }}
      p={2}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {incoming ? (
                <ArrowDownLeft color={missed ? 'red' : 'green'} />
              ) : (
                <ArrowUpRight color={missed ? 'red' : 'green'} />
              )}

              <Typography variant="caption">{time}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton>
          <Phone color="green" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export { CallElement, CallLogElement };
