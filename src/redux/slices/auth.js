import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  isLoggedIn: null,
  token: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export default authSlice.reducer;

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        '/auth/login',
        { ...formValues },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(
          authSlice.actions.login({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.signOut());
  };
}
