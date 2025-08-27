import { View, Text, Pressable } from "react-native";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../store/useAuth";
import tw from "twrnc";
import { FrameSprite } from "../components/FrameSprite";
export default function HomeScreen() {
  const { clearToken, clearUser, clearOnboardingComplete } = useAuth();
  const wipeSession = async () => {
    clearToken();
    clearUser();
    clearOnboardingComplete();

    await AsyncStorage.removeItem("auth");

    Alert.alert("Signed out", "No Voidpet Dungeon Accout Found.");
  };
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={[tw`text-4xl font-bold`, { fontFamily: "BungeeRegular" }]}>
        Choose
      </Text>
      <View style={tw`w-45 h-45 justify-center items-center`}>
        <FrameSprite frame="Ambition1-frame0"></FrameSprite>
      </View>
      <Text
        style={[tw`text-sm font-bold mb-5`, { fontFamily: "BungeeRegular" }]}
      >
        Azim
      </Text>
      <Text style={[tw`text-4xl font-bold`, { fontFamily: "BungeeRegular" }]}>
        Or You'll Be
      </Text>
      <View style={tw`w-35 h-35 justify-center items-center`}>
        <FrameSprite frame="Sad1-frame0"></FrameSprite>
      </View>
      <Text
        style={[tw`text-sm font-bold mb-5`, { fontFamily: "BungeeRegular" }]}
      >
        Sad
      </Text>
      <Pressable
        style={[
          tw` rounded-2xl mb-8 py-2 px-4`,
          {
            outlineColor: "#5d76f5",
            outlineWidth: 4,
            backgroundColor: "#5467c4",
          },
        ]}
        onPress={wipeSession}
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
          Restart Journey
        </Text>
      </Pressable>
    </View>
  );
}
