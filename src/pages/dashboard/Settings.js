import React, { useState } from 'react';
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Bell,
  CaretLeft,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from 'phosphor-react';
import { faker } from '@faker-js/faker';
import Shortcuts from '../../sections/settings/Shortcuts';

const Settings = () => {
  const theme = useTheme();

  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };
  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };

  const settingsList = [
    {
      icon: <Bell size={20} />,
      title: 'Notifications',
      onclick: () => {},
    },
    {
      icon: <Lock size={20} />,
      title: 'Privacy',
      onclick: () => {},
    },
    {
      icon: <Key size={20} />,
      title: 'Security',
      onclick: () => {},
    },
    {
      icon: <PencilCircle size={20} />,
      title: 'Theme',
      onclick: () => {},
    },
    {
      icon: <Image size={20} />,
      title: 'Chat Wallpaper',
      onclick: () => {},
    },
    {
      icon: <Note size={20} />,
      title: 'Request Account Info',
      onclick: () => {},
    },
    {
      icon: <Keyboard size={20} />,
      title: 'Keyboard Shortcuts',
      onclick: handleOpenShortcuts,
    },
    {
      icon: <Info size={20} />,
      title: 'Help',
      onclick: () => {},
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ width: '100%' }}>
        {/* Left Panel */}
        <Box
          className="no-scrollbar"
          sx={{
            width: 320,
            height: '100vh',
            overflowY: 'scroll',
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#f1f5ff'
                : theme.palette.background.paper,
            boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={3}>
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>

              <Typography variant="h6">Settings</Typography>
            </Stack>

            {/* Profile */}
            <Stack direction="row" spacing={3}>
              <Avatar
                sx={{ width: 52, height: 52 }}
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
              />

              <Stack>
                <Typography variant="article">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2">{faker.random.words()}</Typography>
              </Stack>
            </Stack>

            {/* Options */}
            <Stack spacing={4}>
              {settingsList.map((item, index) => (
                <Stack
                  key={index}
                  spacing={2}
                  sx={{ cursor: 'pointer' }}
                  onClick={item.onclick}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {item.icon}
                    <Typography variant="body2">{item.title}</Typography>
                  </Stack>
                  {index !== settingsList.length - 1 && <Divider />}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Right Panel */}
      </Stack>
      {openShortcuts && (
        <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />
      )}
    </>
  );
};

export default Settings;
