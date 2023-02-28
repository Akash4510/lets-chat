import React, { useState } from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DownloadSimple, Image } from 'phosphor-react';
import MsgOptions from '../MsgOptions';

const DocMsg = ({ item }) => {
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
          <Stack
            p={1.5}
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{
              color: item.incoming ? theme.palette.text : '#fff',
            }}
          >
            {item.message}
          </Typography>
        </Stack>
      </Box>
      {isHovered && <MsgOptions incoming={item.incoming} />}
    </Stack>
  );
};

export default DocMsg;
