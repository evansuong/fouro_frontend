import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Animated } from 'react-native';

/**
 * A custom-made button used for page routing
 * @param {navigationObj} navigation Navigation object to be used for page
 *                                   routing
 * @param {string} link The page name to navigate to
 * @param {string} text The text to be rendered on the button
 * @param {color} color The background color of the button
 */
export default function LinkedButton({ navigation, link, text, color, onPress }) {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1));

  const linkedButtonContainer = {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 14,
    backgroundColor: `${color}`,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    transition: 'all 0.5s',
    cursor: 'pointer',
  }

  function handlePressIn() {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  function handlePressOut() {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 10,
      tension: 100,
      useNativeDriver: true,
    }).start()
    if (navigation != undefined) {
      setTimeout(() => {
        navigation.navigate(link);
      }, 50)
    }
  }

  const animatedStyle = {
    transform: [{ scale: animatedValue}]
  }

  return (
    <TouchableWithoutFeedback 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[linkedButtonContainer, animatedStyle]}>
          <Text style={styles.buttonText}>{text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat_400Regular'
  }
})
