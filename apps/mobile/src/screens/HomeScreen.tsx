import { View, Text } from "react-native";
import { Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../store/useAuth";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Wipe local session"
        onPress={async () => {
          await AsyncStorage.removeItem("auth");
          useAuth.persist?.clearStorage?.();
          useAuth.persist?.rehydrate();
          Alert.alert("Done", "Local session wiped. Restart the app.");
        }}
      />
    </View>
  );
}
