import React, { useState } from 'react';
import { Stack, Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MsgOptions from '../MsgOptions';

const LinkMsg = ({ item, showOptions }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Stack
      direction={item.incoming ? 'row' : 'row-reverse'}
      justifyContent={item.incoming ? 'start' : 'end'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      spacing={1}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: item.incoming
            ? theme.palette.mode === 'light'
              ? '#F1F5FF'
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Stack
          spacing={1.5}
          alignItems="left"
          sx={{
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#F1F5FF'
                : theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <img
            src={item.preview}
            alt={item.message}
            style={{ maxHeight: 210, borderRadius: '10px' }}
          />

          <Stack spacing="4px">
            <Typography variant="subtitle2">Creating chat app</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
              component={Link}
              to="//https:/www.youtube.com/"
            >
              www.youtube.com
            </Typography>
          </Stack>
          {item.message && (
            <Typography
              variant="body2"
              fontWeight={500}
              color={item.incoming ? theme.palette.text : '#FFFFFF'}
            >
              {item.message}
            </Typography>
          )}
        </Stack>
      </Box>
      {showOptions && isHovered && <MsgOptions incoming={item.incoming} />}
    </Stack>
  );
};

export default LinkMsg;
