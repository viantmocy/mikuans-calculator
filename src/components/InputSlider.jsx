import React, { useState } from 'react';

const InputSlider = ({ label, options, value, onChange, type }) => {
  const [isManual, setIsManual] = useState(false);
  const [manualValue, setManualValue] = useState(value?.toString() || '');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setManualValue(newValue);
    onChange({
      target: {
        name: label.toLowerCase().replace(' ', '_'),
        value: type === 'number' ? parseFloat(newValue) || 0 : newValue,
        type: type === 'number' ? 'number' : 'select',
      },
    });
  };

  const handleSelectChange = (e) => {
    const stringValue = e.target.value;
    const numberValue = stringValue ? parseFloat(stringValue) : '';
    setManualValue(stringValue);
    onChange({
      target: {
        name: label.toLowerCase().replace(' ', '_'),
        value: numberValue,
        type: 'select',
      },
    });
  };

  const toggleInputMode = () => {
    setIsManual(!isManual);
    if (!isManual) {
      onChange({
        target: {
          name: label.toLowerCase().replace(' ', '_'),
          value: parseFloat(manualValue) || 0,
          type: 'number',
        },
      });
    } else {
      setManualValue(value?.toString() || '');
      handleSelectChange({ target: { value: value?.toString() || '' } });
    }
  };

  return (
    <div className="input-group">
      <label>{label}</label>
      <div className="input-container">
        {isManual ? (
          <input
            type="number"
            value={manualValue}
            onChange={handleInputChange}
            placeholder={`Enter ${label}`}
            className="manual-input"
          />
        ) : (
          <select value={manualValue} onChange={handleSelectChange} className="select-input">
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
        <button onClick={toggleInputMode} className="toggle-button">
          {isManual ? 'Select' : 'Manual'}
        </button>
      </div>
    </div>
  );
};

export default InputSlider;
