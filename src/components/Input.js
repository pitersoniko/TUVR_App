import { TextInput } from "react-native";
import { useColorScheme } from "nativewind";

//Receives properties (...props) so it can pass it as their correspondent value ('placeholder', scureTextEntry', etc)
export function Input({ className, ...props }) {
  const { colorScheme } = useColorScheme();

  return (
    <TextInput
      //Colors and roundings based on the original Figma Design
      className={`border border-neutral-200 dark:border-neutral-700 rounded-xl h-14 px-4 bg-white dark:bg-neutral-800 text-[16px] text-neutral-900 dark:text-white ${className}`}
      //The placeholder color has to be defined here (bc it's mobile)
      placeholderTextColor={colorScheme === "dark" ? "#737373" : "#a3a3a3"}
      //Turn of autocorrect for email and password filling
      autoCorrect={false}
      autoCapitalize="none"
      {...props}
    />
  );
}
