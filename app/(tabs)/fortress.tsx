import React from "react";
import { SafeAreaView } from "react-native";
import RememberanceViewer from "../screens/threeOptions"; // Adjust the path based on your project structure
import fortress from "../../assets/rememberances/fortress";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RememberanceViewer rememberances={fortress} />
    </SafeAreaView>
  );
}
