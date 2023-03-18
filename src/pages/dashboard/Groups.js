import React from 'react';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Plus, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { ChatList } from '../../data';
import {
  Search,
  SearchIconWrapper,
  SearchInputBase,
} from '../../components/Search';
import ChatEelement from '../../components/ChatElement';

const Groups = () => {
  const theme = useTheme();

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
          <Typography variant="h5">Groups</Typography>

          <IconButton>
            <CircleDashed />
          </IconButton>
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1.5}
          >
            <Typography variant="subtitle2" component={Link}>
              Create New Group
            </Typography>
            <IconButton>
              <Plus style={{ color: theme.palette.primary.main }} />
            </IconButton>
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
              All Groups
            </Typography>
            {ChatList.filter((item) => !item.pinned).map((item) => (
              <ChatEelement {...item} key={item.id} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Groups;
