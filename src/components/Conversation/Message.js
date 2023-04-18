import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Box } from '@mui/material';
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from './MsgTypes';
import { socket } from '../../socket';
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from '../../redux/slices/conversations';

const Messages = ({ showOptions, isMobile }) => {
  const dispatch = useDispatch();

  const { conversations, currentMessages } = useSelector(
    (state) => state.conversation.directChat
  );
  const { roomId } = useSelector((state) => state.app);

  const [noOfMessages, setNoOfMessages] = useState(currentMessages.length);

  useEffect(() => {
    const currentConv = conversations.find((item) => item?.id === roomId);

    socket.emit('get_messages', { conversationId: currentConv?.id }, (data) => {
      console.log('List of messages', data);
      dispatch(FetchCurrentMessages({ messages: data }));
    });

    setNoOfMessages(currentMessages.length);

    dispatch(SetCurrentConversation(currentConv));
  }, [roomId, noOfMessages]);

  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {currentMessages.map((item, idx) => {
          switch (item.type) {
            case 'divider':
              return <Timeline key={idx} item={item} />;

            case 'msg':
              switch (item.subtype) {
                case 'img':
                  return (
                    <MediaMsg key={idx} item={item} showOptions={showOptions} />
                  );

                case 'doc':
                  return (
                    <DocMsg key={idx} item={item} showOptions={showOptions} />
                  );

                case 'link':
                  return (
                    <LinkMsg key={idx} item={item} showOptions={showOptions} />
                  );

                case 'reply':
                  return (
                    <ReplyMsg key={idx} item={item} showOptions={showOptions} />
                  );

                default:
                  return (
                    <TextMsg key={idx} item={item} showOptions={showOptions} />
                  );
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Messages;
