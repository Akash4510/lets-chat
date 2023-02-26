import React from 'react';
import { Stack, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Timeline = ({ item }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography
        variant="caption"
        sx={{ color: theme.palette.text.secondary }}
      >
        {item.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

export default Timeline;
