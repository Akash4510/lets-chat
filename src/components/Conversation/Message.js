import React from 'react';
import { Stack, Box } from '@mui/material';
import { Chat_History } from '../../data';
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from './MsgTypes';
import { useTheme } from '@mui/material/styles';

const Message = () => {
  const theme = useTheme();

  return (
    <Box
      p={3}
      sx={{
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#fff'
            : theme.palette.background.default,
      }}
    >
      <Stack spacing={3}>
        {Chat_History.map((item) => {
          switch (item.type) {
            case 'divider':
              return <Timeline item={item} />;

            case 'msg':
              switch (item.subtype) {
                case 'img':
                  return <MediaMsg item={item} />;

                case 'doc':
                  return <DocMsg item={item} />;

                case 'link':
                  return <LinkMsg item={item} />;

                case 'reply':
                  return <ReplyMsg item={item} />;

                default:
                  return <TextMsg item={item} />;
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
