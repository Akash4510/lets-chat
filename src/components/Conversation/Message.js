import React, { useEffect } from 'react';
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
  console.log(currentMessages);
  const { roomId } = useSelector((state) => state.app);
  console.log(roomId);

  useEffect(() => {
    // Get the current conversation for the selected roomId
    const currentConv = conversations.find((item) => item?.id === roomId);

    // Update the current conversation in the Redux store
    dispatch(SetCurrentConversation(currentConv));

    // Fetch the messages only when the conversation changes
    if (currentConv) {
      socket.emit(
        'get_messages',
        { conversationId: currentConv?.id },
        (data) => {
          dispatch(FetchCurrentMessages({ messages: data }));
        }
      );
    }
  }, [roomId, conversations, dispatch]);

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
