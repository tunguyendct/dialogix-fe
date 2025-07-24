import type {
  ApiResponse,
  ChatCompletionResponse,
  Message,
  SendMessageRequest,
} from '../types';

// Base API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// API version
const API_VERSION = import.meta.env.VITE_API_VERSION || 'api/v1';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}/${API_VERSION}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  // Send a message to the chat API
  async sendMessage(
    request: SendMessageRequest
  ): Promise<ApiResponse<ChatCompletionResponse>> {
    return this.request<ChatCompletionResponse>('/conversation/message', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Get chat history (if your backend supports it)
  async getChatHistory(
    conversationId: string
  ): Promise<ApiResponse<{ messages: Message[] }>> {
    return this.request<{ messages: Message[] }>(
      `/chat/history/${conversationId}`
    );
  }

  // Create a new conversation
  async createConversation(): Promise<ApiResponse<{ conversationId: string }>> {
    return this.request('/chat/conversations', {
      method: 'POST',
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request('/health');
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();

// Export the class for testing or custom instances
export { ApiClient };
