import React, { useRef, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ChatHeader, ChatFooter } from '../Chat';
import Messages from './Message';
import useResponsive from '../../hooks/useResponsive';
import { useSelector } from 'react-redux';

const Conversation = () => {
  const isMobile = useResponsive('between', 'md', 'xs', 'sm');
  const theme = useTheme();

  const messageListRef = useRef(null);
  const { currentMessages } = useSelector(
    (state) => state.conversation.directChat
  );

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [currentMessages]);

  return (
    <Stack height="100%" maxHeight="100vh" width={isMobile ? '100vw' : 'auto'}>
      <ChatHeader />

      <Box
        ref={messageListRef}
        className="no-scrollbar"
        width="100%"
        sx={{
          flexGrow: 1,
          height: '100%',
          overflowY: 'scroll',
          backgroundColor:
            theme.palette.mode === 'light' ? '#FFF' : theme.palette.background,

          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Messages showOptions />
      </Box>

      <ChatFooter />
    </Stack>
  );
};

export default Conversation;
