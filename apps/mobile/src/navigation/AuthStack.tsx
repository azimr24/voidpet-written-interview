import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "./types";
import SignupScreen from "../screens/SignupScreen";
import ChooseAzimScreen from "../screens/ChooseAzimScreen";
import CreateUserScreen from "../screens/CreateUserScreen";
import PurposeScreen from "../screens/PurposeScreen";
import PitchScreen from "../screens/PitchScreen";
const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ChooseAzim" component={ChooseAzimScreen} />
      <Stack.Screen name="CreateUser" component={CreateUserScreen} />
      <Stack.Screen name="Purpose" component={PurposeScreen} />
      <Stack.Screen name="Pitch" component={PitchScreen} />
    </Stack.Navigator>
  );
}
