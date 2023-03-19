import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import logo from '../../assets/Images/logo.png';

const isAuthenticated = true;

const MainLayout = () => {
  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Stack spacing={20}>
        <Stack
          sx={{ width: '100%', mb: '40px' }}
          direction="column"
          alignItems="center"
        >
          <img style={{ height: 100, width: 100 }} src={logo} alt="logo" />
        </Stack>
      </Stack>

      <Outlet />
    </Container>
  );
};

export default MainLayout;
