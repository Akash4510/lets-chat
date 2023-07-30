import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MsgOptions from '../MsgOptions';
import { formatOnlyTime } from '../../../utils/formatTime';

const TextMsg = ({ item, showOptions }) => {
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
      <Stack direction="column" alignItems="flex-start" spacing={0.4}>
        <Box
          p={1.2}
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
          <Typography
            variant="body2"
            fontWeight={500}
            color={item.incoming ? theme.palette.text : '#FFFFFF'}
          >
            {item.message}
          </Typography>
        </Box>

        <Stack
          width="100%"
          direction="row"
          alignItems={item.incoming ? 'flex-start' : 'flex-end'}
          justifyContent={item.incoming ? 'flex-start' : 'flex-end'}
          sx={{ flex: 1 }}
          pl={item.incoming ? 0.5 : 0}
          pr={item.incoming ? 0 : 0.5}
        >
          <Typography
            variant="caption"
            fontSize="12px"
            fontWeight={300}
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            {formatOnlyTime(item.time)}
          </Typography>
        </Stack>
      </Stack>
      {showOptions && isHovered && <MsgOptions incoming={item.incoming} />}
    </Stack>
  );
};

export default TextMsg;
