import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ModelSelection = ({ selectedModel, onModelChange, availableModels }) => {
  const modelOptions = availableModels.map(model => ({
    value: model.id,
    label: model.name,
    description: model.description
  }));

  const selectedModelInfo = availableModels.find(model => model.id === selectedModel);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center cosmic-glow">
          <Icon name="Brain" size={20} className="text-secondary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">AI Model Selection</h3>
          <p className="text-sm text-muted-foreground">Choose your preferred AI model for cybersecurity assistance</p>
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="AI Model"
          description="Select the AI model optimized for cybersecurity and red team operations"
          options={modelOptions}
          value={selectedModel}
          onChange={onModelChange}
          searchable
          placeholder="Choose an AI model..."
        />

        {selectedModelInfo && (
          <div className="p-4 bg-surface/50 border border-border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">{selectedModelInfo.name}</h4>
              {selectedModelInfo.recommended && (
                <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                  Recommended
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">{selectedModelInfo.fullDescription}</p>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={14} className="text-warning" />
                <span className="text-muted-foreground">Performance: {selectedModelInfo.performance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-success" />
                <span className="text-muted-foreground">Security Focus: {selectedModelInfo.securityFocus}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-primary" />
                <span className="text-muted-foreground">Response Time: {selectedModelInfo.responseTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} className="text-accent" />
                <span className="text-muted-foreground">Cost: {selectedModelInfo.cost}</span>
              </div>
            </div>

            {selectedModelInfo.capabilities && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-foreground mb-2">Key Capabilities:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedModelInfo.capabilities.map((capability, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSelection;