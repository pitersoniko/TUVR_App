import { Flashlight, FlashlightOff, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export function Scanner({ navigation }) {
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 240,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [isScanning, scanLineAnim]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
      console.log("Scan concluído!");
      navigation.navigate("ActiveTicket");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
      }}
      className="flex-1 bg-black"
    >
      <View className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <View className="px-6 pt-14 pb-6 flex-row justify-between items-center z-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="h-12 w-12 rounded-full bg-white/20 items-center justify-center border border-white/10"
        >
          <X size={28} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFlashlightOn(!flashlightOn)}
          className={`h-12 w-12 rounded-full items-center justify-center border transition-all ${
            flashlightOn
              ? "bg-white border-white"
              : "bg-white/20 border-white/10"
          }`}
        >
          {flashlightOn ? (
            <Flashlight size={24} color="#000" />
          ) : (
            <FlashlightOff size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Central Area */}
      <View className="flex-1 items-center justify-center z-10 -mt-20">
        <Text className="text-white text-center font-bold text-lg mb-8 px-6 tracking-wide max-w-[280px]">
          Aponte a câmara para o código no autocarro
        </Text>

        <View className="relative w-64 h-64 border-2 border-white/20 rounded-3xl overflow-hidden">
          <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-3xl" />
          <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-3xl" />
          <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-3xl" />
          <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-3xl" />

          {isScanning && (
            <Animated.View
              style={{ transform: [{ translateY: scanLineAnim }] }}
              className="absolute left-0 right-0 h-1 bg-emerald-400 opacity-80"
            />
          )}

          <TouchableOpacity
            className="absolute inset-0 w-full h-full"
            onPress={() => console.log("Scan Forçado Manualmente!")}
          />
        </View>

        <Text className="text-white/60 text-sm font-bold mt-10 tracking-widest uppercase">
          {isScanning ? "A validar bilhete..." : "Bilhete Encontrado!"}
        </Text>
      </View>
    </ImageBackground>
  );
}
