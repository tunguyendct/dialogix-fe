import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { ChatCompletionResponse, SendMessageRequest } from '../types';

// Hook for sending messages
export const useSendMessage = () => {
  return useMutation<ChatCompletionResponse, Error, SendMessageRequest>({
    mutationFn: async (request: SendMessageRequest) => {
      const response = await apiClient.sendMessage(request);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to send message');
      }
      return response.data;
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });
};

// Hook for health check
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.healthCheck();
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Health check failed');
      }
      return response.data;
    },
    retry: 3,
    retryDelay: 2000,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for creating a new conversation
export const useCreateConversation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.createConversation();
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create conversation');
      }
      return response.data;
    },
  });
};

// Hook for getting chat history
export const useChatHistory = (conversationId: string, enabled = true) => {
  return useQuery({
    queryKey: ['chatHistory', conversationId],
    queryFn: async () => {
      const response = await apiClient.getChatHistory(conversationId);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch chat history');
      }
      return response.data;
    },
    enabled: enabled && !!conversationId,
  });
};
