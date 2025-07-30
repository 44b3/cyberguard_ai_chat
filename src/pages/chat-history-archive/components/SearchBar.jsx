import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onClear, searchValue, placeholder = "Search conversations..." }) => {
  const [localSearch, setLocalSearch] = useState(searchValue || '');

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalSearch('');
    onClear();
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={localSearch}
          onChange={handleSearch}
          className="pl-12 pr-12 h-12 bg-surface/80 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        {localSearch && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;