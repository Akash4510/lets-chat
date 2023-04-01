import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './routes';
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { CloseSnackbar } from './redux/slices/app';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.app.snackbar
  );

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          <Router />
        </ThemeSettings>
      </ThemeProvider>

      {open && message && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          autoHideDuration={4000}
          onClose={() => {
            dispatch(CloseSnackbar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(CloseSnackbar());
            }}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default App;
