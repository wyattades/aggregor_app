import React from 'react';
import { Platform, View, Slider as NativeSlider } from 'react-native';

let Slider;

if (Platform.OS === 'web') {

  Slider = ({
    value, minimumValue, maximumValue, minimumTrackTintColor,
    maximumTrackTintColor, thumbTintColor, step, style, onValueChange,
  }) => {

    const onChange = e => {
      let val = e.target.value;
      if (isNaN(val)) {
        val = parseFloat(val);
      }
      onValueChange(val);
    };

    return (
      <View style={[style]}>
        <input
          className="slider"
          type="range"
          defaultValue={value}
          min={minimumValue}
          max={maximumValue}
          step={step}
          onChange={onChange}/>
      </View>
    );
  };

} else {
  Slider = NativeSlider;
}

export default Slider;
