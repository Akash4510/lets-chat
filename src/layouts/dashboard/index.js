import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import SideBar from './SideBar';
import { socket, connectSocket } from '../../socket';
import {
  SelectConversation,
  ShowSnackbar,
  FetchUserProfile,
} from '../../redux/slices/app';
import {
  AddDirectMessage,
  AddDirectConversation,
  UpdateDirectConversations,
} from '../../redux/slices/conversations';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');

  const { isLoggedIn, userId } = useSelector((state) => state.auth);
  const { conversations, currentConversation } = useSelector(
    (state) => state.conversation.directChat
  );

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = () => {
        if (!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
        }
      };

      window.onload();

      if (!socket) {
        connectSocket(userId);
      }

      socket.on('friend_request_sent', (data) => {
        dispatch(ShowSnackbar({ severity: 'success', message: data.message }));
      });

      socket.on('new_friend_request', (data) => {
        dispatch(ShowSnackbar({ severity: 'success', message: data.message }));
      });

      socket.on('accept_friend_request', (data) => {
        dispatch(
          ShowSnackbar({
            severity: 'success',
            message: 'Friend Request Accepted',
          })
        );
      });

      socket.on('new_message', (data) => {
        const message = data.message;
        const conversationId = data.conversationId;

        console.log('Current Conversation: ', currentConversation);
        console.log(`${message.from} sent a message to ${message.to}`);

        if (currentConversation?.id === conversationId) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: 'msg',
              subtype: message.type,
              message: message.text,
              incoming: message.to === userId,
              outgoing: message.from === userId,
            })
          );
        }
      });

      socket.on('start_chat', (data) => {
        console.log(data);
        const existingConversation = conversations.find(
          (item) => item?.id === data._id
        );

        if (existingConversation) {
          dispatch(UpdateDirectConversations({ conversation: data }));
        } else {
          dispatch(AddDirectConversation({ conversation: data }));
        }

        dispatch(SelectConversation({ roomId: data._id }));
      });
    }

    return () => {
      socket?.off('friend_request_sent');
      socket?.off('new_friend_request');
      socket?.off('accept_friend_request');
      socket?.off('new_message');
      socket?.off('start_chat');
    };
  }, [isLoggedIn, socket, currentConversation, conversations, dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      {isDesktop && <SideBar />}

      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
