import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { ShowSnackbar } from './app';

const initialState = {
  isLoggedIn: null,
  token: null,
  isLoading: false,
  user: null,
  userId: null,
  registeringEmail: null,
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
      state.userId = action.payload.userId;
    },

    signOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.user = null;
    },

    updateRegisteringEmail: (state, action) => {
      state.registeringEmail = action.payload.registeringEmail;
    },

    fetchUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export default authSlice.reducer;

export const RegisterUser = (formValues) => {
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
          authSlice.actions.updateRegisteringEmail({
            registeringEmail: formValues.email,
          })
        );

        dispatch(
          ShowSnackbar({ severity: 'success', message: response.data.message })
        );

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(ShowSnackbar({ severity: 'error', message: error.message }));

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
};

export const VerifyEmail = (formValues) => {
  return async (dispatch, getState) => {
    dispatch(
      authSlice.actions.updateIsLoading({ isLoading: true, error: false })
    );

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
            userId: response.data.userId,
          })
        );

        dispatch(authSlice.actions.fetchUser({ user: response.data.user }));

        window.localStorage.setItem('userId', response.data.userId);

        dispatch(
          authSlice.actions.updateRegisteringEmail({ registeringEmail: null })
        );

        dispatch(
          ShowSnackbar({ severity: 'success', message: response.data.message })
        );

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(ShowSnackbar({ severity: 'error', message: error.message }));

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
};

export const LoginUser = (formValues) => {
  return async (dispatch, getState) => {
    dispatch(
      authSlice.actions.updateIsLoading({ isLoading: true, error: false })
    );

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
            userId: response.data.userId,
          })
        );

        dispatch(authSlice.actions.fetchUser({ user: response.data.user }));

        window.localStorage.setItem('userId', response.data.userId);

        dispatch(
          ShowSnackbar({
            message: response.data.message,
            severity: 'success',
          })
        );

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: false })
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

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
};

export const LogOutUser = () => {
  return async (dispatch, getState) => {
    dispatch(authSlice.actions.signOut());
    window.localStorage.removeItem('userId');
  };
};

export const ForgotPassword = (formValues) => {
  return async (dispatch, getState) => {
    dispatch(
      authSlice.actions.updateIsLoading({ isLoading: true, error: false })
    );

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

        dispatch(
          ShowSnackbar({ severity: 'success', message: response.data.message })
        );

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(ShowSnackbar({ severity: 'error', message: error.message }));

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
};

export const ResetPassword = (formValues) => {
  return async (dispatch, getState) => {
    dispatch(
      authSlice.actions.updateIsLoading({ isLoading: true, error: false })
    );

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

        dispatch(
          ShowSnackbar({ severity: 'success', message: response.data.message })
        );

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(ShowSnackbar({ severity: 'error', message: error.message }));

        dispatch(
          authSlice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
};
