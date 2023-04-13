import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  IconButton,
  Stack,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Gear } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/Images/logo.png';
import { Nav_Buttons } from '../../data';
import { faker } from '@faker-js/faker';
import useSettings from '../../hooks/useSettings';
import AntSwitch from '../../components/AntSwitch';
import { Profile_Menu } from '../../data';
import { LogOutUser } from '../../redux/slices/auth';

const SideBar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  key={item.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{ width: 'max-content', color: '#fff' }}
                    key={item.index}
                    onClick={() => {
                      setSelected(item.index);
                      navigate(item.path);
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(item.index);
                    navigate(item.path);
                  }}
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
                <IconButton
                  onClick={() => {
                    setSelected(3);
                    navigate('/settings');
                  }}
                  sx={{ width: 'max-content', color: '#fff' }}
                >
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  setSelected(3);
                  navigate('/settings');
                }}
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
          <Avatar
            id="avatar-btn"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              cursor: 'pointer',
            }}
            src={faker.image.avatar()}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'avatar-btn',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Stack spacing={1} padding={1}>
              {Profile_Menu.map((item, idx) => (
                <MenuItem
                  key={idx}
                  onClick={(event) => {
                    handleClick(event);

                    if (idx === 2) {
                      dispatch(LogOutUser());
                    } else {
                      navigate(item.path);
                    }

                    handleClose();
                  }}
                >
                  <Stack
                    sx={{ width: 100 }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="catption" sx={{ fontWeight: 500 }}>
                      {item.title}
                    </Typography>
                    <span>{item.icon}</span>
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
