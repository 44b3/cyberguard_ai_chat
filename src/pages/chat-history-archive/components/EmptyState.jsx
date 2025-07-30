import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-conversations', 
  onStartChat, 
  onClearFilters,
  searchQuery = '' 
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-search-results':
        return {
          icon: 'SearchX',
          title: 'No conversations found',
          description: `No conversations match "${searchQuery}". Try adjusting your search terms or filters.`,
          action: {
            label: 'Clear Filters',
            onClick: onClearFilters,
            variant: 'outline'
          }
        };
      
      case 'no-filtered-results':
        return {
          icon: 'Filter',
          title: 'No conversations match filters',
          description: 'Try adjusting your filter criteria to see more conversations.',
          action: {
            label: 'Clear Filters',
            onClick: onClearFilters,
            variant: 'outline'
          }
        };
      
      default:
        return {
          icon: 'MessageSquare',
          title: 'No conversations yet',
          description: 'Start your first cybersecurity analysis conversation with CyberGuard AI. Your chat history will appear here for easy reference.',
          action: {
            label: 'Start First Chat',
            onClick: onStartChat,
            variant: 'default'
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Cosmic Background Elements */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center cosmic-glow">
          <Icon name={content.icon} size={48} className="text-primary" />
        </div>
        
        {/* Floating particles around the icon */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-cosmic-pulse opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-secondary rounded-full animate-cosmic-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -left-4 w-1.5 h-1.5 bg-accent rounded-full animate-cosmic-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md space-y-4">
        <h3 className="text-2xl font-heading font-bold text-foreground">
          {content.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {content.description}
        </p>

        {content.action && (
          <div className="pt-4">
            <Button
              variant={content.action.variant}
              onClick={content.action.onClick}
              iconName={content.action.variant === 'default' ? 'Plus' : 'RotateCcw'}
              iconPosition="left"
              className="cosmic-glow"
            >
              {content.action.label}
            </Button>
          </div>
        )}
      </div>

      {/* Decorative space elements */}
      <div className="absolute top-20 left-1/4 w-1 h-1 bg-primary rounded-full animate-cosmic-pulse opacity-30"></div>
      <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-secondary rounded-full animate-cosmic-pulse opacity-40" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-20 w-1.5 h-1.5 bg-accent rounded-full animate-cosmic-pulse opacity-20" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default EmptyState;