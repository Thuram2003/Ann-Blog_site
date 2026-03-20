import React from 'react';
import Select, { StylesConfig } from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({ options, value, onChange, placeholder, disabled, className }: SearchableSelectProps) {
  const selectedOption = options.find(opt => opt.value === value) || null;

  const customStyles: StylesConfig<Option, false> = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#00a7b3' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 1px #00a7b3' : 'none',
      '&:hover': {
        borderColor: '#00a7b3'
      },
      padding: '2px',
      borderRadius: '0.5rem',
      backgroundColor: disabled ? '#f9fafb' : 'white',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#00a7b3' : state.isFocused ? '#e6f6f7' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#00a7b3',
        color: 'white'
      }
    }),
    singleValue: (base, state) => ({
      ...base,
      color: state.isDisabled ? '#9ca3af' : '#111827'
    })
  };

  return (
    <div className={className}>
      <Select
        value={selectedOption}
        onChange={(option) => onChange(option ? option.value : '')}
        options={options}
        isDisabled={disabled}
        placeholder={placeholder || 'Select...'}
        isClearable={false}
        isSearchable={true}
        styles={customStyles}
        instanceId={`searchable-select-${placeholder?.replace(/\s+/g, '-').toLowerCase()}`}
      />
    </div>
  );
}
