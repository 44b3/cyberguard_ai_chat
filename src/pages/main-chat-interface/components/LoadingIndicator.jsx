import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingIndicator = ({ message = "AI is processing your request..." }) => {
  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-4xl">
        {/* Loading Header */}
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary cosmic-glow flex items-center justify-center">
            <Icon name="Bot" size={16} className="text-white" />
          </div>
          <div className="ml-2">
            <span className="text-sm font-medium text-foreground">CyberGuard AI</span>
            <div className="text-xs text-muted-foreground font-data">Analyzing...</div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="mr-8 relative">
          <div className="p-4 rounded-2xl bg-surface/80 backdrop-blur-cosmic border border-border">
            {/* Animated Dots */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-cosmic-pulse"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-cosmic-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-cosmic-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">{message}</span>
            </div>

            {/* Simulated Processing Steps */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-1 h-1 bg-success rounded-full animate-cosmic-pulse"></div>
                <span>Analyzing security context...</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-1 h-1 bg-primary rounded-full animate-cosmic-pulse" style={{ animationDelay: '1s' }}></div>
                <span>Consulting cybersecurity knowledge base...</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-1 h-1 bg-secondary rounded-full animate-cosmic-pulse" style={{ animationDelay: '2s' }}></div>
                <span>Generating specialized response...</span>
              </div>
            </div>

            {/* Cosmic Loading Animation */}
            <div className="mt-4 relative h-8 overflow-hidden rounded-lg bg-muted/20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-shooting-star"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-4 bg-gradient-to-t from-primary to-secondary rounded-full animate-cosmic-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          <div className="absolute top-4 left-0 -translate-x-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-cosmic-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;