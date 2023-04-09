import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from 'phosphor-react';
import {
  Search,
  SearchIconWrapper,
  SearchInputBase,
} from '../../components/Search';
import ChatEelement from '../../components/ChatElement';
import Friends from '../../sections/main/Friends';
import { socket } from '../../socket';

import { ChatList } from '../../data';

const userId = window.localStorage.getItem('userId');

const Chats = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { conversations } = useSelector(
    (state) => state.conversation.directChat
  );

  useEffect(() => {
    socket.emit('get_direct_conversatoins', { userId }, (data) => {});
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: 340,
        height: '100vh',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#f1f5ff'
            : theme.palette.background.paper,
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: '100vh' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Chats</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => setOpenDialog(!openDialog)}>
              <Users />
            </IconButton>
            <IconButton>
              <CircleDashed />
            </IconButton>
          </Stack>
        </Stack>

        <Stack sx={{ width: '100%' }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>

            <SearchInputBase placeholder="Search" />
          </Search>
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <ArchiveBox size={24} />
            <Button variant="text">Archive</Button>
          </Stack>

          <Divider />
        </Stack>

        <Stack
          className="no-scrollbar"
          sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}
        >
          <Stack spacing={2}>
            <Typography variant="subtitle2" sx={{ color: '#676767' }}>
              Pinned
            </Typography>
            {ChatList.filter((item) => item.pinned).map((item) => (
              <ChatEelement {...item} key={item.id} />
            ))}
          </Stack>

          <Stack spacing={2}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#676767', marginTop: 2 }}
            >
              All Chats
            </Typography>
            {ChatList.filter((item) => !item.pinned).map((item) => (
              <ChatEelement {...item} key={item.id} />
            ))}
          </Stack>
        </Stack>
      </Stack>

      {openDialog && (
        <Friends open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </Box>
  );
};

export default Chats;
