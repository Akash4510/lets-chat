import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from 'phosphor-react';
import { useTheme, styled } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { socket } from '../../socket';

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingTop: '12px !important',
    paddingBottom: '12px !important',
  },
}));

const ACTIONS = [
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

const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
  sendMessage,
}) => {
  const [openActions, setOpenActions] = useState(false);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClickOutsideActions = (event) => {
    if (openActions && !event.target.closest('.actions-container')) {
      setOpenActions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideActions);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideActions);
    };
  }, [openActions]);

  return (
    <StyledInput
      inputRef={inputRef}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: 'max-content' }}>
            <Stack
              sx={{
                position: 'relative',
                display: openActions ? 'inline-block' : 'none',
              }}
              className="actions-container"
            >
              {ACTIONS.map((el, idx) => (
                <Tooltip key={idx} placement="right" title={el.title}>
                  <Fab
                    onClick={() => {
                      setOpenActions(!openActions);
                    }}
                    sx={{
                      position: 'absolute',
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                    aria-label="add"
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>

            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenActions(!openActions);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <Stack sx={{ position: 'relative' }}>
            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenPicker(!openPicker);
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
      }}
    />
  );
};

const linkify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
};

const containsUrl = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
};

const Footer = () => {
  const theme = useTheme();
  const { currentConversation } = useSelector(
    (state) => state.conversation.directChat
  );
  const userId = useSelector((state) => state.auth.userId);
  const isMobile = useResponsive('between', 'md', 'xs', 'sm');
  const { sideBar, roomId } = useSelector((state) => state.app);
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const handleEmojiClick = (emoji) => {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  };

  // Close the emoji picker when the user clicks outside of it
  const handleClickOutsideEmojiBox = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setOpenPicker(false);
    }
  };

  const sendMessage = () => {
    if (value.trim() === '') {
      return;
    }

    console.log('Sending message - ', value);
    socket.emit('text_message', {
      message: linkify(value),
      conversationId: roomId,
      from: userId,
      to: currentConversation.userId,
      type: containsUrl(value) ? 'Link' : 'Text',
    });
    setValue('');
    inputRef.current.focus();
    setOpenPicker(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideEmojiBox);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEmojiBox);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'transparent !important',
      }}
    >
      <Box
        p={isMobile ? 1 : 2}
        width="100%"
        sx={{
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F8FAFF'
              : theme.palette.background,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={isMobile ? 1 : 1.5}>
          <Stack sx={{ width: '100%' }}>
            <Box
              ref={emojiPickerRef}
              style={{
                zIndex: 200,
                position: 'fixed',
                display: openPicker ? 'inline' : 'none',
                bottom: 81,
                right: isMobile ? 20 : sideBar.open ? 420 : 100,
              }}
            >
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={(emoji) => {
                  handleEmojiClick(emoji.native);
                }}
              />
            </Box>
            {/* Chat Input */}
            <ChatInput
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}
              sendMessage={sendMessage}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: isMobile ? 48 : 56,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: '100%' }}
              alignItems="center"
              justifyContent="center"
            >
              <IconButton onClick={sendMessage}>
                <PaperPlaneTilt color="#FFFFFF" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
