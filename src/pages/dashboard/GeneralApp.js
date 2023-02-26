import React from 'react';
import { useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Conversation from '../../components/Conversation';
import Chats from './Chats';

const GeneralApp = () => {
  const theme = useTheme();
  return (
    <Stack direction="row">
      <Chats />

      <Box
        sx={{
          height: '100vh',
          minWidth: 'calc(100vw - 420px)',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#f1f5ff'
              : theme.palette.background.default,
        }}
      >
        <Conversation />
      </Box>
    </Stack>
  );
};

export default GeneralApp;
