import { useAuth } from "../store/useAuth";
import * as AppleAuthentication from "expo-apple-authentication";
import { ImageBackground, Image, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import type { AuthStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

export default function SignupScreen({ navigation }: Props) {
  const beginJourney = async () => {
    navigation.navigate("Onboarding");
  };

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
      <View style={tw`absolute top-1/5 justify-center items-center`}>
        <Text
          style={[
            tw`text-white text-4xl`,
            { fontFamily: "BungeeRegular", textAlign: "center", fontSize: 40 },
          ]}
        >
          VOIDPET{"\n"}DUNGEON
        </Text>
        <Image
          style={tw`w-100px h-100px`}
          source={require("../../assets/app_icon_no_bg.png")}
        />
      </View>
      <View style={tw`absolute top-7/10 justify-center items-center`}>
        <Pressable
          onPress={beginJourney}
          style={[
            tw` rounded-2xl mb-8 py-2 px-4`,
            {
              outlineColor: "#5d76f5",
              outlineWidth: 4,
              backgroundColor: "#5467c4",
            },
          ]}
        >
          <Text
            style={[
              tw`text-white`,
              {
                fontFamily: "BungeeRegular",
                textAlign: "center",
                fontSize: 14,
              },
            ]}
          >
            Begin Journey
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
