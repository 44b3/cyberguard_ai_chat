import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationCard = ({ 
  conversation, 
  onSelect, 
  onDelete, 
  onExport, 
  isSelected, 
  onToggleSelect 
}) => {
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const conversationDate = new Date(date);
    const diffTime = Math.abs(now - conversationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return conversationDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: conversationDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  const getDomainIcon = (domain) => {
    const iconMap = {
      'penetration-testing': 'Shield',
      'vulnerability-assessment': 'Bug',
      'threat-analysis': 'AlertTriangle',
      'malware-analysis': 'Virus',
      'network-security': 'Network',
      'web-security': 'Globe',
      'social-engineering': 'Users'
    };
    return iconMap[domain] || 'MessageSquare';
  };

  const getDomainColor = (domain) => {
    const colorMap = {
      'penetration-testing': 'text-primary',
      'vulnerability-assessment': 'text-warning',
      'threat-analysis': 'text-error',
      'malware-analysis': 'text-destructive',
      'network-security': 'text-secondary',
      'web-security': 'text-success',
      'social-engineering': 'text-accent'
    };
    return colorMap[domain] || 'text-muted-foreground';
  };

  return (
    <div className={`group relative bg-surface/40 backdrop-blur-cosmic border rounded-lg p-4 transition-all duration-300 hover:bg-surface/60 hover:cosmic-glow ${
      isSelected ? 'border-primary/50 bg-primary/5' : 'border-border/30'
    }`}>
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(conversation.id);
          }}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected 
              ? 'bg-primary border-primary' :'border-border/50 hover:border-primary/50'
          }`}
        >
          {isSelected && <Icon name="Check" size={12} className="text-primary-foreground" />}
        </button>
      </div>

      {/* Main Content */}
      <div 
        className="cursor-pointer pl-8"
        onClick={() => onSelect(conversation)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-heading font-semibold text-foreground truncate pr-2">
              {conversation.title}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getDomainIcon(conversation.domain)} 
                  size={14} 
                  className={getDomainColor(conversation.domain)} 
                />
                <span className="text-sm text-muted-foreground capitalize">
                  {conversation.domain.replace('-', ' ')}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDate(conversation.createdAt)}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onExport(conversation);
              }}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Export conversation"
            >
              <Icon name="Download" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(conversation);
              }}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              title="Delete conversation"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {conversation.preview}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} />
              <span>{conversation.messageCount} messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{formatDuration(conversation.duration)}</span>
            </div>
            {conversation.hasAttachments && (
              <div className="flex items-center space-x-1">
                <Icon name="Paperclip" size={12} />
                <span>Attachments</span>
              </div>
            )}
          </div>
          
          {conversation.isBookmarked && (
            <Icon name="Bookmark" size={12} className="text-warning" />
          )}
        </div>

        {/* Tags */}
        {conversation.tags && conversation.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {conversation.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
            {conversation.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full">
                +{conversation.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationCard;