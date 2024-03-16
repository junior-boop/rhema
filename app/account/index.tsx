import { Text } from "@/components/Themed";
import React from "react";
import { StatusBar, View } from "react-native";

export default function User() {
    return (
        <View>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <Text> Ville de Yaounde</Text>
        </View>
    )
}