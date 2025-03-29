import React from "react";
import { SafeAreaView } from "react-native";
import RememberanceViewer from "../screens/noOptions"; // Adjust the path based on your project structure
import protection from "../../assets/rememberances/protection";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RememberanceViewer rememberances={protection} />
    </SafeAreaView>
  );
}
