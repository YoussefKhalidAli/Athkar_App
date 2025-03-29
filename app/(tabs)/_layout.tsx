import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#031112",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        drawerStyle: {
          backgroundColor: "#031112",
          width: 250,
        },
        drawerContentStyle: {
          backgroundColor: "#031112",
        },
        drawerLabelStyle: {
          color: "#fff",
        },
        drawerActiveTintColor: "#ff5555",
        drawerInactiveTintColor: "#ddd",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "أذكار الصباح",
        }}
      />
      <Drawer.Screen
        name="night"
        options={{
          title: "أذكار المساء",
        }}
      />
      <Drawer.Screen
        name="nightSurahs"
        options={{
          title: "أوراد الليل",
        }}
      />
      <Drawer.Screen
        name="virtues"
        options={{
          title: "فضائل أيات الحرز",
        }}
      />
      <Drawer.Screen
        name="general"
        options={{
          title: "أدعية عامة",
        }}
      />
      <Drawer.Screen
        name="quiet"
        options={{
          title: "أيات السكينة",
        }}
      />
      <Drawer.Screen
        name="protection"
        options={{
          title: "أيات الوقاية",
        }}
      />
      <Drawer.Screen
        name="healing"
        options={{
          title: "أيات الشفاء",
        }}
      />
      <Drawer.Screen
        name="prayer"
        options={{
          title: "أذكار ما بعد الصلاة",
        }}
      />
      <Drawer.Screen
        name="fortress"
        options={{
          title: "حصن المؤمن",
        }}
      />
    </Drawer>
  );
}
