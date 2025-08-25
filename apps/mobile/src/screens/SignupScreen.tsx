import { useAuth } from "../store/useAuth";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  ImageBackground,
  Image,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
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

const { width } = Dimensions.get("window");
export default function SignupScreen({ navigation }: Props) {
  const { token, user, deviceId, starterId, setSession, setDeviceId, clear } =
    useAuth();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const beginJourney = async () => {
    navigation.navigate("Onboarding");
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={tw`flex-1`}
      source={require("../../assets/home_bg.jpg")}
    >
      <LinearGradient
        colors={["rgba(27,42,89, 1.0)", "transparent"]}
        style={tw`absolute inset-0`}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <View
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setSize({ width, height });
        }}
        style={[
          tw`absolute top-1/5 left-1/2 justify-center items-center`,
          {
            transform: [{ translateX: -size.width / 2 }],
          },
        ]}
      >
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
      <View style={tw`top-7/10 justify-center items-center`}>
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
        <View style={tw`flex justify-center items-center`}>
          <Text
            style={[
              tw`text-white mb-4`,
              { fontSize: 10, fontFamily: "BungeeRegular" },
            ]}
          >
            Returning Player?
          </Text>
          <View style={tw`pt-4 border-t border-gray-300`}>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={tw`w-150px h-30px`}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_REQUEST_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
