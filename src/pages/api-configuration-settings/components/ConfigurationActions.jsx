import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationActions = ({ 
  onSave, 
  onReset, 
  onExportConfig, 
  onImportConfig,
  isSaving, 
  hasChanges,
  lastSaved 
}) => {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const config = JSON.parse(event.target.result);
            onImportConfig(config);
          } catch (error) {
            console.error('Invalid configuration file:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-success to-warning rounded-lg flex items-center justify-center cosmic-glow">
          <Icon name="Save" size={20} className="text-success-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Configuration Management</h3>
          <p className="text-sm text-muted-foreground">Save, reset, or backup your settings</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={onSave}
            disabled={!hasChanges}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            Save Configuration
          </Button>
          
          <Button
            variant="outline"
            onClick={onReset}
            disabled={!hasChanges}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1"
          >
            Reset to Defaults
          </Button>
        </div>

        {/* Backup Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={onExportConfig}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Export Configuration
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleImportClick}
            iconName="Upload"
            iconPosition="left"
            className="flex-1"
          >
            Import Configuration
          </Button>
        </div>

        {/* Status Information */}
        <div className="p-4 bg-surface/50 border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={hasChanges ? "AlertCircle" : "CheckCircle"} 
                size={16} 
                className={hasChanges ? "text-warning" : "text-success"} 
              />
              <span className="text-sm font-medium text-foreground">
                {hasChanges ? "Unsaved Changes" : "All Changes Saved"}
              </span>
            </div>
            
            {lastSaved && (
              <span className="text-xs text-muted-foreground">
                Last saved: {new Date(lastSaved).toLocaleString()}
              </span>
            )}
          </div>
          
          {hasChanges && (
            <p className="text-xs text-warning/80 mt-2">
              Remember to save your changes before navigating away
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => window.open('/main-chat-interface', '_blank')}
            className="p-3 bg-muted/20 hover:bg-muted/30 border border-border rounded-lg transition-colors group"
          >
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} className="text-primary group-hover:text-primary/80" />
              <span className="text-sm font-medium text-foreground">Test in Chat</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Open chat interface</p>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="p-3 bg-muted/20 hover:bg-muted/30 border border-border rounded-lg transition-colors group"
          >
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={16} className="text-secondary group-hover:text-secondary/80" />
              <span className="text-sm font-medium text-foreground">Refresh Page</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Reload configuration</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationActions;