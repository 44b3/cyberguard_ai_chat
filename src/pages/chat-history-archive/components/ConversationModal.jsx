import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationModal = ({ conversation, onClose, onContinue, onExport, onDelete }) => {
  const [activeTab, setActiveTab] = useState('messages');

  if (!conversation) return null;

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const tabs = [
    { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'attachments', label: 'Attachments', icon: 'Paperclip' }
  ];

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-cosmic"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface/90 backdrop-blur-cosmic border border-border rounded-lg cosmic-glow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-heading font-bold text-foreground truncate">
              {conversation.title}
            </h2>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-muted-foreground">
                {formatTimestamp(conversation.createdAt)}
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                {conversation.domain.replace('-', ' ')}
              </span>
              <span className="text-sm text-muted-foreground">
                {conversation.messageCount} messages
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContinue(conversation)}
              iconName="Play"
              iconPosition="left"
            >
              Continue Chat
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 px-6 pt-4 border-b border-border/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'messages' && (
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {conversation.messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user' ?'bg-primary/20 text-foreground' :'bg-surface/60 text-foreground'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {message.role === 'user' ? 'You' : 'CyberGuard AI'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(message.timestamp)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(message.content)}
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        >
                          <Icon name="Copy" size={12} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground">Conversation Info</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="text-foreground">{formatTimestamp(conversation.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground">{Math.floor(conversation.duration / 60)}m {conversation.duration % 60}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Messages:</span>
                      <span className="text-foreground">{conversation.messageCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domain:</span>
                      <span className="text-foreground capitalize">{conversation.domain.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground">Tags & Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {conversation.tags?.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => onExport(conversation)}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Conversation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onDelete(conversation)}
                  iconName="Trash2"
                  iconPosition="left"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  Delete Conversation
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="p-6">
              {conversation.hasAttachments ? (
                <div className="text-center text-muted-foreground">
                  <Icon name="Paperclip" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Attachment functionality coming soon</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Icon name="FileX" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No attachments in this conversation</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;