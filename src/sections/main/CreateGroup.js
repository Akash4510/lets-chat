import React, { forwardRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Button,
} from '@mui/material';
import FormProvider, {
  RHFTextField,
  RHFAutoComplete,
} from '../../components/hook-form';

const MEMBERS = ['Name1', 'Name2', 'Name3', 'Name4'];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required('Group name is required'),
    members: Yup.array().min(2, 'Must have at least 2 members'),
  });

  const defaultValues = {
    groupName: '',
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('data', data);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField sx={{ mt: 4 }} name="groupName" label="Group Name" />
        <RHFAutoComplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={MEMBERS.map((opt) => opt)}
          ChipProps={{ size: 'medium' }}
        />

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="end"
        >
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || !isValid}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>Create New Group</DialogTitle>

      <DialogContent>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
