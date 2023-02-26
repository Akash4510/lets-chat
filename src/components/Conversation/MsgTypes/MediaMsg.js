import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MediaMsg = ({ item }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent={item.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: item.incoming
            ? theme.palette.mode === 'light'
              ? '#f1f5ff'
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Stack spacing={1.5}>
          <img
            src={item.img}
            alt={item.message}
            style={{
              maxHeight: 210,
              borderRadius: '10px',
            }}
          />

          <Typography
            variant="body2"
            fontWeight={500}
            color={item.incoming ? theme.palette.text : '#fff'}
          >
            {item.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default MediaMsg;
