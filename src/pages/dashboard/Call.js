import React, { useState } from 'react';
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
import {
  Search,
  SearchIconWrapper,
  SearchInputBase,
} from '../../components/Search';
import { CallLogElement } from '../../components/CallElement';
import StartCall from '../../sections/main/StartCall';
import { Call_Log } from '../../data';

const Call = () => {
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: 340,
        height: '100vh',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F1F5FF'
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
          <Typography variant="h5">Call Log</Typography>

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
              Start new conversation
            </Typography>
            <IconButton onClick={() => setOpenDialog(true)}>
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
            {Call_Log.map((item) => (
              <CallLogElement key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>
      </Stack>

      {openDialog && (
        <StartCall open={openDialog} handleClose={() => setOpenDialog(false)} />
      )}
    </Box>
  );
};

export default Call;
