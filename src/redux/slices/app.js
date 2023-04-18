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
  user: {},
  isLoggedIn: false,
  tab: 0,
  users: [],
  friends: [],
  friendRequests: [],
  chatType: null,
  roomId: null,
  callLogs: [],
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Sidebar
    toggleSideBar(state, action) {
      state.sideBar.open = !state.sideBar.open;
    },
    setSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },

    // Snackbar
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

    // Tab
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    // Call Logs
    fetchCallLogs(state, action) {
      state.callLogs = action.payload.callLogs;
    },

    // User
    setUser(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },

    // Users
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateAllUsers(state, action) {
      state.all_users = action.payload.users;
    },

    // Friends and Friend Requests
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests;
    },

    // Conversation
    selectConversation(state, action) {
      state.chatType = 'individual';
      state.roomId = action.payload.roomId;
    },
  },
});

export default slice.reducer;

// Sidebar Actions
export const ToggleSidebar = () => async (dispatch, getState) => {
  dispatch(slice.actions.toggleSideBar());
};

export const SetSidebarType = (type) => async (dispatch, getState) => {
  dispatch(slice.actions.setSideBarType({ type }));
};

// Snackbar Actions
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

// Tab Actions
export const UpdateTab = (tab) => async (dispatch, getState) => {
  dispatch(slice.actions.updateTab(tab));
};

// Users Actions
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

export function FetchAllUsers() {
  return async (dispatch, getState) => {
    await axios
      .get('/user/get-all-verified-users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateAllUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

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

// Conversation Actions
export const SelectConversation =
  ({ roomId }) =>
  async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ roomId }));
  };

// Call logs Actions
export const FetchCallLogs = () => {
  return async (dispatch, getState) => {
    axios
      .get('/user/get-call-logs', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.fetchCallLogs({ callLogs: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const FetchUserProfile = () => {
  return async (dispatch, getState) => {
    axios
      .get('/user/get-me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        const user = response.data.data;
        dispatch(
          slice.actions.setUser({
            user: {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const UpdateUserProfile = (formValues) => {
  return async (dispatch, getState) => {
    axios
      .patch(
        '/user/update-me',
        { ...formValues },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const user = response.data.data;
        dispatch(
          slice.actions.setUser({
            user: {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
