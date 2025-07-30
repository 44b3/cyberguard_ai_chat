import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isExpanded, 
  onToggleExpanded 
}) => {
  const securityDomainOptions = [
    { value: 'all', label: 'All Domains' },
    { value: 'penetration-testing', label: 'Penetration Testing' },
    { value: 'vulnerability-assessment', label: 'Vulnerability Assessment' },
    { value: 'threat-analysis', label: 'Threat Analysis' },
    { value: 'malware-analysis', label: 'Malware Analysis' },
    { value: 'network-security', label: 'Network Security' },
    { value: 'web-security', label: 'Web Security' },
    { value: 'social-engineering', label: 'Social Engineering' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'duration-desc', label: 'Longest Duration' },
    { value: 'duration-asc', label: 'Shortest Duration' },
    { value: 'messages-desc', label: 'Most Messages' },
    { value: 'messages-asc', label: 'Least Messages' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Short (< 5 min)' },
    { value: 'medium', label: 'Medium (5-30 min)' },
    { value: 'long', label: 'Long (> 30 min)' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const hasActiveFilters = filters.domain !== 'all' || 
                          filters.duration !== 'all' || 
                          filters.dateRange !== 'all' ||
                          filters.sortBy !== 'date-desc';

  return (
    <div className="bg-surface/60 backdrop-blur-cosmic border border-border/50 rounded-lg p-4 cosmic-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="RotateCcw" size={16} className="mr-1" />
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Security Domain"
            options={securityDomainOptions}
            value={filters.domain}
            onChange={(value) => onFilterChange('domain', value)}
            className="w-full"
          />

          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
            className="w-full"
          />

          <Select
            label="Duration"
            options={durationOptions}
            value={filters.duration}
            onChange={(value) => onFilterChange('duration', value)}
            className="w-full"
          />

          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => onFilterChange('dateRange', value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default FilterPanel;