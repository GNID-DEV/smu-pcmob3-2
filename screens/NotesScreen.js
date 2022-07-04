import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log(`Error: ${error}`)
      );
    });
  }

  // Set up and connect to database
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          done INT)
        `
        );
      },
      null,
      refreshNotes
    );
  }, []);

  // New Task iCon (header top right button)
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="add-circle"
            size={30}
            // Got issue when park fontSize under styles 
            style={{
              color: "#F2C6AC",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and update items to the database
  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
  }

  // This deletes an individual note
  function deleteNote(id) {
    console.log("Deleting " + id);
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
      },
      null,
      refreshNotes
    );
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          paddingLeft: 30,
          paddingRight: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#8C8274",
          borderBottomWidth: 0.3,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18 }}

        >{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons 
            name="backspace"          
            style={{
              fontSize: 24,
              color: "#A63C58",   
              marginRight: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9C7B8",
    alignItems: "center",
    justifyContent: "center",
  },
});
