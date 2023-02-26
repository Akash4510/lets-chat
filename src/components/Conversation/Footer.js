import React from 'react';
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { LinkSimple, Smiley, PaperPlaneTilt } from 'phosphor-react';

const StyledInput = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
}));

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 100,
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#f1f5ff'
            : theme.palette.background.default,
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <StyledInput
          fullWidth
          placeholder="Write a message..."
          variant="filled"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <Smiley />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

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
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
