import React from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/AntDesign";
import { useEffect } from "react";
import { useRef } from "react";
export default function Loading() {
const turnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(turnAnim, {
      toValue: 360,
      duration: 22000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [turnAnim]);

  const spin = turnAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={tw`h-full justify-center items-center text-3xl bg-gray-300`}>
      <Animated.View
        style={tw.style(`bg-white p-3 rounded-full`, {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.29,
          shadowRadius: 7.0,
          elevation: 10,
          transform: [{ rotateZ: spin }],
        })}
      >
        <Icon name="sync" color="black" size={40} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({});