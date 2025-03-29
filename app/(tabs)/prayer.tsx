import React from "react";
import { SafeAreaView } from "react-native";
import RememberanceViewer from "../screens/threeOptions"; // Adjust the path based on your project structure
import prayer from "../../assets/rememberances/after prayer";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RememberanceViewer rememberances={prayer} />
    </SafeAreaView>
  );
}
