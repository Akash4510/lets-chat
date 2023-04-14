import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Stack } from '@mui/material';
import ProfileMenu from './ProfileMenu';
import { NAV_BUTTONS } from '../../data/nav';

const BottomNav = () => {
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (index) => {
    setSelectedTab(index);
  };

  return (
    <Box
      sx={{
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        width: '100vw',

        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        p={2}
      >
        {NAV_BUTTONS.slice(0, -1).map((item) => (
          <>
            {item.index === selectedTab ? (
              <Box
                key={item.index}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  sx={{ width: 'max-content', color: '#FFFFFF' }}
                  onClick={() => {
                    handleChangeTab(item.index, item.to);
                  }}
                >
                  {item.icon}
                </IconButton>
              </Box>
            ) : (
              <IconButton
                key={item.index}
                sx={{
                  width: 'max-content',
                  color:
                    theme.palette.mode === 'light'
                      ? '#080707'
                      : theme.palette.text.primary,
                }}
                onClick={() => {
                  handleChangeTab(item.index, item.to);
                }}
              >
                {item.icon}
              </IconButton>
            )}
          </>
        ))}
        <ProfileMenu />
      </Stack>
    </Box>
  );
};

export default BottomNav;
