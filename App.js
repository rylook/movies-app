import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PopularMovies from "./screens/PopularMovies";
import Movie from "./screens/Movie";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PopularMovies}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Movie" component={Movie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
