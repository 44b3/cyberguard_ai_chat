import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorMessage = ({ error, onRetry, onDismiss }) => {
  const getErrorDetails = (error) => {
    switch (error.type) {
      case 'api_error':
        return {
          title: 'API Connection Error',
          message: 'Unable to connect to the AI service. Please check your API configuration.',
          icon: 'WifiOff',
          color: 'error',
          suggestions: [
            'Verify your API key is correct',
            'Check your internet connection',
            'Ensure the API service is operational'
          ]
        };
      case 'rate_limit':
        return {
          title: 'Rate Limit Exceeded',
          message: 'Too many requests sent. Please wait before sending another message.',
          icon: 'Clock',
          color: 'warning',
          suggestions: [
            'Wait a few moments before trying again',
            'Consider upgrading your API plan',
            'Reduce the frequency of requests'
          ]
        };
      case 'invalid_response':
        return {
          title: 'Invalid Response',
          message: 'Received an unexpected response from the AI service.',
          icon: 'AlertCircle',
          color: 'error',
          suggestions: [
            'Try rephrasing your question',
            'Check if the service is experiencing issues',
            'Contact support if the problem persists'
          ]
        };
      case 'network_error':
        return {
          title: 'Network Error',
          message: 'Network connection failed. Please check your internet connection.',
          icon: 'Wifi',
          color: 'error',
          suggestions: [
            'Check your internet connection',
            'Try refreshing the page',
            'Disable any VPN or proxy if active'
          ]
        };
      default:
        return {
          title: 'Unknown Error',
          message: error.message || 'An unexpected error occurred.',
          icon: 'AlertTriangle',
          color: 'error',
          suggestions: [
            'Try refreshing the page',
            'Clear your browser cache',
            'Contact support if the issue persists'
          ]
        };
    }
  };

  const errorDetails = getErrorDetails(error);

  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-4xl">
        {/* Error Header */}
        <div className="flex items-center mb-2">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${errorDetails.color} to-${errorDetails.color}/80 cosmic-glow flex items-center justify-center`}>
            <Icon name="AlertTriangle" size={16} className="text-white" />
          </div>
          <div className="ml-2">
            <span className="text-sm font-medium text-foreground">System Error</span>
            <div className="text-xs text-muted-foreground font-data">
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="mr-8 relative">
          <div className="p-4 rounded-2xl bg-error/10 backdrop-blur-cosmic border border-error/20">
            {/* Error Icon and Title */}
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 bg-${errorDetails.color}/20 rounded-lg flex items-center justify-center`}>
                <Icon name={errorDetails.icon} size={20} className={`text-${errorDetails.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{errorDetails.title}</h3>
                <p className="text-sm text-muted-foreground">{errorDetails.message}</p>
              </div>
            </div>

            {/* Error Details */}
            {error.details && (
              <div className="mb-4 p-3 bg-muted/20 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground font-data">
                  <strong>Error Details:</strong>
                </div>
                <div className="text-xs text-muted-foreground font-data mt-1">
                  {error.details}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Suggested Solutions:</h4>
              <ul className="space-y-1">
                {errorDetails.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="cosmic-glow"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={14}
                >
                  Retry
                </Button>
              )}
              
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="text-muted-foreground hover:text-foreground"
                  iconName="X"
                  iconPosition="left"
                  iconSize={14}
                >
                  Dismiss
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-muted-foreground hover:text-foreground"
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={14}
              >
                Refresh Page
              </Button>
            </div>

            {/* Error Code */}
            {error.code && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="text-xs text-muted-foreground font-data">
                  Error Code: <span className="text-error">{error.code}</span>
                </div>
              </div>
            )}
          </div>

          {/* Error Indicator */}
          <div className="absolute top-4 left-0 -translate-x-2">
            <div className={`w-3 h-3 rounded-full bg-${errorDetails.color} animate-cosmic-pulse`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;