import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const quickPrompts = [
    {
      text: "Analyze network vulnerability",
      icon: "Shield",
      prompt: "Help me analyze potential network vulnerabilities in a typical enterprise environment. What should I look for during a penetration test?"
    },
    {
      text: "SQL injection techniques",
      icon: "Database",
      prompt: "Explain advanced SQL injection techniques for red team testing. Include both detection and exploitation methods."
    },
    {
      text: "Social engineering tactics",
      icon: "Users",
      prompt: "What are the most effective social engineering tactics for red team assessments? Include ethical considerations."
    },
    {
      text: "Web application security",
      icon: "Globe",
      prompt: "Guide me through a comprehensive web application security assessment. What tools and methodologies should I use?"
    }
  ];

  const handleQuickPrompt = (prompt) => {
    if (!isLoading && !disabled) {
      onSendMessage(prompt);
    }
  };

  return (
    <div className="border-t border-border bg-surface/80 backdrop-blur-cosmic">
      {/* Quick Prompts */}
      {message === '' && (
        <div className="px-6 py-4 border-b border-border/50">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt.prompt)}
                disabled={isLoading || disabled}
                className="text-xs cosmic-glow"
                iconName={prompt.icon}
                iconPosition="left"
                iconSize={14}
              >
                {prompt.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end space-x-4">
            {/* Message Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cybersecurity, penetration testing, or red team tactics..."
                disabled={isLoading || disabled}
                className="w-full min-h-[48px] max-h-[120px] px-4 py-3 pr-12 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 cosmic-glow"
                rows={1}
              />
              
              {/* Character Count */}
              <div className="absolute bottom-2 right-12 text-xs text-muted-foreground font-data">
                {message.length}/2000
              </div>
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={!message.trim() || isLoading || disabled}
              loading={isLoading}
              className="cosmic-glow-intense"
              iconName="Send"
              iconPosition="right"
              iconSize={18}
            >
              {isLoading ? 'Analyzing...' : 'Send'}
            </Button>
          </div>

          {/* Input Enhancements */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Zap" size={14} className="text-primary" />
                <span>AI-powered cybersecurity assistance</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Shield" size={14} className="text-success" />
                <span>Secure & encrypted</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Press</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-data">Enter</kbd>
              <span>to send</span>
            </div>
          </div>
        </form>
      </div>

      {/* Status Indicators */}
      {(isLoading || disabled) && (
        <div className="px-6 pb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {isLoading && (
              <>
                <div className="w-2 h-2 bg-primary rounded-full animate-cosmic-pulse"></div>
                <span>AI is analyzing your security query...</span>
              </>
            )}
            {disabled && (
              <>
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span>Chat interface is temporarily disabled</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;