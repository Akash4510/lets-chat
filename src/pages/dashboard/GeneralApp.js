import React from 'react';
import { useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Chats from './Chats';
import Conversation from '../../components/Conversation';
import Contact from '../../components/Contact';
import SharedMessages from '../../components/SharedMessages';
import StarredMessages from '../../components/StarredMessages';
import { useSelector } from 'react-redux';

const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar } = useSelector((store) => store.app);

  return (
    <Stack direction="row">
      <Chats />

      <Box
        sx={{
          height: '100vh',
          minWidth: sideBar.open
            ? 'calc(100vw - 770px)'
            : 'calc(100vw - 420px)',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#f1f5ff'
              : theme.palette.background.default,
        }}
      >
        <Conversation />
      </Box>

      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case 'CONTACT':
              return <Contact />;

            case 'SHARED':
              return <SharedMessages />;

            case 'STARRED':
              return <StarredMessages />;

            default:
              return <Contact />;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
