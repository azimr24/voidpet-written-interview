import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import tw from "twrnc";

export const TapAnywhere = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // bounce loop for the bottom hint
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -2,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);
  return (
    <Animated.Text
      style={[
        tw`absolute bottom-20 text-white`,
        {
          fontFamily: "SairaSemiBold",
          transform: [{ translateY: bounceAnim }],
          opacity: 0.9,
        },
      ]}
    >
      Tap anywhere to continue
    </Animated.Text>
  );
};
