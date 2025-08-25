import Navigation from "./src/navigation";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    BungeeRegular: require("./assets/fonts/Bungee_400Regular.ttf"),
  });

  if (!fontsLoaded) return null; // or <SplashScreen />
  return <Navigation />;
}
