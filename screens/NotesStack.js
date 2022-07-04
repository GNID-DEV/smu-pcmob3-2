import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";

const InnerStack = createStackNavigator();
export default function NotesStack() {
  return (
    <InnerStack.Navigator>
      
      <InnerStack.Screen name="Notes" component={NotesScreen}
        options={{
          title: "PCMOB 3 | NOTE APP",
          
          headerTitleAlign: 'left',
          
          headerStyle: {
            height: 120,
            backgroundColor: "#A63C58",
            shadowColor: "black",
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },

          headerTintColor: "#D9BBB4",
          headerTitleStyle: {
            fontSize: 21,
            fontWeight: "bold",
            
          },
        }}
      />
    </InnerStack.Navigator>
  );
}
