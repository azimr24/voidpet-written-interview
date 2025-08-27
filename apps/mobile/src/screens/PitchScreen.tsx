import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Text,
  Pressable,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Story } from "inkjs";
import tw from "twrnc";
import LottieView from "lottie-react-native";
import { TapAnywhere } from "../components/TapAnywhere";
import voidpet_pitch from "../../assets/story/voidpet-ink.json";
import { useAuth } from "../store/useAuth";

export default function PitchScreen() {
  const story = useMemo(() => new Story(voidpet_pitch as any), []);
  const [line, setLine] = useState<string>("");
  const [choices, setChoices] = useState<{ index: number; text: string }[]>([]);

  const [displayed, setDisplayed] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const { setOnboardingComplete } = useAuth();
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const TYPE_MS = 18;

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -2,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);

  const gather = () => {
    let text = "";
    while (story.canContinue) {
      text += story.Continue();
      if (story.canContinue) {
        text += "\n";
      }
    }
    const newChoices = story.currentChoices.map((c, i) => ({
      index: i,
      text: c.text,
    }));
    return { text, newChoices };
  };

  // Typewriter driver
  const startTypewriter = (fullText: string) => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    setDisplayed("");
    setIsTyping(true);

    let i = 0;
    typeIntervalRef.current = setInterval(() => {
      i += 1;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        setIsTyping(false);
      }
    }, TYPE_MS);
  };

  // When the raw line changes, restart typing it
  useEffect(() => {
    startTypewriter(line);
    // cleanup
    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, [line]);

  // story advancement
  const advance = async (choiceIndex?: number) => {
    // complete typewriter if not finished rather than advance
    if (isTyping) {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
      setDisplayed(line);
      setIsTyping(false);
      return;
    }

    // Fade out
    await new Promise<void>((resolve) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => resolve());
    });

    if (choiceIndex !== undefined) {
      story.ChooseChoiceIndex(choiceIndex);
    }

    const { text, newChoices } = gather();
    if (text === "") {
      setOnboardingComplete(true);
    }
    setLine(text);
    setChoices(newChoices);

    // Fade back in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Tap anywhere
  const onTapAnywhere = () => {
    if (isTyping) {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
      setDisplayed(line);
      setIsTyping(false);
      return;
    }
    if (choices.length > 0) {
      advance(0);
    } else {
      // don't think I need this, will come back
      advance();
    }
  };

  // start story
  useEffect(() => {
    const { text, newChoices } = gather();
    setLine(text);
    setChoices(newChoices);
  }, []);

  return (
    <Pressable style={tw`flex-1`} onPress={onTapAnywhere}>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1 justify-center items-center`}
        source={require("../../assets/home_bg.jpg")}
      >
        <LinearGradient
          colors={["rgba(27,42,89, 1.0)", "transparent"]}
          style={tw`absolute inset-0`}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <LottieView
          style={tw`absolute inset-0`}
          source={require("../../assets/lottie/snow.lottie")}
          autoPlay
          loop
        ></LottieView>
        {/* card with fade transition */}
        <Animated.View
          style={[
            tw`absolute top-1/6 rounded-md bg-[#18191a] px-4 py-8 w-[350px]`,
            {
              outlineColor: "#41464f",
              outlineWidth: 4,
              opacity: fadeAnim,
            },
          ]}
        >
          {/* typewriter text */}
          <Text
            style={{
              fontSize: 14,
              fontFamily: "SairaSemiBold",
              color: "white",
              lineHeight: 22,
            }}
          >
            {displayed}
          </Text>
        </Animated.View>

        {/* bouncing hint */}
        <TapAnywhere></TapAnywhere>
      </ImageBackground>
    </Pressable>
  );
}
