import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ActiveTicket } from "./src/screens/ActiveTicket";
import { ActivityHistory } from "./src/screens/ActivityHistory";
import { Auth } from "./src/screens/Auth";
import { Home } from "./src/screens/Home";
import { Scanner } from "./src/screens/Scanner";
import { Topup } from "./src/screens/TopUp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TopUp" component={Topup} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="ActiveTicket" component={ActiveTicket} />
        <Stack.Screen name="ActivityHistory" component={ActivityHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
