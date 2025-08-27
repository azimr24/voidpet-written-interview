import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

let sound: Audio.Sound | null = null;

export async function initBackgroundMusic() {
  if (sound) return;
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    playThroughEarpieceAndroid: false,
  });

  const created = await Audio.Sound.createAsync(
    require("../../assets/audio/calmBg.mp3"),
    {
      shouldPlay: false,
      isLooping: true,
      volume: 0.7,
    },
  );
  sound = created.sound;
}

export async function playMusic() {
  if (!sound) await initBackgroundMusic();
  await sound!.playAsync();
}
