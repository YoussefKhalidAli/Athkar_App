import React from "react";
import { SafeAreaView } from "react-native";
import RememberanceViewer from "../screens/oneOption"; // Adjust the path based on your project structure
import night from "../../assets/rememberances/night surahs";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RememberanceViewer rememberance={night} option="فضله" />
    </SafeAreaView>
  );
}
