import "react-native-reanimated";
import Navigation from "./src/navigation";
import { useFonts } from "expo-font";
import { initBackgroundMusic, playMusic } from "./src/audio/backgroundMusic";
import { useEffect } from "react";
import SplashScreen from "./src/screens/SplashScreen";
export default function App() {
  const [fontsLoaded] = useFonts({
    BungeeRegular: require("./assets/fonts/Bungee_400Regular.ttf"),
    SairaSemiBold: require("./assets/fonts/Saira_600SemiBold.ttf"),
  });
  useEffect(() => {
    (async () => {
      try {
        await initBackgroundMusic();
        await playMusic();
      } catch (e) {
        console.warn("music init failed", e);
      }
    })();
  }, []);

  if (!fontsLoaded) return SplashScreen();
  return <Navigation />;
}
