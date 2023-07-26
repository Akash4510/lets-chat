import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CaretLeft } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { SetSidebarType } from '../redux/slices/app';
import Messages from './Conversation/Message';

const StarredMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: 350, height: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Box
          sx={{
            boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
            width: '100%',
            height: 84,
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#F1F5FF'
                : theme.palette.background.paper,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{ height: '100%' }}
          >
            <IconButton onClick={() => dispatch(SetSidebarType('CONTACT'))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>

        {/* Body */}
        <Stack
          className="no-scrollbar"
          sx={{
            position: 'relative',
            height: '100%',
            flexGrow: 1,
            overflowY: 'scroll',
            paddingTop: 4,
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#FFFFFF'
                : theme.palette.background.default,
          }}
          p={3}
          spacing={4}
        >
          <Messages showOptions={false} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
