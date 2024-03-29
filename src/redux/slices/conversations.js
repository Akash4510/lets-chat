import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

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

        return {
          id: item._id,
          userId: user._id,
          name: `${user.firstName} ${user.lastName}`,
          online: user.status === 'online',
          img: faker.image.avatar(),
          lastMessage: lastMessage ? lastMessage.text || '' : '',
          time: lastMessage ? lastMessage.createdAt : new Date(),
          unread: 0,
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

      // Check if the conversation already exists in the state
      const conversationIndex = state.directChat.conversations.findIndex(
        (item) => item.id === thisConversation._id
      );

      if (conversationIndex !== -1) {
        // Conversation already exists, update its properties
        state.directChat.conversations[conversationIndex] = {
          ...state.directChat.conversations[conversationIndex],
          lastMessage: lastMessage ? lastMessage.text || '' : '',
          time: lastMessage ? lastMessage.createdAt : new Date(),
          unread: state.directChat.conversations[conversationIndex].unread, // Preserve the unread count
        };
      } else {
        // Conversation doesn't exist, add it to the state with unread count 0
        const newConversation = {
          id: thisConversation._id,
          userId: user._id,
          name: `${user.firstName} ${user.lastName}`,
          online: user.status === 'online',
          img: faker.image.avatar(),
          lastMessage: lastMessage ? lastMessage.text || '' : '',
          time: lastMessage ? lastMessage.createdAt : new Date(),
          unread: 0, // Initialize the unread count to 0
          pinned: false,
        };

        state.directChat.conversations.push(newConversation);
      }
    },

    updateConversationStatus: (state, action) => {
      const userId = action.payload.userId;

      // Update the status of the user in the conversations list
      const conversationIndex = state.directChat.conversations.findIndex(
        (c) => c.userId === userId
      );
      if (conversationIndex !== -1) {
        state.directChat.conversations[conversationIndex].online =
          action.payload.status === 'online';
      }
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

      const newConversation = {
        id: thisConversation._id,
        userId: user._id,
        name: `${user.firstName} ${user.lastName}`,
        online: user.status === 'online',
        img: faker.image.avatar(),
        lastMessage: lastMessage ? lastMessage.text || '' : '',
        time: lastMessage ? lastMessage.createdAt : new Date(),
        unread: 0,
        pinned: false,
      };

      state.directChat.conversations = [
        ...state.directChat.conversations,
        newConversation,
      ];
    },

    setCurrentConversation(state, action) {
      // Set the current conversation in the state
      state.directChat.currentConversation = action.payload;

      // Reset the unread count for the selected conversation to zero
      const conversationIndex = state.directChat.conversations.findIndex(
        (c) => c.id === action.payload.id
      );
      if (conversationIndex !== -1) {
        state.directChat.conversations[conversationIndex].unread = 0;
      }
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formattedMessages = messages.map((item) => {
        return {
          id: item._id,
          type: 'msg',
          subtype: item.type,
          message: item.text,
          incoming: item.to === userId,
          outgoing: item.from === userId,
          time: item.createdAt,
        };
      });

      state.directChat.currentMessages = formattedMessages;
    },

    addDirectMessage(state, action) {
      const newMessage = action.payload.message;
      console.log('newMessage: ', newMessage);

      state.directChat.currentMessages = [
        ...state.directChat.currentMessages,
        newMessage,
      ];

      console.log(state.directChat.currentMessages.slice(-10));

      // Update the lastMessage and time for the conversation of the sender
      const conversationIndexSender = state.directChat.conversations.findIndex(
        (c) => c.id === newMessage.conversationId
      );
      if (conversationIndexSender !== -1) {
        state.directChat.conversations[conversationIndexSender].lastMessage =
          newMessage.message;
        state.directChat.conversations[conversationIndexSender].time =
          newMessage.time;
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
          newMessage.time;

        // Increment the unread count if the conversation is not currently active
        if (
          state.directChat.currentConversation?.id !== newMessage.conversationId
        ) {
          state.directChat.conversations[conversationIndexReceiver].unread += 1;
        }
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

export const UpdateConversationStatus = ({ userId, status }) => {
  return async (dispatch, getState) => {
    dispatch(
      conversationsSlice.actions.updateConversationStatus({ userId, status })
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
