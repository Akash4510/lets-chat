import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CaretLeft } from 'phosphor-react';
import ProfileForm from '../../sections/settings/ProfileForm';

const Profile = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width: 340,
        height: '100vh',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F1F5FF'
            : theme.palette.background.paper,
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: '100vh' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton>
            <CaretLeft size={24} />
          </IconButton>
          <Typography variant="h5">Profile</Typography>
        </Stack>

        <Stack
          className="no-scrollbar"
          sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}
        >
          <ProfileForm />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;
