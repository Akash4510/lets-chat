import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Tabs,
  Tab,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CaretLeft } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { SetSidebarType } from '../redux/slices/app';
import { faker } from '@faker-js/faker';
import { Shared_Links, Shared_Docs } from '../data';
import { LinkMsg, DocMsg } from './Conversation/MsgTypes';

const SharedMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  return (
    <Box sx={{ width: 350, height: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Box
          sx={{
            boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
            width: '100%',
            height: 94,
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#F1F5FF'
                : theme.palette.background.default,
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
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>

        <Tabs
          sx={{
            p: 2,
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#FFFFFF'
                : theme.palette.background.paper,
          }}
          value={selectedTab}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>

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
                : theme.palette.background.paper,
          }}
          p={3}
          spacing={4}
        >
          {(() => {
            switch (selectedTab) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                      <Grid item xs={4} key={index}>
                        <img
                          src={faker.image.avatar()}
                          alt={faker.name.fullName()}
                        />
                      </Grid>
                    ))}
                  </Grid>
                );

              case 1:
                return Shared_Links.map((item, index) => (
                  <LinkMsg key={index} item={item} showOptions={false} />
                ));

              case 2:
                return Shared_Docs.map((item, index) => (
                  <DocMsg key={index} item={item} showOptions={false} />
                ));

              default:
                return null;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
