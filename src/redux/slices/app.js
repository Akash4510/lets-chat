import { createSlice } from '@reduxjs/toolkit';
// import { dispatch } from '../store';

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
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSideBar());
  };
}

export function SetSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setSideBarType({ type }));
  };
}

export function ShowSnackbar({ message, severity }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ message, severity }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000);
  };
}

export function CloseSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
  };
}
