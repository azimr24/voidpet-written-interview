import { Pressable, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../store/useAuth";
import AnimatedText, { AnimatedTextHandle } from "../components/AnimatedText";
import { useRef } from "react";
import tw from "twrnc";
import type { AuthStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { TapAnywhere } from "../components/TapAnywhere";

type PurposeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Purpose"
>;

type Props = {
  navigation: PurposeScreenNavigationProp;
};

export default function PurposeScreen({ navigation }: Props) {
  const ref = useRef<AnimatedTextHandle>(null);
  return (
    <ImageBackground
      resizeMode="cover"
      style={tw`flex-1 justify-center items-center`}
      source={require("../../assets/home_bg.jpg")}
    >
      <LinearGradient
        colors={["rgba(27,42,89, 1.0)", "transparent"]}
        style={tw`absolute inset-0`}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <LottieView
        style={tw`absolute inset-0`}
        source={require("../../assets/lottie/snow.lottie")}
        autoPlay
        loop
      ></LottieView>
      <Pressable
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onPress={() => ref.current?.next()}
      >
        <AnimatedText navigation={navigation} ref={ref} />
        <TapAnywhere></TapAnywhere>
      </Pressable>
    </ImageBackground>
  );
}
