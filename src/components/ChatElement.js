import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography, Avatar, Badge } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { SelectConversation } from '../redux/slices/app';

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
  },
}));

const ChatEelement = ({ id, name, img, lastMessage, time, unread, online }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { roomId } = useSelector((state) => state.app);
  const selectedChatId = roomId?.toString();

  let isSelected = selectedChatId === id;

  if (!selectedChatId) {
    isSelected = false;
  }

  return (
    <StyledChatBox
      onClick={() => {
        dispatch(SelectConversation({ roomId: id }));
      }}
      sx={{
        width: '100%',
        borderRadius: 1,
        backgroundColor: isSelected
          ? theme.palette.mode === 'light'
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === 'light'
          ? '#FFFFFF'
          : alpha(theme.palette.background.default, 0.6),
      }}
      p={2}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.8rem',
                fontWeight: 400,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
              }}
            >
              {lastMessage}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} alignItems="right">
          <Typography
            variant="caption"
            sx={{ fontSize: '0.75rem', fontWeight: 500 }}
          >
            {time}
          </Typography>
          <Badge
            className="unread-count"
            sx={{ width: 20 }}
            color="primary"
            badgeContent={unread}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ChatEelement;
