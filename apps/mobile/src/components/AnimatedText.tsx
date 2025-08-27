import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Animated, Easing, View } from "react-native";
import tw from "twrnc";
import type { AuthStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PurposeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Purpose"
>;

export type AnimatedTextHandle = {
  next: () => void;
  reset?: () => void;
};

type Props = {
  sentences?: string[];
  duration?: number;
  slide?: number;
  navigation?: PurposeScreenNavigationProp;
};

const AnimatedText = forwardRef<AnimatedTextHandle, Props>(
  function AnimatedText(
    {
      sentences = [
        "Welcome to my Dungeon.",
        "May this attempt at going above and beyond prevail :)",
        "I'm using this app to answer Part 1 Question 4 of the written interview.",
        '"Why are you excited to work for Voidpet?"',
      ],
      duration = 350,
      slide = 0,
      navigation,
    },
    ref,
  ) {
    const [idx, setIdx] = useState(0);
    const [active, setActive] = useState<0 | 1>(0);

    const [slotA, setSlotA] = useState(sentences[0] ?? "");
    const [slotB, setSlotB] = useState("");

    const opA = useRef(new Animated.Value(1)).current;
    const opB = useRef(new Animated.Value(0)).current;
    const yA = useRef(new Animated.Value(0)).current;
    const yB = useRef(new Animated.Value(slide)).current;

    const ops = [opA, opB] as const;
    const ys = [yA, yB] as const;
    const setters = [setSlotA, setSlotB] as const;
    const busy = useRef(false);

    // switch to next slot
    const crossfadeTo = (nextIndex: number) => {
      if (nextIndex == sentences.length && navigation) {
        navigation.navigate("Pitch");
      }
      const from = active as 0 | 1;
      const to = (1 - active) as 0 | 1;

      setters[to](sentences[nextIndex]);
      ops[to].setValue(0);
      ys[to].setValue(slide);

      Animated.parallel([
        Animated.timing(ops[from], {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ys[from], {
          toValue: -slide / 1.5,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ops[to], {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ys[to], {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (!finished) {
          busy.current = false;
          return;
        }
        setIdx(nextIndex);
        setActive(to);
        ops[from].setValue(0);
        ys[from].setValue(0);
        busy.current = false;
      });
    };

    const goNext = () => {
      if (busy.current || sentences.length < 2) return;
      busy.current = true;
      const next = idx + 1;
      crossfadeTo(next);
    };

    useImperativeHandle(
      ref,
      () => ({
        next: goNext,
        reset: () => {
          setIdx(0);
          setActive(0);
          setSlotA(sentences[0] ?? "");
          setSlotB("");
          opA.setValue(1);
          yA.setValue(0);
          opB.setValue(0);
          yB.setValue(slide);
        },
      }),
      [goNext, sentences, slide],
    );

    return (
      <View
        style={[
          tw`rounded-md bg-[#18191a] px-4 py-8 w-320px items-center justify-center`,
          {
            outlineColor: "#41464f",
            outlineWidth: 4,
          },
        ]}
        pointerEvents="none"
      >
        {/* Slot A */}
        <Animated.Text
          adjustsFontSizeToFit
          style={[
            tw`text-base text-white`,
            {
              fontFamily: "SairaSemiBold",
              textAlign: "center",
              whiteSpace: "normal",
              position: "absolute",
            },
            {
              opacity: opA,
              transform: [{ translateY: yA }],
              zIndex: active === 0 ? 2 : 1, // visible slot stays on top
            },
          ]}
        >
          {slotA}
        </Animated.Text>

        {/* Slot B */}
        <Animated.Text
          adjustsFontSizeToFit
          style={[
            tw`text-base text-white`,
            {
              fontFamily: "SairaSemiBold",
              textAlign: "center",
              whiteSpace: "normal",
              position: "absolute",
            },

            {
              opacity: opB,
              transform: [{ translateY: yB }],
              zIndex: active === 1 ? 2 : 1,
            },
          ]}
        >
          {slotB}
        </Animated.Text>
      </View>
    );
  },
);

export default AnimatedText;
