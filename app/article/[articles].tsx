import { Text } from "@/components/Themed";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from 'expo-file-system'
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import WebView from "react-native-webview";

export default function Articles(){
    const [htmlSource, setHtmlSource] = useState('')
   
    const files = async () => {
        const localhtml = require('../../assets/reader.html')
        const [{localUri, uri}, test] = await Asset.loadAsync(localhtml)
        const fileHtml = await FileSystem.readAsStringAsync(localUri as string)
        setHtmlSource(fileHtml)
    }

    useEffect (() => {
       files()
    }, [])
    return (
        <SafeAreaView style = {{ flex : 1, 
            backgroundColor : 'white'}}>
            <StatusBar barStyle={'dark-content'} backgroundColor={"white"}  />
            <View>
                <Text>ville</Text>
            </View>
            <WebView 
                originWhitelist={["*"]}
                source={{html : htmlSource}}
                scalesPageToFit = {true}
                overScrollMode="content"
            />
        </SafeAreaView>
    )
}