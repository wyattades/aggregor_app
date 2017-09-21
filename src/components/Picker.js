import React from 'react';
import { Platform, Picker as NativePicker } from 'react-native';

import theme from '../utils/theme';

let Picker;

if (Platform.OS === 'web') {

  const style = {
    borderColor: theme.SUPPORT,
    padding: 8,
  };

  Picker = ({ selectedValue, onValueChange, children }) => {

    const handleChange = e => {
      onValueChange(e.target.value);
    };

    return (
      <select value={selectedValue} onChange={handleChange} style={style}>
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
