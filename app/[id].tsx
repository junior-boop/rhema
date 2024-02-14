import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import { useGlobalContext } from '@/context/global_context';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const { SaveData, data_note } = useGlobalContext()
  const {id} = useLocalSearchParams()
  const [note_data, set_note_data] = useState({
    id : id,
    content : '',
    createdAt : Date.now(),
    createdBy : 'Daniel Seppo eke',
    published : false,
    epingler : 0
  })


  // const [assets, error] = useAssets([require('../assets/editor_html/index.html')]);
  const  html  = Asset.fromModule(require('../assets/editor_html/index.html'))
    const script = `
        const data = document.querySelector("#data")
        const output = document.querySelector("#output") 
        data.innerHTML = ${data_note[0].content}
        setInterval(() => {
            
            window.ReactNativeWebView.postMessage(output.innerText);
        }, 1000)
        true;
    `

    const beforeLoad = `
      const data = document.querySelector("#data")
      data.innerHTML = ${data_note[0].content}
        alert(data.innerText)
      // window.ReactNativeWebView.postMessage(data.innerText);
      true;
    `

    const handleData = () => {
      return note_data
    }
    
    useEffect(() => {
      console.log(note_data, data_note)
      return () => {
        SaveData(handleData())
      }
    }, [note_data])

  return (
    <>
        <Stack
            screenOptions={{
                animation : 'fade_from_bottom',
                title : '',
                headerRight(props) {
                    return(
                        <View>
                            <TouchableOpacity>
                                <Text>touchable</Text>
                            </TouchableOpacity>
                        </View>
                    )
                },
            }}
        />
        <WebView
            style = {styles.webViewStyle}
            originWhitelist={['*']}
            source={html}
            startInLoadingState = {true}
            renderLoading={() => (
              <ActivityIndicator 
                size={'large'}
                color={'#000'}
              />
            )}
            injectedJavaScript={script}
            injectedJavaScriptBeforeContentLoaded={beforeLoad}
            onMessage={e => set_note_data((prev) => {
              return {
                ...prev,
                content : e.nativeEvent.data
              }
            })}
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
