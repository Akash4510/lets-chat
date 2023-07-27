import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

const formatTime = (dateString) => {
  const date = new Date(dateString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};

const userId = window.localStorage.getItem('userId');

const initialState = {
  directChat: {
    conversations: [],
    currentConversation: null,
    currentMessages: [],
  },
  groupChat: {},
};

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    fetchDirectConversations: (state, action) => {
      const list = action.payload.conversations.map((item) => {
        const user = item.participants.find(
          (participant) => participant._id.toString() !== userId
        );

        const lastMessage =
          item.messages.length > 0
            ? item.messages[item.messages.length - 1]
            : null;

        const dateString = lastMessage ? lastMessage.created_at : new Date();
        const formattedTime = formatTime(dateString);

        return {
          id: item._id,
          userId: user._id,
          name: `${user.firstName} ${user.lastName}`,
          online: user.status === 'online',
          img: faker.image.avatar(),
          lastMessage: lastMessage ? lastMessage.text || '' : '',
          time: formattedTime,
          unread: 3,
          pinned: false,
        };
      });

      state.directChat.conversations = list;
    },

    updateDirectConversation: (state, action) => {
      const thisConversation = action.payload.conversation;
      const user = thisConversation.participants.find(
        (el) => el._id.toString() !== userId
      );

      const lastMessage =
        thisConversation.messages.length > 0
          ? thisConversation.messages[thisConversation.messages.length - 1]
          : null;

      const dateString = lastMessage ? lastMessage.created_at : new Date();
      const formattedTime = formatTime(dateString);

      state.directChat.conversations = state.directChat.conversations.map(
        (item) => {
          if (item.id === thisConversation._id) {
            return {
              id: thisConversation._id,
              userId: user._id,
              name: `${user.firstName} ${user.lastName}`,
              online: user.status === 'online',
              img: faker.image.avatar(),
              lastMessage: lastMessage ? lastMessage.text || '' : '',
              time: formattedTime,
              unread: 3,
              pinned: false,
            };
          }

          return item;
        }
      );
    },

    addDirectConversation: (state, action) => {
      const thisConversation = action.payload.conversation;
      const user = thisConversation.participants.find(
        (el) => el._id.toString() !== userId
      );

      const lastMessage =
        thisConversation.messages.length > 0
          ? thisConversation.messages[thisConversation.messages.length - 1]
          : null;

      const dateString = lastMessage ? lastMessage.created_at : new Date();
      const formattedTime = formatTime(dateString);

      const newConversation = {
        id: thisConversation._id,
        userId: user._id,
        name: `${user.firstName} ${user.lastName}`,
        online: user.status === 'online',
        img: faker.image.avatar(),
        lastMessage: lastMessage ? lastMessage.text || '' : '',
        time: formattedTime,
        unread: 3,
        pinned: false,
      };

      state.directChat.conversations = [
        ...state.directChat.conversations,
        newConversation,
      ];
    },

    setCurrentConversation(state, action) {
      state.directChat.currentConversation = action.payload;
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formattedMessages = messages.map((item) => {
        const dateString = item.created_at;
        const formattedTime = formatTime(dateString);

        return {
          id: item._id,
          type: 'msg',
          subtype: item.type,
          message: item.text,
          incoming: item.to === userId,
          outgoing: item.from === userId,
          time: formattedTime,
        };
      });

      state.directChat.currentMessages = formattedMessages;
    },

    addDirectMessage(state, action) {
      const newMessage = action.payload.message;
      state.directChat.currentMessages = [
        ...state.directChat.currentMessages,
        newMessage,
      ];

      // Update the lastMessage and time for the conversation of the sender
      const conversationIndexSender = state.directChat.conversations.findIndex(
        (c) => c.id === newMessage.conversationId
      );
      if (conversationIndexSender !== -1) {
        state.directChat.conversations[conversationIndexSender].lastMessage =
          newMessage.message;
        state.directChat.conversations[conversationIndexSender].time =
          formatTime(newMessage.time);
      }

      // Update the lastMessage and time for the conversation of the receiver
      const conversationIndexReceiver =
        state.directChat.conversations.findIndex(
          (c) => c.id === newMessage.conversationId && c.userId !== userId
        );
      if (conversationIndexReceiver !== -1) {
        state.directChat.conversations[conversationIndexReceiver].lastMessage =
          newMessage.message;
        state.directChat.conversations[conversationIndexReceiver].time =
          formatTime(newMessage.time);
      }
    },
  },
});

export default conversationsSlice.reducer;

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(
      conversationsSlice.actions.fetchDirectConversations({ conversations })
    );
  };
};

export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(
      conversationsSlice.actions.addDirectConversation({ conversation })
    );
  };
};

export const UpdateDirectConversations = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(
      conversationsSlice.actions.updateDirectConversation({ conversation })
    );
  };
};

export const SetCurrentConversation = (currentConversation) => {
  return async (dispatch, getState) => {
    dispatch(
      conversationsSlice.actions.setCurrentConversation(currentConversation)
    );
  };
};

export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(conversationsSlice.actions.fetchCurrentMessages({ messages }));
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(conversationsSlice.actions.addDirectMessage({ message }));
  };
};
