import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// Na versão de telemóvel, trocamos CheckCircle2 por CheckCircle para maior compatibilidade com todas as versões do Lucide
import {
    ArrowLeft,
    BusFront,
    CheckCircle,
    Clock,
    ShieldCheck,
} from "lucide-react-native";

export function ActiveTicket({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutos em segundos

  // ==========================================
  // O RELÓGIO ANTI-FRAUDE (Corre a cada segundo)
  // ==========================================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // NOVIDADE 1: Formatação à prova de bala para iOS e Android
  // Construímos a hora e os minutos à mão para garantir que não há bugs de idioma
  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month.toString().padStart(2, "0")}/${year}`;
  };

  return (
    // Green Vibrant BG
    <View className="flex-1 bg-emerald-500">
      {/* HEADER: Superior Controls */}
      <View className="px-6 py-6 pt-14 flex-row justify-between items-center z-10">
        <TouchableOpacity
          className="h-12 w-12 rounded-full bg-black/20 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={28} color="#FFF" />
        </TouchableOpacity>

        <View className="flex-row items-center bg-black/20 px-4 py-2 rounded-full">
          <ShieldCheck size={18} color="#d1fae5" />
          <Text className="text-white text-sm font-bold tracking-wide uppercase ml-2">
            Bilhete Seguro
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center px-6 mt-4">
        {/* Success Icon */}
        <View className="bg-white rounded-full p-2 shadow-xl mb-6">
          <CheckCircle size={80} color="#10b981" strokeWidth={2.5} />
        </View>

        {/* Validation Text */}
        <Text className="text-white text-5xl font-black tracking-tight text-center leading-[56px] mb-8">
          VIAGEM{"\n"}VÁLIDA
        </Text>

        {/* Dynamic Clock */}
        <View className="bg-white/20 border-2 border-white/40 rounded-3xl p-6 w-full max-w-[320px] items-center mb-6">
          <Text className="text-emerald-50 text-sm font-bold uppercase tracking-widest mb-1">
            Hora Atual
          </Text>
          {/* Text updates every second */}
          <Text className="text-white text-6xl font-black tracking-tighter">
            {formatTime(currentTime)}
          </Text>
        </View>

        {/* White Card (Trip information) */}
        <View className="bg-white rounded-3xl p-6 w-full max-w-[320px] shadow-2xl">
          {/* Route */}
          <View className="flex-row items-center border-b border-neutral-100 pb-4 mb-4">
            <View className="h-14 w-14 rounded-2xl bg-emerald-100 items-center justify-center mr-4">
              <BusFront size={28} color="#059669" />
            </View>
            <View>
              <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                Rota
              </Text>
              <Text className="text-[20px] font-black text-neutral-900 leading-tight">
                Linha 1
              </Text>
              <Text className="text-[16px] font-semibold text-neutral-500 leading-tight">
                Universidade
              </Text>
            </View>
          </View>

          {/* Data e ID */}
          <View className="flex-row justify-between items-center border-b border-neutral-100 pb-4 mb-4">
            <View>
              <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                Data
              </Text>
              <Text className="text-[16px] font-bold text-neutral-700">
                {formatDate(currentTime)}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                ID do Bilhete
              </Text>
              <Text className="text-[16px] font-bold text-neutral-700 tracking-wider">
                VR-7492-X
              </Text>
            </View>
          </View>

          {/* Expiration */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Clock size={20} color="#f97316" strokeWidth={2.5} />
              <Text className="font-bold text-lg text-orange-500 ml-2">
                Expira em
              </Text>
            </View>
            <Text className="text-2xl font-black text-orange-500">
              {formatTimer(timeLeft)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
