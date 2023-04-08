import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Stack, Typography, Avatar, Badge } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { SelectConversation } from '../redux/slices/app';

const ChatEelement = ({ id, name, img, msg, time, unread, online }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box
      onClick={() => dispatch(SelectConversation({ roomId: id }))}
      sx={{
        width: '100%',
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#fff'
            : alpha(theme.palette.background.default, 0.4),
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
              variant="captoin"
              sx={{
                fontSize: '0.8rem',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
              }}
            >
              {msg}
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
          <Badge sx={{ width: 20 }} color="primary" badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatEelement;
