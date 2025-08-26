import React from "react";
import { View, Text, Pressable, ImageBackground } from "react-native";
import tw from "twrnc";
import { pathMapLayers } from "../../sprite_paths/pathMapLayers";
import { PathLayerToSVGPrim } from "../helpers/SVGPrims";
import Svg from "react-native-svg";
import { useState } from "react";
import type { AuthStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Onboarding"
>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};
export default function OnboardingScreen({ navigation }: Props) {
  const pathLayers = pathMapLayers["Ambition1-frame0"];
  const [hireSelected, setHireSelected] = useState(false);
  const azimSelected = () => setHireSelected(true);
  const chooseAzim = () => {
    navigation.navigate("CreateUser");
  };
  return (
    <ImageBackground
      source={hireSelected ? require("../../assets/home_bg.jpg") : null}
      style={tw`flex-1 justify-center items-center`}
    >
      <View style={tw`absolute top-1/5 justify-center items-center`}>
        <Text style={[tw`text-4xl font-bold`, { fontFamily: "BungeeRegular" }]}>
          Choose a Hire
        </Text>
        <Pressable
          style={tw`w-45 h-45 justify-center items-center`}
          onPress={azimSelected}
        >
          <Svg
            width="100%" // fill the Pressable
            height="100%"
            viewBox="0 0 200 200" // scale paths to fit
          >
            {pathLayers.map((layer, index) => (
              <PathLayerToSVGPrim key={index} {...layer} />
            ))}
          </Svg>
        </Pressable>
        <Text
          style={[tw`text-sm font-bold mb-5`, { fontFamily: "BungeeRegular" }]}
        >
          Azim
        </Text>
        {hireSelected && (
          <View style={tw`flex items-center justify-center gap-4`}>
            <View style={tw`rounded-md bg-[#18191a] p-4 w-320px`}>
              <Text
                style={[
                  tw`text-xs text-white`,
                  {
                    fontFamily: "SairaSemiBold",
                    textAlign: "center",
                    whiteSpace: "normal",
                  },
                ]}
              >
                Azim (Ambition) is a GREAT-HIRE type and would be an excellent
                fit for the Software Engineer role at Voidpet Dungeon.
              </Text>
            </View>
            <Pressable
              onPress={chooseAzim}
              style={[
                tw` rounded-full mb-8 py-2 px-4`,
                {
                  outlineColor: "#6ad9f7",
                  outlineWidth: 4,
                  backgroundColor: "#67bed6",
                },
              ]}
            >
              <Text
                style={[
                  tw`text-white text-xl`,
                  {
                    fontFamily: "BungeeRegular",
                    textAlign: "center",
                  },
                ]}
              >
                I choose Azim
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
