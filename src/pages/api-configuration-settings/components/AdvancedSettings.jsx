import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedSettings = ({ 
  settings, 
  onSettingsChange,
  onToggleSetting 
}) => {
  const handleInputChange = (field) => (e) => {
    onSettingsChange(field, e.target.value);
  };

  const handleCheckboxChange = (field) => (e) => {
    onToggleSetting(field, e.target.checked);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center cosmic-glow">
          <Icon name="Settings2" size={20} className="text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Advanced Configuration</h3>
          <p className="text-sm text-muted-foreground">Fine-tune AI response parameters and behavior</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Response Parameters */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="Sliders" size={16} className="text-primary" />
            <span>Response Parameters</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Max Tokens"
              type="number"
              placeholder="4096"
              value={settings.maxTokens}
              onChange={handleInputChange('maxTokens')}
              description="Maximum response length"
              min="100"
              max="8192"
            />
            
            <Input
              label="Temperature"
              type="number"
              placeholder="0.7"
              value={settings.temperature}
              onChange={handleInputChange('temperature')}
              description="Response creativity (0.0-2.0)"
              min="0"
              max="2"
              step="0.1"
            />
            
            <Input
              label="Top P"
              type="number"
              placeholder="0.9"
              value={settings.topP}
              onChange={handleInputChange('topP')}
              description="Nucleus sampling parameter"
              min="0"
              max="1"
              step="0.1"
            />
            
            <Input
              label="Frequency Penalty"
              type="number"
              placeholder="0.0"
              value={settings.frequencyPenalty}
              onChange={handleInputChange('frequencyPenalty')}
              description="Reduce repetition (-2.0 to 2.0)"
              min="-2"
              max="2"
              step="0.1"
            />
          </div>
        </div>

        {/* Connection Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="Wifi" size={16} className="text-secondary" />
            <span>Connection Settings</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Request Timeout (seconds)"
              type="number"
              placeholder="30"
              value={settings.timeout}
              onChange={handleInputChange('timeout')}
              description="API request timeout"
              min="5"
              max="300"
            />
            
            <Input
              label="Max Retries"
              type="number"
              placeholder="3"
              value={settings.maxRetries}
              onChange={handleInputChange('maxRetries')}
              description="Failed request retry attempts"
              min="0"
              max="10"
            />
          </div>
        </div>

        {/* Behavior Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="Brain" size={16} className="text-accent" />
            <span>AI Behavior</span>
          </h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Enable Cybersecurity Context"
              description="Prioritize security-focused responses and terminology"
              checked={settings.enableSecurityContext}
              onChange={handleCheckboxChange('enableSecurityContext')}
            />
            
            <Checkbox
              label="Red Team Mode"
              description="Optimize responses for penetration testing scenarios"
              checked={settings.redTeamMode}
              onChange={handleCheckboxChange('redTeamMode')}
            />
            
            <Checkbox
              label="Code Generation"
              description="Allow AI to generate security testing scripts and code"
              checked={settings.enableCodeGeneration}
              onChange={handleCheckboxChange('enableCodeGeneration')}
            />
            
            <Checkbox
              label="Detailed Explanations"
              description="Provide comprehensive explanations for security concepts"
              checked={settings.detailedExplanations}
              onChange={handleCheckboxChange('detailedExplanations')}
            />
            
            <Checkbox
              label="Auto-save Conversations"
              description="Automatically save chat history for future reference"
              checked={settings.autoSaveConversations}
              onChange={handleCheckboxChange('autoSaveConversations')}
            />
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="p-4 bg-muted/20 rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground flex items-center space-x-2 mb-3">
            <Icon name="BarChart3" size={16} className="text-success" />
            <span>Current Session Stats</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">247</p>
              <p className="text-xs text-muted-foreground">Tokens Used</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">12</p>
              <p className="text-xs text-muted-foreground">Requests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">1.2s</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">99.9%</p>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;