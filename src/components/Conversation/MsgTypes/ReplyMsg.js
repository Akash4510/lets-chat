import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MsgOptions from '../MsgOptions';

const ReplyMsg = ({ item, showOptions }) => {
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
        sx={{
          backgroundColor: item.incoming
            ? theme.palette.mode === 'light'
              ? '#F1F5FF'
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
          padding: '8px 8px 12px 8px',
        }}
      >
        <Stack spacing={1}>
          <Stack
            direction="column"
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              padding: '6px 12px',
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
              color={theme.palette.text.primary}
            >
              {item.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            fontWeight={500}
            color={item.incoming ? theme.palette.text.primary : '#FFFFFF'}
            sx={{ padding: '0 6px' }}
          >
            {item.reply}
          </Typography>
        </Stack>
      </Box>
      {showOptions && isHovered && <MsgOptions incoming={item.incoming} />}
    </Stack>
  );
};

export default ReplyMsg;
