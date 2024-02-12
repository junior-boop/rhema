import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';


export default function TabOneScreen() {
    const script = `
        const data = document.querySelector("#data")
        const output = document.querySelector("#output") 
        document.body.style.fontSize = 120%;

        setInterval(() => {
            window.ReactNativeWebView.postMessage(output.innerText);
        }, 1000)
        true;
    `
  return (
    <>
        <Stack
            screenOptions={{
                title : '',
                headerRight(props) {
                    return(
                        <View>
                            <TouchableOpacity>
                                
                            </TouchableOpacity>
                        </View>
                    )
                },
            }}
        />
        <WebView
            style = {styles.webViewStyle}
            source={require('./editor_html/index.html')}
            injectedJavaScript={script}

            onMessage={e => console.log(e.nativeEvent.data)}
        />

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewStyle : {
    height : 400
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
