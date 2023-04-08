import React from 'react';
import { Box, Stack, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chats from './Chats';
import Conversation from '../../components/Conversation';
import NoChat from '../../assets/Illustration/NoChat';
import Contact from '../../components/Contact';
import SharedMessages from '../../components/SharedMessages';
import StarredMessages from '../../components/StarredMessages';
import { useSelector } from 'react-redux';

const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar, chatType, roomId } = useSelector((store) => store.app);

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
        {chatType === 'individual' && roomId !== null ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: '100%', width: '100%' }}
            alignItems="center"
            justifyContent={'center'}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start a{' '}
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
                to="/"
              >
                new one
              </Link>
            </Typography>
          </Stack>
        )}
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
