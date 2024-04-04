import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

function getProgress(props) {
  return ((props.progress - props.min) / (props.max - props.min)) * 100;
}

export default function ProgressBar(props) {
  const [progressValue, setProgressValue] = useState(0);
  const animatedProgressValue = useRef(new Animated.Value(0)).current;

  animatedProgressValue.addListener((callback) => {
    setProgressValue(callback.value);
  });

  useEffect(() => {
    const progress = getProgress(props);
    if (progress > 100) {
      progress = 100;
    }
    Animated.timing(animatedProgressValue, { toValue: progress, duration: 500 }).start();
  }, [animatedProgressValue, props.progress]);

  return (
    <View style={[styles.container, { backgroundColor: props.backColor, borderColor: props.borderColor }]}>
      <View style={[styles.bar, { width: progressValue + "%", backgroundColor: props.barColor }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 40,
    padding: 0,
    overflow: "hidden",
    borderRadius: 5,
    width: '100%',
  },
  bar: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 0,
    borderRadius: 4,
  }
});
