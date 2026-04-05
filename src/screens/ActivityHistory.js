import { useState } from "react";

import { ArrowLeft, BusFront, CreditCard } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../components/Button";

// Simulation Data (Mock Data)
const MOCK_ACTIVITY = [
  {
    dateLabel: "Hoje",
    transactions: [
      {
        id: "1",
        type: "trip",
        title: "Viagem - Linha 1",
        subtitle: "Universidade",
        time: "08:45",
        amount: "1,20",
      },
      {
        id: "2",
        type: "topup",
        title: "Carregamento",
        subtitle: "MBWay",
        time: "10:15",
        amount: "10,00",
      },
    ],
  },
  {
    dateLabel: "Ontem",
    transactions: [
      {
        id: "3",
        type: "trip",
        title: "Viagem - Linha 4",
        subtitle: "Terminal",
        time: "18:30",
        amount: "1,20",
      },
      {
        id: "4",
        type: "trip",
        title: "Viagem - Linha 4",
        subtitle: "Centro",
        time: "09:00",
        amount: "1,20",
      },
    ],
  },
  {
    dateLabel: "Abril 2026",
    transactions: [
      {
        id: "5",
        type: "topup",
        title: "Carregamento",
        subtitle: "Multibanco",
        time: "14:20",
        amount: "20,00",
      },
      {
        id: "6",
        type: "trip",
        title: "Viagem - Linha 2",
        subtitle: "Hospital",
        time: "10:15",
        amount: "1,20",
      },
      {
        id: "7",
        type: "trip",
        title: "Viagem - Linha 1",
        subtitle: "Universidade",
        time: "08:10",
        amount: "1,20",
      },
    ],
  },
];

// Reusable component but with time instead of date
function ActivityItem({ type, title, subtitle, amount, time }) {
  const isTopup = type === "topup";

  return (
    <View className="flex-row items-center justify-between py-4 border-b border-neutral-100 last:border-0">
      <View className="flex-row items-center gap-4">
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
            {subtitle} • {time}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text
          className={`font-bold text-[16px] ${isTopup ? "text-blue-600" : "text-neutral-900"}`}
        >
          {isTopup ? "+" : "-"}
          {amount}€
        </Text>
      </View>
    </View>
  );
}

export function ActivityHistory() {
  const [filter, setFilter] = useState("all");

  // Filter Logic: Varre todos os grupos e retira o que não interessa
  const filteredData = MOCK_ACTIVITY.map((group) => {
    const filteredTransactions = group.transactions.filter((t) => {
      if (filter === "all") return true;
      if (filter === "trips") return t.type === "trip";
      if (filter === "topups") return t.type === "topup";
      return true;
    });
    return { ...group, transactions: filteredTransactions };
  }).filter((group) => group.transactions.length > 0);

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header and search filters        */}
      <View className="bg-white border-b border-neutral-100 z-10 pt-14 pb-4">
        {/* Ttile and Go Back button */}
        <View className="px-6 flex-row items-center mb-6">
          <Button
            variant="ghost"
            className="h-11 w-11 rounded-full bg-neutral-100 items-center justify-center -ml-2 mr-4"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#171717" />
          </Button>
          <Text
            className="text-xl font-bold text-neutral-900 flex-1"
            numberOfLines={1}
          >
            Histórico de Atividade
          </Text>
        </View>

        {/* Horizontal scroll with filter for small sreens */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            <TouchableOpacity
              onPress={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-full border mr-2 ${
                //mr-2 to prevent collisions
                filter === "all"
                  ? "bg-emerald-500 border-emerald-500"
                  : "bg-white border-neutral-200"
              }`}
            >
              <Text
                className={`text-sm font-bold ${filter === "all" ? "text-white" : "text-neutral-500"}`}
              >
                Todas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter("trips")}
              className={`px-5 py-2.5 rounded-full border mr-2 ${
                filter === "trips"
                  ? "bg-emerald-500 border-emerald-500"
                  : "bg-white border-neutral-200"
              }`}
            >
              <Text
                className={`text-sm font-bold ${filter === "trips" ? "text-white" : "text-neutral-500"}`}
              >
                Viagens
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter("topups")}
              className={`px-5 py-2.5 rounded-full border ${
                filter === "topups"
                  ? "bg-emerald-500 border-emerald-500"
                  : "bg-white border-neutral-200"
              }`}
            >
              <Text
                className={`text-sm font-bold ${filter === "topups" ? "text-white" : "text-neutral-500"}`}
              >
                Carregamentos
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Activity List (Vertical Scroll) */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((group) => (
            <View key={group.dateLabel} className="mb-8">
              <Text className="text-sm font-bold text-neutral-400 uppercase tracking-wider pl-2 mb-3">
                {group.dateLabel}
              </Text>

              <View className="bg-white rounded-3xl p-2 px-4 shadow-sm border border-neutral-100">
                {group.transactions.map((transaction) => (
                  <ActivityItem
                    key={transaction.id}
                    type={transaction.type}
                    title={transaction.title}
                    subtitle={transaction.subtitle}
                    amount={transaction.amount}
                    time={transaction.time}
                  />
                ))}
              </View>
            </View>
          ))
        ) : (
          /* Empty State */
          <View className="py-12 items-center justify-center">
            <Text className="text-center text-neutral-500 font-medium text-[16px]">
              Não há atividades para mostrar com este filtro.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
