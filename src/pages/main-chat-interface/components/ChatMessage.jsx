import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      onCopy(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
      <div className={`max-w-4xl ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message Header */}
        <div className={`flex items-center mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-center space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser 
                ? 'bg-gradient-to-br from-primary to-secondary cosmic-glow' :'bg-gradient-to-br from-accent to-primary cosmic-glow'
            }`}>
              <Icon 
                name={isUser ? "User" : "Bot"} 
                size={16} 
                className="text-white" 
              />
            </div>
            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <span className="text-sm font-medium text-foreground">
                {isUser ? 'You' : 'CyberGuard AI'}
              </span>
              <span className="text-xs text-muted-foreground font-data">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className={`relative ${isUser ? 'ml-8' : 'mr-8'}`}>
          <div className={`p-4 rounded-2xl backdrop-blur-cosmic border transition-all duration-300 ${
            isUser
              ? 'bg-primary/10 border-primary/20 text-foreground'
              : 'bg-surface/80 border-border text-foreground'
          }`}>
            {/* Message Text */}
            <div className="prose prose-invert max-w-none">
              {message.content.split('\n').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0 text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            {/* Code Block Rendering */}
            {message.codeBlock && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-data">
                    {message.codeBlock.language || 'Code'}
                  </span>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleCopy()}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={14} />
                  </Button>
                </div>
                <pre className="text-xs font-data text-foreground overflow-x-auto">
                  <code>{message.codeBlock.content}</code>
                </pre>
              </div>
            )}

            {/* Technical Tags */}
            {message.tags && message.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-full border border-secondary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Copy Button */}
          {!isUser && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="w-8 h-8 text-muted-foreground hover:text-foreground cosmic-glow"
                title="Copy message"
              >
                <Icon name={copied ? "Check" : "Copy"} size={14} />
              </Button>
            </div>
          )}

          {/* Message Indicator */}
          <div className={`absolute top-4 ${isUser ? 'right-0 translate-x-2' : 'left-0 -translate-x-2'}`}>
            <div className={`w-3 h-3 rounded-full ${
              isUser ? 'bg-primary' : 'bg-accent'
            } animate-cosmic-pulse`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;