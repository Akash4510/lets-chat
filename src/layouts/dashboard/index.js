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
  UpdateConversationStatus,
} from '../../redux/slices/conversations';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');

  const { isLoggedIn, userId } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
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

      // Socket.on event listeners
      socket.on('user_connected', (data) => {
        const userId = data.userId;
        dispatch(UpdateConversationStatus({ userId, status: 'online' }));
      });

      socket.on('user_disconnected', (data) => {
        const userId = data.userId;
        dispatch(UpdateConversationStatus({ userId, status: 'offline' }));
      });

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

        // Update the receiver's conversation state
        const receiverConversationIndex = conversations.findIndex(
          (item) => item?.id === conversationId && item?.userId !== userId
        );

        if (receiverConversationIndex !== -1) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: 'msg',
              subtype: message.type,
              message: message.text,
              incoming: message.to === userId,
              outgoing: message.from === userId,
              time: message.createdAt,
              conversationId,
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
      // Clean up other socket.on event listeners...
      socket?.off('friend_request_sent');
      socket?.off('new_friend_request');
      socket?.off('accept_friend_request');
      socket?.off('new_message');
      socket?.off('start_chat');
    };
  }, [isLoggedIn, socket, dispatch]);

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
