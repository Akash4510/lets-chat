import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import SideBar from './SideBar';
import { connectSocket, socket } from '../../socket';
import { ShowSnackbar } from '../../redux/slices/app';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const userId = window.localStorage.getItem('userId');

  useEffect(() => {
    window.onload = () => {
      if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
      }
    };

    if (!socket) {
      connectSocket(userId);

      socket.on('request_send', (data) => {
        dispatch(ShowSnackbar({ severity: 'success', message: data.message }));
      });
      socket.on('new_friend_request', (data) => {
        dispatch(ShowSnackbar({ severity: 'success', message: data.message }));
      });
      socket.on('request_accept', (data) => {
        dispatch(ShowSnackbar({ severity: 'success', message: data.message }));
      });
    }

    return () => {
      socket.off('request_sent');
      socket.off('new_friend_request');
      socket.off('request_accepted');
    };
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
