import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ReplyMsg = ({ item }) => {
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
        <Stack spacing={1}>
          <Stack
            direction="column"
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              padding: '6px 12px',
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
              color={theme.palette.text.primary}
            >
              {item.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            fontWeight={500}
            color={item.incoming ? theme.palette.text.primary : '#fff'}
          >
            {item.reply}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ReplyMsg;
