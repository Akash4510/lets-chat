import React from 'react';
import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import { VideoCamera, Phone, MagnifyingGlass, CaretDown } from 'phosphor-react';
import StyledBadge from '../StyledBadge';
import { useDispatch } from 'react-redux';
import { ToggleSidebar } from '../../redux/slices/app';

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F1F5FF'
            : theme.palette.background.paper,
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch(ToggleSidebar());
          }}
        >
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            </StyledBadge>
          </Box>

          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={3} alignItems="center">
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
          >
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
