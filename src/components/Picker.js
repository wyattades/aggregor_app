import React from 'react';
import { Platform, Text, Picker as NativePicker } from 'react-native';

let Picker;

if (Platform.OS === 'web') {

  Picker = ({ style, selectedValue, onValueChange, children }) => {

    const handleChange = e => {
      onValueChange(e.target.value);
    };

    return (
      <select value={selectedValue} onChange={handleChange}>
        {children}
      </select>
    );
  };

  Picker.Item = ({ label, value }) => (
    <option value={value}>{label}</option>
  );

} else {
  Picker = NativePicker;
}

export default Picker;