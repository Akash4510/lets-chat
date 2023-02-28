import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MsgOptions from '../MsgOptions';

const MediaMsg = ({ item }) => {
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
              ? '#f1f5ff'
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Stack spacing={1.5}>
          <img
            src={item.img}
            alt={item.message}
            style={{
              maxHeight: 210,
              borderRadius: '10px',
            }}
          />

          <Typography
            variant="body2"
            fontWeight={500}
            color={item.incoming ? theme.palette.text : '#fff'}
          >
            {item.message}
          </Typography>
        </Stack>
      </Box>
      {isHovered && <MsgOptions incoming={item.incoming} />}
    </Stack>
  );
};

export default MediaMsg;
