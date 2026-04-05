import { ArrowLeft, Check, CreditCard, Smartphone } from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const PREDEFINED_AMOUNTS = [5, 10, 15, 20];

export function Topup({ navigation }) {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  const handleSelectAmount = (val) => {
    setAmount(val.toString());
  };

  const isFormValid = amount !== "" && Number(amount) > 0 && phone.length >= 9;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-neutral-50"
    >
      {/* HEADER FIXO */}
      <View className="px-6 py-4 pt-12 flex-row items-center bg-white border-b border-neutral-100 z-10">
        <Button
          variant="ghost"
          className="h-10 w-10 bg-neutral-100 rounded-full mr-4"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#404040" />
        </Button>
        <Text className="text-xl font-bold text-neutral-900">
          Carregar Saldo
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled" //better handler of user interaction and ui
      >
        {/* Step 1 - Choose Amount */}
        <View className="mb-10">
          <View className="flex-row items-center mb-4">
            <View className="h-8 w-8 rounded-full bg-blue-100 items-center justify-center mr-3">
              <Text className="text-blue-600 font-bold text-sm">1</Text>
            </View>
            <Text className="text-lg font-bold text-neutral-900">
              Selecione o valor
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between mb-4">
            {PREDEFINED_AMOUNTS.map((val) => {
              const isSelected = amount === val.toString();
              return (
                <TouchableOpacity
                  key={val}
                  onPress={() => handleSelectAmount(val)}
                  className={`w-[48%] mb-3 h-20 rounded-2xl border-2 items-center justify-center flex-row ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-neutral-200 bg-white"
                  }`}
                >
                  <Text
                    className={`text-2xl font-black ${isSelected ? "text-blue-700" : "text-neutral-600"}`}
                  >
                    {val}€
                  </Text>
                  {isSelected && (
                    <View className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full items-center justify-center">
                      <Check size={14} color="#FFF" strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View>
            <Text className="text-sm font-semibold text-neutral-700 ml-1 mb-2">
              Outro valor (€)
            </Text>
            <Input
              placeholder="Ex: 12,50"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              className={`text-lg font-bold ${amount && !PREDEFINED_AMOUNTS.includes(Number(amount)) ? "border-blue-500" : ""}`}
            />
          </View>
        </View>

        {/* Step 2 - Phone Number + Mbway */}
        <View>
          <View className="flex-row items-center mb-4">
            <View className="h-8 w-8 rounded-full bg-blue-100 items-center justify-center mr-3">
              <Text className="text-blue-600 font-bold text-sm">2</Text>
            </View>
            <Text className="text-lg font-bold text-neutral-900">
              Confirme o telemóvel
            </Text>
          </View>

          <View className="flex-row items-center border border-neutral-200 rounded-xl h-[60px] px-4 bg-white">
            <Smartphone size={24} color="#a3a3a3" />
            <TextInput
              className="flex-1 h-full py-0 ml-3 text-lg font-bold tracking-wider text-neutral-900"
              placeholder="910 000 000"
              placeholderTextColor="#a3a3a3"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <Text className="text-sm font-medium text-neutral-500 mt-2 ml-1">
            Associado à sua conta MBWay.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View className="px-6 py-6 bg-white border-t border-neutral-100">
        <Button
          variant="mbway"
          disabled={!isFormValid}
          className="h-16 w-full flex-row gap-3 shadow-lg shadow-blue-500/25"
          onPress={() => navigation.navigate("Home")}
        >
          <CreditCard size={24} color="#FFF" strokeWidth={2.5} />
          <Text className="text-white text-[18px] font-bold">
            Pagar {amount ? `${amount}€` : ""} com MBWay
          </Text>
        </Button>
        <Text className="text-center text-sm font-bold text-neutral-500 mt-4">
          Confirme o pagamento na sua App do Banco
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
