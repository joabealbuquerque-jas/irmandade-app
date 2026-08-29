import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
}

interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'voice';
  media_url?: string;
  is_read: boolean;
  is_deleted: boolean;
  created_at: string;
  sender?: User;
}

interface Conversation {
  id: number;
  type: 'private' | 'group';
  title?: string;
  avatar_url?: string;
  owner_id?: number;
  last_message?: Message;
  unread_count: number;
  participants: User[];
  created_at: string;
  updated_at: string;
}

const SOCKET_URL = 'http://localhost:3000';

export const useMessages = (conversationId?: number) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Conectar ao WebSocket
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Conectado ao WebSocket');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do WebSocket');
      setIsConnected(false);
    });

    socket.on('new_message', (message: Message) => {
      if (message.conversation_id === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
      // Atualizar lista de conversas
      loadConversations();
    });

    socket.on('message_read', (data: { message_id: number; user_id: number }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.message_id ? { ...msg, is_read: true } : msg
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  // Carregar conversas
  const loadConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar conversas da API
      const mockConversations: Conversation[] = [
        {
          id: 1,
          type: 'private',
          unread_count: 2,
          participants: [
            {
              id: 2,
              name: 'Maria Santos',
              username: 'maria.santos',
            },
          ],
          created_at: '2026-08-29T10:00:00Z',
          updated_at: '2026-08-29T10:00:00Z',
        },
      ];
      setConversations(mockConversations);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar conversas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar mensagens de uma conversa
  const loadMessages = useCallback(async (convId: number) => {
    try {
      setIsLoading(true);
      // TODO: Carregar mensagens da API
      const mockMessages: Message[] = [
        {
          id: 1,
          conversation_id: convId,
          sender_id: 2,
          content: 'Paz de Deus, irmão!',
          type: 'text',
          is_read: true,
          is_deleted: false,
          created_at: '2026-08-29T10:00:00Z',
        },
        {
          id: 2,
          conversation_id: convId,
          sender_id: 1,
          content: 'Paz de Deus! Como você está?',
          type: 'text',
          is_read: true,
          is_deleted: false,
          created_at: '2026-08-29T10:01:00Z',
        },
      ];
      setMessages(mockMessages);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar mensagens');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Enviar mensagem
  const sendMessage = useCallback(async (data: {
    conversation_id: number;
    content: string;
    type?: string;
    media_url?: string;
  }) => {
    try {
      const newMessage: Message = {
        id: Date.now(),
        conversation_id: data.conversation_id,
        sender_id: 1, // TODO: Pegar do usuário logado
        content: data.content,
        type: (data.type as any) || 'text',
        media_url: data.media_url,
        is_read: false,
        is_deleted: false,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);

      // Enviar via WebSocket
      socketRef.current?.emit('send_message', newMessage);

      return { success: true, message: newMessage };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao enviar mensagem' };
    }
  }, []);

  // Marcar mensagem como lida
  const markAsRead = useCallback(async (messageId: number) => {
    try {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
      socketRef.current?.emit('mark_read', { message_id: messageId });
    } catch (err: any) {
      console.error('Erro ao marcar como lida:', err);
    }
  }, []);

  // Criar nova conversa
  const createConversation = useCallback(async (participantIds: number[], type: 'private' | 'group' = 'private', title?: string) => {
    try {
      // TODO: Criar conversa via API
      const newConversation: Conversation = {
        id: Date.now(),
        type,
        title,
        unread_count: 0,
        participants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setConversations((prev) => [newConversation, ...prev]);
      return { success: true, conversation: newConversation };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar conversa' };
    }
  }, []);

  // Deletar mensagem
  const deleteMessage = useCallback(async (messageId: number) => {
    try {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, is_deleted: true } : msg
        )
      );
      socketRef.current?.emit('delete_message', { message_id: messageId });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao deletar mensagem' };
    }
  }, []);

  useEffect(() => {
    loadConversations();
    if (conversationId) {
      loadMessages(conversationId);
    }
  }, [conversationId, loadConversations, loadMessages]);

  return {
    conversations,
    messages,
    isLoading,
    error,
    isConnected,
    loadConversations,
    loadMessages,
    sendMessage,
    markAsRead,
    createConversation,
    deleteMessage,
  };
};
