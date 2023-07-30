import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Stack, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/Images/logo.png';
import useSettings from '../../hooks/useSettings';
import AntSwitch from '../../components/AntSwitch';
import ProfileMenu from './ProfileMenu';
import { UpdateTab } from '../../redux/slices/app';
import { NAV_BUTTONS } from '../../data/nav';

const SideBar = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tab } = useSelector((state) => state.app);
  const selectedTab = tab;

  const { onToggleMode } = useSettings();

  const handleChangeTab = (index, path) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(path);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '80px',
        padding: 2,
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
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
            <img src={logo} alt="Let's Chat" />
          </Box>

          <Stack
            sx={{ width: 'max-content' }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {NAV_BUTTONS.map((item) => (
              <div key={item.index}>
                {item.index === 3 && <Divider key={200} sx={{ width: 45 }} />}
                {item.index === selectedTab ? (
                  <Box
                    key={item.index}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: 'max-content', color: '#FFFFFF' }}
                      onClick={() => {
                        handleChangeTab(item.index, item.to);
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    key={item.index}
                    sx={{
                      width: 'max-content',
                      color:
                        theme.palette.mode === 'light'
                          ? '#080707'
                          : theme.palette.text.primary,
                    }}
                    onClick={() => {
                      handleChangeTab(item.index, item.to);
                    }}
                  >
                    {item.icon}
                  </IconButton>
                )}
              </div>
            ))}
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <AntSwitch
            onChange={onToggleMode}
            checked={theme.palette.mode === 'dark'}
          />
          <ProfileMenu />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
