import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import useResponsive from '../../hooks/useResponsive';
import StyledBadge from '../../components/StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';

const CONVERSATION_MENU = [
  {
    title: 'Contact info',
  },
  {
    title: 'Mute notifications',
  },
  {
    title: 'Clear messages',
  },
  {
    title: 'Delete chat',
  },
];

const ChatHeader = () => {
  const dispatch = useDispatch();
  const isMobile = useResponsive('between', 'md', 'xs', 'sm');
  const theme = useTheme();

  const { currentConversation } = useSelector(
    (state) => state.conversation.directChat
  );

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    useState(null);
  const openConversationMenu = Boolean(conversationMenuAnchorEl);

  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };

  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };

  return (
    <Box
      p={2}
      width="100%"
      sx={{
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F1F5FF'
            : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%', height: '100%', cursor: 'pointer' }}
        onClick={() => {
          dispatch(ToggleSidebar());
        }}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Box>
            {currentConversation?.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
              >
                <Avatar
                  alt={currentConversation?.name}
                  src={faker.image.avatar()}
                />
              </StyledBadge>
            ) : (
              <Avatar
                alt={currentConversation?.name}
                src={faker.image.avatar()}
              />
            )}
          </Box>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2" fontSize="1rem">
              {currentConversation?.name}
            </Typography>
            {currentConversation?.online && (
              <Typography variant="caption">Online</Typography>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={isMobile ? 1 : 3}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          {!isMobile && (
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
          )}

          <Divider orientation="vertical" flexItem />
          <IconButton
            id="conversation-positioned-button"
            aria-controls={
              openConversationMenu ? 'conversation-positioned-menu' : undefined
            }
            aria-haspopup="true"
            aria-expanded={openConversationMenu ? 'true' : undefined}
            onClick={handleClickConversationMenu}
          >
            <CaretDown />
          </IconButton>
          <Menu
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            TransitionComponent={Fade}
            id="conversation-positioned-menu"
            aria-labelledby="conversation-positioned-button"
            anchorEl={conversationMenuAnchorEl}
            open={openConversationMenu}
            onClose={handleCloseConversationMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box p={1}>
              <Stack spacing={1}>
                {CONVERSATION_MENU.map((item, idx) => (
                  <MenuItem key={idx} onClick={handleCloseConversationMenu}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ minWidth: 100 }}
                    >
                      <span>{item.title}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatHeader;
