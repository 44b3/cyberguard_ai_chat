import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CosmicBackground from '../../components/ui/CosmicBackground';
import ApiKeySection from './components/ApiKeySection';
import ModelSelection from './components/ModelSelection';
import AdvancedSettings from './components/AdvancedSettings';
import ConfigurationActions from './components/ConfigurationActions';

const ApiConfigurationSettings = () => {
  const [apiKey, setApiKey] = useState('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');
  const [selectedModel, setSelectedModel] = useState('tngtech/deepseek-r1t2-chimera:free');
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const [advancedSettings, setAdvancedSettings] = useState({
    maxTokens: '4096',
    temperature: '0.7',
    topP: '0.9',
    frequencyPenalty: '0.0',
    timeout: '30',
    maxRetries: '3',
    enableSecurityContext: true,
    redTeamMode: true,
    enableCodeGeneration: true,
    detailedExplanations: true,
    autoSaveConversations: true
  });

  const availableModels = [
    {
      id: 'tngtech/deepseek-r1t2-chimera:free',
      name: 'DeepSeek R1T2 Chimera (Free)',
      description: 'Optimized for cybersecurity and red team operations',
      fullDescription: `Advanced AI model specifically trained for cybersecurity applications, penetration testing, and red team operations. Provides detailed security analysis and recommendations.`,
      performance: 'High',
      securityFocus: 'Excellent',
      responseTime: '2-4s',
      cost: 'Free',
      recommended: true,
      capabilities: ['Penetration Testing', 'Vulnerability Analysis', 'Code Review', 'Threat Modeling', 'OSINT']
    },
    {
      id: 'openai/gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'General purpose AI with strong reasoning capabilities',
      fullDescription: `OpenAI's most capable model with excellent reasoning and analysis capabilities. Good for complex cybersecurity scenarios requiring deep understanding.`,
      performance: 'Very High',securityFocus: 'Good',responseTime: '1-3s',cost: 'Premium',
      recommended: false,
      capabilities: ['General Analysis', 'Code Generation', 'Documentation', 'Research', 'Problem Solving']
    },
    {
      id: 'anthropic/claude-3-sonnet',name: 'Claude 3 Sonnet',description: 'Balanced model with strong analytical capabilities',fullDescription: `Anthropic's balanced model offering strong analytical capabilities with a focus on safety and accuracy. Suitable for security research and analysis.`,
      performance: 'High',
      securityFocus: 'Very Good',
      responseTime: '2-5s',
      cost: 'Standard',
      recommended: false,
      capabilities: ['Security Research', 'Risk Assessment', 'Compliance', 'Documentation', 'Analysis']
    },
    {
      id: 'meta-llama/llama-3.1-70b-instruct',
      name: 'Llama 3.1 70B',
      description: 'Open-source model with strong technical capabilities',
      fullDescription: `Meta's open-source model with strong technical capabilities and good performance for cybersecurity tasks. Cost-effective option for extended usage.`,
      performance: 'High',securityFocus: 'Good',responseTime: '3-6s',cost: 'Low',
      recommended: false,
      capabilities: ['Technical Analysis', 'Scripting', 'Research', 'Documentation', 'General Security']
    }
  ];

  useEffect(() => {
    // Load saved configuration from localStorage
    const savedConfig = localStorage.getItem('cyberguard-api-config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setApiKey(config.apiKey || '');
        setSelectedModel(config.selectedModel || 'tngtech/deepseek-r1t2-chimera:free');
        setAdvancedSettings(prev => ({ ...prev, ...config.advancedSettings }));
        setLastSaved(config.lastSaved);
      } catch (error) {
        console.error('Failed to load saved configuration:', error);
      }
    }
  }, []);

  const handleApiKeyChange = (newApiKey) => {
    setApiKey(newApiKey);
    setHasChanges(true);
    setConnectionStatus('idle');
  };

  const handleModelChange = (newModel) => {
    setSelectedModel(newModel);
    setHasChanges(true);
  };

  const handleAdvancedSettingsChange = (field, value) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleToggleSetting = (field, value) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleTestConnection = async () => {
    if (!apiKey) return;

    setIsConnecting(true);
    setConnectionStatus('testing');

    try {
      // Simulate API connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - in real app, this would make actual API call
      if (apiKey.startsWith('sk-or-v1-')) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSaveConfiguration = async () => {
    setIsSaving(true);
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const config = {
        apiKey,
        selectedModel,
        advancedSettings,
        lastSaved: new Date().toISOString()
      };
      
      localStorage.setItem('cyberguard-api-config', JSON.stringify(config));
      setLastSaved(config.lastSaved);
      setHasChanges(false);
      
      // Show success notification (in real app, use toast/notification system)
      console.log('Configuration saved successfully');
    } catch (error) {
      console.error('Failed to save configuration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetConfiguration = () => {
    setApiKey('');
    setSelectedModel('tngtech/deepseek-r1t2-chimera:free');
    setAdvancedSettings({
      maxTokens: '4096',
      temperature: '0.7',
      topP: '0.9',
      frequencyPenalty: '0.0',
      timeout: '30',
      maxRetries: '3',
      enableSecurityContext: true,
      redTeamMode: true,
      enableCodeGeneration: true,
      detailedExplanations: true,
      autoSaveConversations: true
    });
    setConnectionStatus('idle');
    setHasChanges(true);
  };

  const handleExportConfiguration = () => {
    const config = {
      apiKey: '', // Don't export API key for security
      selectedModel,
      advancedSettings,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberguard-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportConfiguration = (config) => {
    try {
      if (config.selectedModel) setSelectedModel(config.selectedModel);
      if (config.advancedSettings) {
        setAdvancedSettings(prev => ({ ...prev, ...config.advancedSettings }));
      }
      setHasChanges(true);
      console.log('Configuration imported successfully');
    } catch (error) {
      console.error('Failed to import configuration:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>API Configuration Settings - CyberGuard AI Chat</title>
        <meta name="description" content="Configure your OpenRouter API integration and customize AI model preferences for optimal cybersecurity assistance." />
      </Helmet>

      <CosmicBackground animationIntensity="normal" deviceCapabilities="high" />

      <div className="min-h-screen bg-background pt-20 pb-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              API Configuration Settings
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Configure your OpenRouter API integration and customize AI model preferences for optimal cybersecurity assistance
            </p>
          </div>

          {/* Configuration Sections */}
          <div className="space-y-8">
            {/* API Key Configuration */}
            <div className="bg-surface/80 backdrop-blur-cosmic border border-border rounded-xl p-6 cosmic-glow">
              <ApiKeySection
                apiKey={apiKey}
                onApiKeyChange={handleApiKeyChange}
                onTestConnection={handleTestConnection}
                isConnecting={isConnecting}
                connectionStatus={connectionStatus}
              />
            </div>

            {/* Model Selection */}
            <div className="bg-surface/80 backdrop-blur-cosmic border border-border rounded-xl p-6 cosmic-glow">
              <ModelSelection
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
                availableModels={availableModels}
              />
            </div>

            {/* Advanced Settings */}
            <div className="bg-surface/80 backdrop-blur-cosmic border border-border rounded-xl p-6 cosmic-glow">
              <AdvancedSettings
                settings={advancedSettings}
                onSettingsChange={handleAdvancedSettingsChange}
                onToggleSetting={handleToggleSetting}
              />
            </div>

            {/* Configuration Actions */}
            <div className="bg-surface/80 backdrop-blur-cosmic border border-border rounded-xl p-6 cosmic-glow">
              <ConfigurationActions
                onSave={handleSaveConfiguration}
                onReset={handleResetConfiguration}
                onExportConfig={handleExportConfiguration}
                onImportConfig={handleImportConfiguration}
                isSaving={isSaving}
                hasChanges={hasChanges}
                lastSaved={lastSaved}
              />
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Your API key is stored locally and never transmitted to our servers. 
              All configurations are saved in your browser's local storage.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiConfigurationSettings;