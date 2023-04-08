import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  sideBar: {
    open: false,
    type: 'CONTACT', // can be "CONTACT", "STARRED", "SHARED"
  },
  snackbar: {
    open: false,
    message: '',
    severity: 'success', // can be "success", "error", "warning", "info"
  },
  users: [],
  friends: [],
  friendRequests: [],
  chatType: null,
  roomId: null,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSideBar(state, action) {
      state.sideBar.open = !state.sideBar.open;
    },
    setSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
    closeSnackbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = '';
      state.snackbar.severity = 'success';
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests;
    },
    selectConversation(state, action) {
      state.chatType = 'individual';
      state.chatId = action.payload.roomId;
    },
  },
});

export default slice.reducer;

export const ToggleSidebar = () => async (dispatch, getState) => {
  dispatch(slice.actions.toggleSideBar());
};

export const SetSidebarType = (type) => async (dispatch, getState) => {
  dispatch(slice.actions.setSideBarType({ type }));
};

export const ShowSnackbar =
  ({ message, severity }) =>
  async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ message, severity }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000);
  };

export const CloseSnackbar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackbar());
};

export const FetchUsers = () => async (dispatch, getState) => {
  await axios
    .get('/user/get-users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(slice.actions.updateUsers({ users: res.data.data }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const FetchFriends = () => async (dispatch, getState) => {
  await axios
    .get('/user/get-friends', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(slice.actions.updateFriends({ friends: res.data.data }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const FetchFriendRequests = () => async (dispatch, getState) => {
  await axios
    .get('/user/get-friend-requests', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(
        slice.actions.updateFriendRequests({ friendRequests: res.data.data })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const SelectConversation = (roomId) => async (dispatch, getState) => {
  dispatch(slice.actions.selectConversation({ roomId }));
};
