import { TouchableOpacity } from "react-native";

export function Button({
  children,
  onPress,
  className,
  variant = "primary",
  disabled,
  ...props
}) {
  let variantStyles = "";

  if (variant === "primary") {
    variantStyles = "bg-emerald-500 rounded-2xl";
  } else if (variant === "mbway") {
    variantStyles = "bg-[#0074c7] rounded-2xl";
  } else if (variant === "ghost") {
    variantStyles = "bg-transparent";
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center justify-center ${variantStyles} ${disabled ? "opacity-50" : ""} ${className}`}
      activeOpacity={0.8}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
