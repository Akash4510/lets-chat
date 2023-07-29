import React, { useState } from 'react';
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Fab,
  Tooltip,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  LinkSimple,
  Smiley,
  PaperPlaneTilt,
  Image,
  Sticker,
  Camera,
  File,
  User,
} from 'phosphor-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const Actions = [
  {
    color: '#4da5fe',
    icon: <Image size={24} />,
    y: 102,
    title: 'Photo/Video',
  },
  {
    color: '#1b8cfe',
    icon: <Sticker size={24} />,
    y: 172,
    title: 'Stickers',
  },
  {
    color: '#0172e4',
    icon: <Camera size={24} />,
    y: 242,
    title: 'Image',
  },
  {
    color: '#0159b2',
    icon: <File size={24} />,
    y: 312,
    title: 'Document',
  },
  {
    color: '#013f7f',
    icon: <User size={24} />,
    y: 382,
    title: 'Contact',
  },
];

const StyledInput = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
}));

const ChatInput = ({ setOpenEmojiPicker }) => {
  const [openActions, setOpenActions] = useState(false);

  return (
    <StyledInput
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      autoComplete="off"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: 'max-content' }}>
            {openActions && (
              <Stack sx={{ position: 'relative' }}>
                {Actions.map((item) => (
                  <Tooltip title={item.title} placement="right">
                    <Fab
                      sx={{
                        position: 'absolute',
                        top: -item.y,
                        backgroundColor: item.color,
                      }}
                    >
                      {item.icon}
                    </Fab>
                  </Tooltip>
                ))}
              </Stack>
            )}
            <InputAdornment>
              <IconButton onClick={() => setOpenActions(!openActions)}>
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setOpenEmojiPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Footer = () => {
  const theme = useTheme();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  return (
    <Box
      sx={{
        height: 100,
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F1F5FF'
            : theme.palette.background.default,
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Stack sx={{ width: '100%' }}>
          <Box sx={{ position: 'fixed', zIndex: 10, bottom: 81, right: 70 }}>
            {openEmojiPicker && (
              <Picker
                data={data}
                theme={theme.palette.mode}
                onEmojiSelect={console.log}
              />
            )}
          </Box>

          <ChatInput setOpenEmojiPicker={setOpenEmojiPicker} />
        </Stack>

        <Box
          sx={{
            height: 42,
            width: 44,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{ height: '100%', width: '100%' }}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton>
              <PaperPlaneTilt color="#FFFFFF" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
