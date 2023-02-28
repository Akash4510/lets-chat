import React from 'react';
import { Stack, Box, Menu, MenuItem, Typography } from '@mui/material';
import { CaretDown } from 'phosphor-react';
import { Message_options } from '../../data';

const MsgOptions = ({ incoming }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction={incoming ? 'row' : 'row-reverse'}>
      <Box
        id="msg-options-btn"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          height: 'max-content',
        }}
      >
        <CaretDown />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'msg-options-btn',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: incoming ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: incoming ? 'left' : 'right',
        }}
      >
        <Stack spacing={1} padding={1}>
          {Message_options.map((item) => (
            <MenuItem onClick={handleClick}>
              <Typography variant="catption" sx={{ fontWeight: 500 }}>
                {item.title}
              </Typography>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </Stack>
  );
};

export default MsgOptions;
