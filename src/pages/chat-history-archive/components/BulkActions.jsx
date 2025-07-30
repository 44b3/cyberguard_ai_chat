import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedCount, 
  totalCount, 
  onSelectAll, 
  onDeselectAll, 
  onBulkExport, 
  onBulkDelete,
  isAllSelected 
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 backdrop-blur-cosmic border border-primary/20 rounded-lg p-4 cosmic-glow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-foreground font-medium">
              {selectedCount} of {totalCount} conversations selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={isAllSelected ? onDeselectAll : onSelectAll}
              className="text-primary hover:text-primary/80"
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkExport}
            iconName="Download"
            iconPosition="left"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            Export Selected
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkDelete}
            iconName="Trash2"
            iconPosition="left"
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;