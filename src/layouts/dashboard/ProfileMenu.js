import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Fade,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { PROFILE_MENU_ITEMS } from '../../data/nav';
import { LogOutUser } from '../../redux/slices/auth';
import { socket } from '../../socket';
import { faker } from '@faker-js/faker';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        id="profile-positioned-button"
        aria-controls={openMenu ? 'profile-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        alt={user?.firstName}
        src={faker.image.avatar()}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{ cursor: 'pointer' }}
      />
      <Menu
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        TransitionComponent={Fade}
        id="profile-positioned-menu"
        aria-labelledby="profile-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={1}>
          <Stack spacing={1}>
            {PROFILE_MENU_ITEMS.map((item) => (
              <MenuItem key={item.index} onClick={handleClose}>
                <Stack
                  sx={{ width: 100 }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => {
                    switch (item.title) {
                      case 'Profile':
                        navigate('/profile');
                        break;

                      case 'Settings':
                        navigate('/settings');
                        break;

                      case 'Logout':
                        dispatch(LogOutUser());
                        socket.disconnect();
                        break;

                      default:
                        break;
                    }
                  }}
                >
                  <span>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      {item.title}
                    </Typography>
                  </span>

                  {item.icon}
                </Stack>
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
