import {
  ArrowDownToLine,
  BusFront,
  ChevronRight,
  CreditCard,
  QrCode,
  UserCircle,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../components/Button";

function TransactionItem({ type, title, subtitle, amount, date }) {
  const isTopup = type === "topup";
  return (
    <View className="flex-row items-center justify-between py-4 border-b border-neutral-100 last:border-0">
      <View className="flex-row items-center gap-4 flex-shrink mr-4">
        <View
          className={`h-12 w-12 rounded-full items-center justify-center ${isTopup ? "bg-blue-100" : "bg-emerald-100"}`}
        >
          {isTopup ? (
            <CreditCard size={20} color="#2563eb" />
          ) : (
            <BusFront size={20} color="#059669" />
          )}
        </View>
        <View>
          <Text className="font-bold text-[16px] text-neutral-900">
            {title}
          </Text>
          <Text className="text-sm font-medium text-neutral-500">
            {subtitle} • {date}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text
          className={`font-bold text-[16px] ${isTopup ? "text-blue-600" : "text-neutral-900"}`}
        >
          {isTopup ? "+" : "-"}
          {amount}
        </Text>
      </View>
    </View>
  );
}

export function Home({ navigation }) {
  return (
    <View className="flex-1 bg-neutral-50 pt-12">
      {/* Header */}
      <View className="px-6 pb-4 flex-row justify-between items-center bg-white z-10">
        <View>
          <Text className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            Carteira Digital
          </Text>
          <Text className="text-2xl font-bold text-neutral-900">Olá, João</Text>
        </View>
        <Button
          variant="ghost"
          className="h-12 w-12 rounded-full bg-neutral-100"
        >
          <UserCircle size={28} color="#404040" />
        </Button>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-6 py-6 space-y-6">
          {/* Balance */}
          <View className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 mb-6">
            <Text className="text-[16px] font-semibold text-neutral-600 mb-1">
              Saldo Disponível
            </Text>
            <View className="flex-row items-end gap-2 mb-8">
              <Text className="text-5xl font-black tracking-tight text-neutral-900">
                12,50
              </Text>
              <Text className="text-2xl font-bold text-neutral-500 mb-1">
                €
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row">
              <Button
                variant="mbway"
                className="flex-1"
                onPress={() => navigation.navigate("TopUp")}
              >
                <View className="items-center">
                  <ArrowDownToLine size={20} color="#FFF" />
                  <Text className="text-white text-[13px] font-bold tracking-wide mt-1">
                    CARREGAR
                  </Text>
                </View>
              </Button>

              {/* Spacing View */}
              <View className="w-3" />

              <Button
                variant="primary"
                className="flex-[2] shadow-lg shadow-emerald-500/25"
                onPress={() => navigation.navigate("Scanner")}
              >
                <View className="flex-row items-center gap-3">
                  <QrCode size={28} color="#FFF" />
                  <Text className="text-white text-[18px] font-bold tracking-wide">
                    LER QR CODE
                  </Text>
                </View>
              </Button>
            </View>
          </View>

          {/* Recent Activity */}
          <View className="pt-2">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-neutral-900">
                Atividade Recente
              </Text>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => navigation.navigate("ActivityHistory")}
              >
                <Text className="text-emerald-600 text-sm font-bold">
                  Ver tudo
                </Text>
                <ChevronRight size={16} color="#059669" />
              </TouchableOpacity>
            </View>

            <View className="bg-white rounded-3xl py-2 px-4 shadow-sm border border-neutral-100">
              <TransactionItem
                type="trip"
                title="Viagem - Linha 1"
                subtitle="Universidade"
                amount="1,20€"
                date="Hoje, 08:45"
              />
              <TransactionItem
                type="trip"
                title="Viagem - Linha 4"
                subtitle="Terminal"
                amount="1,20€"
                date="Ontem, 18:30"
              />
              <TransactionItem
                type="topup"
                title="Carregamento"
                subtitle="MBWay"
                amount="10,00€"
                date="28 Mar, 10:15"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
