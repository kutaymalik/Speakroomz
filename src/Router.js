import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../src/Pages/Home/HomeScreen";
import LoginScreen from "../src/Pages/LoginScreen";
import RegisterScreen from "../src/Pages/RegisterScreen";
import AddConversationScreen from "../src/Pages/AddConversationScreen"
const Stack = createNativeStackNavigator();
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth } from "./firebase";
import { Provider } from "react-redux";
import store from "./redux/store";
import ChatScreen from "../src/Pages/ChatScreen";
import Loading from "../src/Components/Loading";

const headerOption = {
  headerStyle: { backgroundColor: "#070819" },
  headerTintColor: "white",
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [logIn, setLogIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(true);
        setLogIn(true);
      } else {
        setLoading(true);
        setLogIn(false);
      }
    });
    return unsubscribe;
  }, []);

  if (!loading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            {logIn ? (
              <Stack.Group
                screenOptions={headerOption}
                initialRouteName="HomeScreen"
              >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen
                  name="AddConversationScreen"
                  component={AddConversationScreen}
                />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
              </Stack.Group>
            ) : (
              <Stack.Group initialRouteName="RegisterScreen">
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}