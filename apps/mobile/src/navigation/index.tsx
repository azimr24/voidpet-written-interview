import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import SignupScreen from "../screens/SignupScreen";
import Onboarding2Screen from "../screens/PurposeScreen";
import { useAuth } from "../store/useAuth";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { user, onboardingComplete } = useAuth();

  return (
    <NavigationContainer>
      {user && onboardingComplete ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
