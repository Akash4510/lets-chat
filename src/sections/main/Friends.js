import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Dialog, DialogContent, Slide, Tab, Tabs } from '@mui/material';
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from '../../redux/slices/app';
import {
  UserElement,
  FriendElement,
  FriendRequestElement,
} from '../../components/Friends';

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  const { users } = useSelector((state) => state.app);

  return (
    <Stack>
      {users.map((item) => (
        <UserElement key={item._id} {...item} />
      ))}
    </Stack>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  const { friends } = useSelector((state) => state.app);

  return (
    <Stack>
      {friends.map((item) => (
        <FriendElement key={item._id} {...item} />
      ))}
    </Stack>
  );
};

const FriendRequestsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, []);

  const { friendRequests } = useSelector((state) => state.app);

  return (
    <Stack>
      {friendRequests.map((item, idx) => (
        <FriendRequestElement key={idx} {...item.sender} id={item._id} />
      ))}
    </Stack>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>

      <DialogContent>
        <Stack sx={{ height: '100%' }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0:
                  return <UsersList />;

                case 1:
                  return <FriendsList />;

                case 2:
                  return <FriendRequestsList />;

                default:
                  return <></>;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
