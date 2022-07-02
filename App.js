import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

function NotesScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote} style={styles.headerIcon}>
          <Entypo name="circle-with-plus" size={24} color="#BF8D7A" />
        </TouchableOpacity>
      ),
    });
  });

  function addNote() {
    console.log("Add Note");
  }

  return <View style={styles.container}></View>;
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            headerTitle: "NOTES APP",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
              color: "#BF8D7A",
            },
            headerStyle: {
              height: 120,
              backgroundColor: "#36403E",
              borderBottomColor: "#A66A5D",
              borderBottomWidth: 1,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BF8D7A",
    alignItems: "center",
    justifyContent: "center",
  },

  headerIcon: {
    marginRight: 30,
    
  }

});
