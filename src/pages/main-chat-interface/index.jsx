import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import CosmicBackground from '../../components/ui/CosmicBackground';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import Icon from '../../components/AppIcon';
import openaiService from '../../services/openaiService';

const MainChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENROUTER_API_KEY || '');
  const [showSettings, setShowSettings] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, currentStreamingMessage]);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('cyberguard_chat_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Failed to load saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('cyberguard_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Check API key validity on mount
  useEffect(() => {
    const checkApiKey = () => {
      const status = openaiService.getApiKeyStatus();
      console.log('API Key Status:', status);
      
      if (!openaiService.validateApiKey()) {
        setError({
          type: 'config_error',
          message: 'OpenRouter API key is not configured or invalid.',
          details: `Status: Has Key: ${status.hasApiKey}, Valid Format: ${status.isValidFormat}, Client Ready: ${status.clientInitialized}`,
          code: 'CONFIG_001'
        });
      } else {
        // Clear any existing config errors if key is now valid
        if (error?.type === 'config_error') {
          setError(null);
        }
      }
    };

    checkApiKey();
  }, []);

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim() || isLoading || isStreaming) return;

    // Clear any existing errors
    setError(null);

    // Validate API key before sending
    if (!openaiService.validateApiKey()) {
      setError({
        type: 'config_error',
        message: 'Please configure your OpenRouter API key before sending messages.',
        details: 'Invalid or missing API key',
        code: 'CONFIG_001'
      });
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsStreaming(true);
    setCurrentStreamingMessage('');

    try {
      // Prepare conversation history for context
      const conversationHistory = openaiService.formatConversationHistory(messages);

      // Stream the AI response
      const aiResponse = await openaiService.getChatCompletion(
        messageContent,
        (chunk) => {
          setCurrentStreamingMessage(prev => prev + chunk);
        },
        conversationHistory
      );

      // Create the final AI message
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        tags: aiResponse.tags,
        codeBlock: aiResponse.codeBlock
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentStreamingMessage('');

    } catch (apiError) {
      console.error('Error sending message:', apiError);
      setError(apiError);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all chat messages? This action cannot be undone.')) {
      setMessages([]);
      setError(null);
      setCurrentStreamingMessage('');
      localStorage.removeItem('cyberguard_chat_messages');
    }
  };

  const handleCopyMessage = (content) => {
    console.log('Message copied:', content.substring(0, 50) + '...');
  };

  const handleQuickStart = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleRetryError = () => {
    setError(null);
    // Retry the last user message if available
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleApiKeyUpdate = (newApiKey) => {
    setApiKey(newApiKey);
    
    // Update the service with new API key
    openaiService.updateApiKey(newApiKey);
    
    // Check if the new key is valid
    const isValid = openaiService.validateApiKey();
    
    if (isValid) {
      // Clear any configuration errors
      if (error?.type === 'config_error' || error?.type === 'auth_error') {
        setError(null);
      }
    } else {
      setError({
        type: 'config_error',
        message: 'Invalid OpenRouter API key format. Please check your key.',
        details: 'API key must start with "sk-or-v1-" and be properly formatted',
        code: 'CONFIG_002'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>CyberGuard AI Chat - Advanced Cybersecurity Assistant</title>
        <meta name="description" content="AI-powered cybersecurity chat interface specialized in red team operations, penetration testing, and security analysis" />
        <meta name="keywords" content="cybersecurity, AI chat, penetration testing, red team, security analysis, vulnerability assessment" />
      </Helmet>

      <CosmicBackground animationIntensity="normal" deviceCapabilities="high" />

      <div className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <ChatHeader
            onClearChat={handleClearChat}
            messageCount={messages.length}
            onToggleSettings={handleToggleSettings}
          />

          {/* Chat Container */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar"
            >
              {messages.length === 0 && !isLoading && !error ? (
                <EmptyState onQuickStart={handleQuickStart} />
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      onCopy={handleCopyMessage}
                    />
                  ))}
                  
                  {/* Streaming Message Display */}
                  {isStreaming && currentStreamingMessage && (
                    <div className="flex justify-start mb-6 group">
                      <div className="max-w-4xl order-1">
                        <div className="flex items-center mb-2 justify-start">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-accent to-primary cosmic-glow">
                              <Icon name="Bot" size={16} className="text-white" />
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-medium text-foreground">CyberGuard AI</span>
                              <span className="text-xs text-muted-foreground font-data">Analyzing...</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative mr-8">
                          <div className="p-4 rounded-2xl backdrop-blur-cosmic border bg-surface/80 border-border text-foreground">
                            <div className="prose prose-invert max-w-none">
                              {currentStreamingMessage.split('\n').map((line, index) => (
                                <p key={index} className="mb-2 last:mb-0 text-sm leading-relaxed">
                                  {line}
                                </p>
                              ))}
                              <span className="inline-block w-2 h-4 bg-primary animate-cosmic-pulse ml-1"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {isLoading && !isStreaming && (
                    <LoadingIndicator message="CyberGuard AI is analyzing your cybersecurity query..." />
                  )}
                  
                  {error && (
                    <ErrorMessage
                      error={error}
                      onRetry={handleRetryError}
                      onDismiss={handleDismissError}
                    />
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading || isStreaming}
              disabled={!!error && error.type === 'config_error'}
            />
          </div>
        </div>

        {/* Settings Modal Overlay */}
        {showSettings && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-cosmic z-50 flex items-center justify-center p-4">
            <div className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full cosmic-glow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-bold text-foreground">API Configuration</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    OpenRouter API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => handleApiKeyUpdate(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="sk-or-v1-..."
                  />
                </div>
                <div className="text-xs text-muted-foreground space-y-2">
                  <p>Current Model: <span className="font-data text-accent">tngtech/deepseek-r1t2-chimera:free</span></p>
                  <p>Specialized for cybersecurity and red team operations</p>
                  <p>Your API key is stored locally and secured.</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className={`text-xs font-medium ${
                    openaiService.validateApiKey() ? 'text-success' : 'text-error'
                  }`}>
                    {openaiService.validateApiKey() ? '✓ API Key Valid' : '✗ Invalid API Key'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainChatInterface;