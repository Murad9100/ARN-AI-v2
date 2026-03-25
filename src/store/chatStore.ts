import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Conversation } from '../types';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isGenerating: boolean;
  
  createConversation: () => string;
  setActiveConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  deleteConversation: (id: string) => void;
  clearAllConversations: () => void;
  setGenerating: (value: boolean) => void;
  updateLastMessage: (conversationId: string, content: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useChatStore = create<ChatState>()(
  persist(
    (set, _get) => ({
      conversations: [],
      activeConversationId: null,
      isGenerating: false,

      createConversation: () => {
        const id = generateId();
        const newConversation: Conversation = {
          id,
          title: 'Yeni söhbət',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        set(state => ({
          conversations: [newConversation, ...state.conversations],
          activeConversationId: id
        }));
        
        return id;
      },

      setActiveConversation: (id: string) => {
        set({ activeConversationId: id });
      },

      addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          timestamp: new Date()
        };

        set(state => ({
          conversations: state.conversations.map(conv => {
            if (conv.id === conversationId) {
              const updatedMessages = [...conv.messages, newMessage];
              const title = conv.messages.length === 0 && message.role === 'user' 
                ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
                : conv.title;
              
              return {
                ...conv,
                messages: updatedMessages,
                title,
                updatedAt: new Date()
              };
            }
            return conv;
          })
        }));
      },

      deleteConversation: (id: string) => {
        set(state => {
          const newConversations = state.conversations.filter(c => c.id !== id);
          const newActiveId = state.activeConversationId === id 
            ? (newConversations[0]?.id || null)
            : state.activeConversationId;
          
          return {
            conversations: newConversations,
            activeConversationId: newActiveId
          };
        });
      },

      clearAllConversations: () => {
        set({ conversations: [], activeConversationId: null });
      },

      setGenerating: (value: boolean) => {
        set({ isGenerating: value });
      },

      updateLastMessage: (conversationId: string, content: string) => {
        set(state => ({
          conversations: state.conversations.map(conv => {
            if (conv.id === conversationId && conv.messages.length > 0) {
              const messages = [...conv.messages];
              messages[messages.length - 1] = {
                ...messages[messages.length - 1],
                content
              };
              return { ...conv, messages };
            }
            return conv;
          })
        }));
      }
    }),
    {
      name: 'arn-chat'
    }
  )
);
