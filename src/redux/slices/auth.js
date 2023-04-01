import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { ShowSnackbar } from './app';

const initialState = {
  isLoggedIn: null,
  token: null,
  isLoading: false,
  email: '',
  error: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateIsLoading: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.email = '';
    },
    updateRegisterEmail: (state, action) => {
      state.email = action.payload.email;
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
            email: response.data.email,
          })
        );

        dispatch(
          ShowSnackbar({
            message: response.data.message,
            severity: 'success',
          })
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(
          ShowSnackbar({
            message: error.message,
            severity: 'error',
          })
        );
      });
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.signOut());
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        '/auth/forgot-password',
        { ...formValues },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        '/auth/reset-password',
        { ...formValues },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);

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

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      authSlice.actions.updateIsLoading({ isLoading: true, error: false })
    );
    await axios
      .post(
        '/auth/register',
        { ...formValues },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          authSlice.actions.updateRegisterEmail({ email: formValues.email })
        );
        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = '/auth/verify-email';
        }
      });
  };
}

export function verifyEmail(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        '/auth/verify-email',
        { ...formValues },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
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
