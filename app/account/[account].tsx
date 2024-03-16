import { Text } from "@/components/Themed";
import React from "react";
import { StatusBar, View } from "react-native";


export default function Account() {
    return (
        <View>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <Text>je suis dans la place</Text>
        </View>
    )
}