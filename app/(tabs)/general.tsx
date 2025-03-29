import React from "react";
import { SafeAreaView } from "react-native";
import RememberanceViewer from "../screens/twoOptions"; // Adjust the path based on your project structure
import general from "../../assets/rememberances/general";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RememberanceViewer rememberances={general} />
    </SafeAreaView>
  );
}
