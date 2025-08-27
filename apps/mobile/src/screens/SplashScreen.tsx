import { View, Image } from "react-native";
import tw from "twrnc";

export default function SplashScreen() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-[#4053b3]`}>
      <Image
        style={tw`w-60px h-60px`}
        source={require("../../assets/app_icon_no_bg.png")}
      />
    </View>
  );
}
