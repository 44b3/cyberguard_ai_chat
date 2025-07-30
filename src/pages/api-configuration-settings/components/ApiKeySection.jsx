import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ApiKeySection = ({ apiKey, onApiKeyChange, onTestConnection, isConnecting, connectionStatus }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleApiKeyChange = (e) => {
    const value = e.target.value;
    setTempApiKey(value);
    onApiKeyChange(value);
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { name: 'XCircle', color: 'text-error' };
      case 'testing':
        return { name: 'Loader', color: 'text-warning' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center cosmic-glow">
          <Icon name="Key" size={20} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">API Configuration</h3>
          <p className="text-sm text-muted-foreground">Configure your OpenRouter API integration</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            label="OpenRouter API Key"
            type={showApiKey ? "text" : "password"}
            placeholder="sk-or-v1-..."
            value={tempApiKey}
            onChange={handleApiKeyChange}
            description="Your OpenRouter API key for AI model access"
            className="pr-12"
          />
          <button
            type="button"
            onClick={toggleApiKeyVisibility}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showApiKey ? "Hide API key" : "Show API key"}
          >
            <Icon name={showApiKey ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
          <div className="flex items-center space-x-3">
            <Icon 
              name={statusIcon.name} 
              size={20} 
              className={`${statusIcon.color} ${connectionStatus === 'testing' ? 'animate-spin' : ''}`} 
            />
            <div>
              <p className="text-sm font-medium text-foreground">Connection Status</p>
              <p className="text-xs text-muted-foreground">
                {connectionStatus === 'connected' && 'API connection established'}
                {connectionStatus === 'error' && 'Connection failed - check your API key'}
                {connectionStatus === 'testing' && 'Testing connection...'}
                {connectionStatus === 'idle' && 'Not tested yet'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onTestConnection}
            disabled={!tempApiKey || isConnecting}
            loading={isConnecting}
            iconName="Zap"
            iconPosition="left"
          >
            Test Connection
          </Button>
        </div>

        {connectionStatus === 'connected' && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <p className="text-sm font-medium text-success">API Key Validated Successfully</p>
            </div>
            <p className="text-xs text-success/80 mt-1">Ready for cybersecurity AI assistance</p>
          </div>
        )}

        {connectionStatus === 'error' && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm font-medium text-error">Connection Failed</p>
            </div>
            <p className="text-xs text-error/80 mt-1">Please verify your API key and try again</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeySection;