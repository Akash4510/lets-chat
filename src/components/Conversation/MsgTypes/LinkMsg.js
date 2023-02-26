import React from 'react';
import { Stack, Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LinkMsg = ({ item }) => {
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
        <Stack
          spacing={2}
          alignItems="left"
          sx={{
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#f1f5ff'
                : theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <img
            src={item.preview}
            alt={item.message}
            style={{ maxHeight: 210, borderRadius: '10px' }}
          />

          <Stack spacing={1}>
            <Typography variant="subtitle2">Creating chat app</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
              component={Link}
              to="//https:/www.youtube.com/"
            >
              www.youtube.com
            </Typography>
          </Stack>
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

export default LinkMsg;
