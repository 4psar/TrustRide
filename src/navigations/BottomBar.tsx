import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ICON_MAP } from "../constants/iconMap";
import { NavigationMenuItem } from "../constants/navConfig";

interface Props {
  current: string;
  onChange: (path: string) => void;
  navItems: NavigationMenuItem[];
}

export default function BottomBar({ current, onChange, navItems }: Props) {
  return (
    <View style={styles.container}>
      {navItems.map(({ path, label, icon }) => {
        const IconComponent = ICON_MAP[icon];
        const active = current === path;

        return (
          <TouchableOpacity
            key={path}
            onPress={() => onChange(path)}
            style={styles.tab}
          >
            <IconComponent
              size={24}
              color={active ? "#7C1CB0" : "#999"}
              strokeWidth={2}
            />

            <Text
              style={{
                color: active ? "#7C1CB0" : "#999",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  tab: {
    alignItems: "center",
  },
});
