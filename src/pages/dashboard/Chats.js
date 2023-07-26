import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';
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
import useResponsive from '../../hooks/useResponsive';
import BottomNav from '../../layouts/dashboard/BottomNav';
import ChatEelement from '../../components/ChatElement';
import Friends from '../../sections/main/Friends';
import { socket } from '../../socket';
import { FetchDirectConversations } from '../../redux/slices/conversations';

const Chats = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const [openDialog, setOpenDialog] = useState(false);
  const { conversations } = useSelector(
    (state) => state.conversation.directChat
  );
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    socket.emit('get_direct_conversatoins', { userId }, (data) => {
      console.log('Conversation data', data);

      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, [userId, dispatch]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: isDesktop ? 340 : '100vw',
        height: '100vh',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F1F5FF'
            : theme.palette.background.paper,
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
      }}
    >
      {!isDesktop && <BottomNav />}

      <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Chats</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              sx={{ width: 'max-content' }}
              onClick={() => setOpenDialog(!openDialog)}
            >
              <Users />
            </IconButton>
            <IconButton sx={{ width: 'max-content' }}>
              <CircleDashed />
            </IconButton>
          </Stack>
        </Stack>

        <Stack sx={{ width: '100%' }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>

            <SearchInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
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
            {conversations
              .filter((item) => item.pinned)
              .map((item) => (
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
            {conversations
              .filter((item) => !item.pinned)
              .map((item) => (
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
