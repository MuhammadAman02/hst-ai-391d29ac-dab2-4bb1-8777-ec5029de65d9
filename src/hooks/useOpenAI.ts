import { useState, useCallback } from 'react';
import { Message, ChatState } from '@/types/chat';

export const useOpenAI = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const [apiKey, setApiKey] = useState<string>('');

  const sendMessage = useCallback(async (content: string) => {
    console.log('Sending message:', content);
    
    if (!apiKey) {
      setChatState(prev => ({
        ...prev,
        error: 'Please provide your OpenAI API key'
      }));
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      console.log('Making API request to OpenAI...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            ...chatState.messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      console.log('OpenAI response:', data);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0]?.message?.content || 'No response received',
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));

    } catch (error) {
      console.error('Error sending message:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
    }
  }, [apiKey, chatState.messages]);

  const clearChat = useCallback(() => {
    console.log('Clearing chat history');
    setChatState({
      messages: [],
      isLoading: false,
      error: null
    });
  }, []);

  const clearError = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  return {
    ...chatState,
    apiKey,
    setApiKey,
    sendMessage,
    clearChat,
    clearError
  };
};