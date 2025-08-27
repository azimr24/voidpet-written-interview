import { View, Text, TextInput, Pressable } from "react-native";
import tw from "twrnc";
import { useEffect, useRef, useState } from "react";
import type { AuthStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../store/useAuth";
type CreateUserScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "CreateUser"
>;

type Props = {
  navigation: CreateUserScreenNavigationProp;
};

export default function CreateUserScreen({ navigation }: Props) {
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState<string>("");
  const { setToken, setUser } = useAuth();
  const handleSetUsername = async () => {
    const response = await fetch("http://localhost:4000/users/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName: text }),
    });
    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    navigation.navigate("Purpose");
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <View style={tw`flex-1 justify-center items-center bg-[#4053b3]`}>
      <View style={tw`absolute top-1/3 gap-10`}>
        <Text
          style={[
            tw`text-white text-4xl`,
            { fontFamily: "BungeeRegular", textAlign: "center", fontSize: 40 },
          ]}
        >
          Pick Username
        </Text>
        <TextInput
          value={text}
          onChangeText={setText}
          ref={inputRef}
          placeholder="Username"
          maxLength={100}
          style={[
            tw`text-black w-358px rounded-full text-sm py-2 px-4 bg-white`,
            { fontFamily: "SairaSemiBold", textAlign: "left" },
          ]}
        />
      </View>
      {text.length > 2 && (
        <Pressable
          onPress={handleSetUsername}
          style={[
            tw`text-black w-350px rounded-full text-sm py-1 px-4 bg-white`,
            {
              outlineColor: "#c95d1a",
              outlineWidth: 4,
              backgroundColor: "#ab480a",
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
            Set Username
          </Text>
        </Pressable>
      )}
    </View>
  );
}
