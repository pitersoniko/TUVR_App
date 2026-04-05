import { useState } from "react";
import { useColorScheme } from "nativewind";

import { Apple, Bus, Eye, EyeOff, Moon, Sun } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Auth({ navigation }) {
  // Screen State (memory)
  const [showPassword, setShowPassword] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Called when Login is pressed
  const handleLogin = () => {
    // Testing Purposes
    console.log("Logged in");
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-neutral-900"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 px-6 pt-16 pb-8 relative">
        {/* Header / Icon */}
        <View className="items-center justify-center pt-8 pb-12">
          <View className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full items-center justify-center mb-6">
            <Bus size={40} color={colorScheme === "dark" ? "#34d399" : "#059669"} strokeWidth={2.5} />
          </View>
          <Text className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
            VILA REAL
          </Text>
          <Text className="text-[16px] text-neutral-500 dark:text-neutral-400 font-medium">
            Mobilidade Urbana Inteligente
          </Text>
        </View>

        {/* Login Form */}
        <View className="flex-1 w-full max-w-sm self-center">
          {/* Field: Email */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 ml-1 mb-2">
              Endereço de Email
            </Text>
            <Input
              placeholder="nome@exemplo.com"
              keyboardType="email-address"
            />
          </View>

          {/* Field: Password */}
          <View className="mb-6 relative">
            <View className="flex-row justify-between items-center mb-2 ml-1">
              <Text className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Palavra-passe
              </Text>
              <TouchableOpacity>
                <Text className="text-sm font-bold text-emerald-600 dark:text-emerald-500">
                  Esqueci-me
                </Text>
              </TouchableOpacity>
            </View>

            <View className="relative justify-center ">
              <Input
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                className="pr-12"
              />
              <TouchableOpacity
                className="absolute right-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={24} color={colorScheme === "dark" ? "#737373" : "#a3a3a3"} />
                ) : (
                  <Eye size={24} color={colorScheme === "dark" ? "#737373" : "#a3a3a3"} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button*/}
          <Button
            variant="primary"
            className="h-14 w-full"
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-[18px]">Entrar</Text>
          </Button>

          {/* 'or' Visual Separator */}
          <View className="flex-row items-center py-6">
            <View className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
            <Text className="mx-4 text-sm font-medium text-neutral-400 dark:text-neutral-500">
              ou
            </Text>
            <View className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
          </View>

          {/* Social Media Buttons */}
          <View className="pb-8">
            <TouchableOpacity className="h-14 w-full mb-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex-row items-center justify-center relative">
              <View className="absolute left-6">
                <Apple size={24} color={colorScheme === "dark" ? "#FFF" : "#000"} />
              </View>
              <Text className="text-[16px] font-bold text-neutral-900 dark:text-white">
                Continuar com Apple
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="h-14 w-full rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex-row items-center justify-center relative">
              <View className="absolute left-6 items-center justify-center">
                <Text className="text-xl font-black text-blue-500">G</Text>
              </View>
              <Text className="text-[16px] font-bold text-neutral-900 dark:text-white">
                Continuar com Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Create Account */}
          <View className="flex-row justify-center pb-6">
            <Text className="text-neutral-600 dark:text-neutral-400 font-medium">
              Não tens uma conta?{" "}
            </Text>
            <TouchableOpacity>
              <Text className="text-emerald-600 dark:text-emerald-500 font-bold">Criar Conta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Theme Button (Top Right Corner) */}
        <View className="absolute top-16 right-6 z-10">
          <Button
            variant="ghost"
            onPress={toggleColorScheme}
            className="h-12 w-12 rounded-full bg-neutral-100 dark:bg-neutral-800"
          >
            {colorScheme === "light" ? (
              <Moon size={24} color="#404040" />
            ) : (
              <Sun size={24} color="#FFF" />
            )}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
