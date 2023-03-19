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
} from '@mui/material';
import FormProvider from '../../components/hook-form';
import {
  Search,
  SearchIconWrapper,
  SearchInputBase,
} from '../../components/Search';
import { MagnifyingGlass } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { Members_List } from '../../data';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCallForm = ({ handleClose }) => {
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

  const { reset, setError, handleSubmit } = methods;

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
      <Stack
        className="no-scrollbar"
        sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}
        spacing={2}
      >
        {Members_List.map((item) => (
          <CallElement key={item.id} {...item} />
        ))}
      </Stack>
    </FormProvider>
  );
};

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle sx={{ mb: 2 }}>Start a call</DialogTitle>

      <DialogContent
        className="no-scrollbar"
        sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}
      >
        <Stack sx={{ width: '100%', mb: 2 }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>

            <SearchInputBase placeholder="Search" />
          </Search>
        </Stack>
        <StartCallForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
