import React from "react";
import { View, Text, Pressable, ImageBackground } from "react-native";
import tw from "twrnc";
import { useState } from "react";
import type { AuthStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FrameSprite } from "../components/FrameSprite";

type ChooseAzimScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ChooseAzim"
>;

type Props = {
  navigation: ChooseAzimScreenNavigationProp;
};
export default function ChooseAzimScreen({ navigation }: Props) {
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
          <FrameSprite frame="Ambition1-frame0"></FrameSprite>
        </Pressable>
        <Text
          style={[tw`text-sm font-bold mb-5`, { fontFamily: "BungeeRegular" }]}
        >
          Azim
        </Text>
        {hireSelected && (
          <View style={tw`flex items-center justify-center gap-4`}>
            <View
              style={[
                tw`rounded-md bg-[#18191a] p-4 w-320px`,
                {
                  outlineColor: "#41464f",
                  outlineWidth: 4,
                },
              ]}
            >
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
