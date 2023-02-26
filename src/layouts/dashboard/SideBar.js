import React, { useState } from 'react';
import { Box, IconButton, Stack, Divider, Avatar } from '@mui/material';
import { Gear } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/Images/logo.png';
import { Nav_Buttons } from '../../data';
import { faker } from '@faker-js/faker';
import useSettings from '../../hooks/useSettings';
import AntSwitch from '../../components/AntSwitch';

const SideBar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        height: '100vh',
        width: '80px',
        padding: 2,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: '100%' }}
        spacing={3}
      >
        <Stack alignItems="center" spacing={3}>
          <Box
            sx={{
              height: 54,
              width: 54,
              borderRadius: 1.5,
              padding: '8px',
            }}
          >
            <img src={logo} alt="logo" />
          </Box>

          <Stack
            sx={{ width: 'max-content' }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((item) =>
              item.index === selected ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{ width: 'max-content', color: '#fff' }}
                    key={item.index}
                  >
                    {item.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => setSelected(item.index)}
                  sx={{
                    width: 'max-content',
                    color:
                      theme.palette.mode === 'light'
                        ? '#000'
                        : theme.palette.text.primary,
                  }}
                  key={item.index}
                >
                  {item.icon}
                </IconButton>
              )
            )}
            <Divider sx={{ width: 45 }} />
            {selected === 3 ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton sx={{ width: 'max-content', color: '#fff' }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => setSelected(3)}
                sx={{
                  width: 'max-content',
                  color:
                    theme.palette.mode === 'light'
                      ? '#000'
                      : theme.palette.text.primary,
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <AntSwitch onClick={onToggleMode} defaultChecked />
          <Avatar src={faker.image.avatar()} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
