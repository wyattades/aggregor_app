import { Animated, Easing } from 'react-native';

// Side to side transition

export default () => ({

  transitionSpec: {
    duration: 250,
    easing: Easing.inOut(Easing.ease),
    timing: Animated.timing,
  },

  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;

    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [width, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [1, 1],
    });

    return { opacity, transform: [{ translateX }] };
  },

});
