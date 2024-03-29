import React, { useState, forwardRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { SetSidebarType, ToggleSidebar } from '../redux/slices/app';
import { faker } from '@faker-js/faker';
import AntSwitch from './AntSwitch';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleCloseBlockDialog = () => {
    setBlockDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ width: 350, height: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
            width: '100%',
            height: 82,
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#F1F5FF'
                : theme.palette.background.paper,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
            sx={{ height: '100%', p: 2 }}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => dispatch(ToggleSidebar())}>
              <X />
            </IconButton>
          </Stack>
        </Box>

        {/* Body */}
        <Stack
          className="no-scrollbar"
          sx={{
            position: 'relative',
            height: '100%',
            flexGrow: 1,
            overflowY: 'scroll',
            paddingTop: 4,
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#FFFFFF'
                : theme.palette.background.default,
          }}
          p={3}
          spacing={4}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={5}
            justifyContent="center"
          >
            <Box>
              <Avatar
                src={faker.image.avatar()}
                alt={faker.name.firstName()}
                sx={{ width: 64, height: 64 }}
              />
            </Box>

            <Stack alignItems="center" spacing={0.8}>
              <Typography variant="article">{faker.name.fullName()}</Typography>
              <Typography variant="body2" sx={{ fontWeight: '500' }}>
                +91 729 876 6574
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Stack alignItems="center" spacing={1}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Voice</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video</Typography>
            </Stack>
          </Stack>

          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2" sx={{ fontWeight: '500' }}>
              Hi there, I am using Let's Chat
            </Typography>
          </Stack>
          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="article">Media, Links & Docs</Typography>
            <Button
              onClick={() => dispatch(SetSidebarType('SHARED'))}
              endIcon={<CaretRight />}
            >
              453
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            {[1, 2, 3].map((item, index) => (
              <Box key={index}>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>
          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Star size={20} />
              <Typography variant="article">Starred Messages</Typography>
            </Stack>
            <IconButton onClick={() => dispatch(SetSidebarType('STARRED'))}>
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Bell size={20} />
              <Typography variant="article">Muted Notifications</Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider />

          <Typography variant="body2" sx={{ fontWeight: 400 }}>
            1 group in common
          </Typography>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Box>
              <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} />
            </Box>

            <Stack spacing={0.5}>
              <Typography variant="subtitle2">
                {faker.name.fullName()}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: '500' }}>
                Owl, Parrot, Rabbit
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ paddingBlock: 2 }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Prohibit />}
              onClick={() => setBlockDialogOpen(true)}
            >
              Block
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Trash />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {blockDialogOpen && (
        <BlockDialog
          open={blockDialogOpen}
          handleClose={handleCloseBlockDialog}
        />
      )}

      {deleteDialogOpen && (
        <DeleteDialog
          open={deleteDialogOpen}
          handleClose={handleCloseDeleteDialog}
        />
      )}
    </Box>
  );
};

export default Contact;
