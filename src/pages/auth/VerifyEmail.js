import React from 'react';
import { Stack, Typography } from '@mui/material';
import VerifyEmailForm from '../../sections/auth/VerifyEmailForm';

const VerifyEmail = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h3" paragraph>
        Verify your email address
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Enter the OTP sent to {'akash@email.com'} to complete the verification.
      </Typography>

      <VerifyEmailForm />
    </Stack>
  );
};

export default VerifyEmail;
