import { Text } from "@/components/Themed";
import React from "react";
import { StatusBar, View } from "react-native";

export default function LoginPage() {
    return (
        <View>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <Text>
                login Page
            </Text>
        </View>
    )
}