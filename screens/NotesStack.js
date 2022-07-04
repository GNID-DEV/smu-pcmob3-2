import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";

const InnerStack = createStackNavigator();
export default function NotesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          title: "PCMOB 3 | NOTE APP",
          headerTitleAlign: 'left',
          
          headerStyle: {
            
            height: 100,
            backgroundColor: "#36403E",
            shadowColor: "black",
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
          headerTintColor: "#9BB9BF",
          headerTitleStyle: {
            fontSize: 21,
            fontWeight: "bold",
            
          },
        }}
      />
    </InnerStack.Navigator>
  );
}
