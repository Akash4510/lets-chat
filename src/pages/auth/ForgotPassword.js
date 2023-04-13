import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';
import { CaretLeft } from 'phosphor-react';
import ForgotPasswordForm from '../../sections/auth/ForgotPasswordForm';

const ResetPassword = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h3" paragraph>
        Forgot your password?
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter the email address associated with your account and we will
        email you a link to reset your password
      </Typography>

      <ForgotPasswordForm />

      <Link
        component={RouterLink}
        to="/auth/login"
        variant="subtitle2"
        color="inherit"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <CaretLeft />
        Return to sign in
      </Link>
    </Stack>
  );
};

export default ResetPassword;
