import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';
import { CaretLeft } from 'phosphor-react';
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm';

const NewPassword = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h3" paragraph>
        Reset Password
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please set your new password
      </Typography>

      <ResetPasswordForm />

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

export default NewPassword;
