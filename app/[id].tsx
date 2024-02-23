import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import { useGlobalContext } from '@/context/global_context';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import StandardBtn from '../components/standardBtn';


export default function TabOneScreen() {
  const { SaveData, data_note } = useGlobalContext()

  const [html, setHTML] = useState('{"blocks":[{"type":"titre","data":{"text":"Votres titre"}},{"type":"paragraph","data":{"text":"Faites nous grandir dans la foi"}}]}')
  const {id} = useLocalSearchParams()
  const [note_data, set_note_data] = useState({
    id : id,
    content : '',
    createdAt : Date.now(),
    published : false,
    epingler : 0
  })
    
    
    // const readDatabse = async () => {
    //   if(!Data.content){
    //     setHTML('{"blocks":[{"type":"titre","data":{"text":"Votre titre"}},{"type":"paragraph","data":{"text":"Faites nous grandir dans la foi"}}]}')
    //   } else {
    //     setHTML(Data.content)
    //   }
    // }
    
    const handleSaveContent = () => {
      SaveData(note_data)
      console.log(note_data)
      // setItem(JSON.stringify(note_data))
    }

    useEffect(() => {
      // readDatabse()
    }, [])



    const inject_script = `
        const data = document.querySelector("#data")
        const output = document.querySelector("#output") 
        
        data.innerText = '${html}'
        setInterval(() => {
          window.ReactNativeWebView.postMessage(output.innerText);
        }, 1000)
        true;
    `

  return (
    <>
        <Stack.Screen
            options={{
                animation : 'fade_from_bottom',
                title : '',
                headerRight : () => (
                  <View style = {styles.headerRight}>
                      <StandardBtn name='pin-outline' />
                      <StandardBtn name='content-save-outline' onPress={handleSaveContent} />
                      <StandardBtn name='delete-outline' />
                  </View>
                ),
            }}
        />

        
        <WebView
            style = {styles.webViewStyle}
            originWhitelist={['*']}
            source = {{ uri : 'editor-a1b.pages.dev'}}
            javaScriptEnabled
            startInLoadingState = {true}
            renderLoading={() => (
              <ActivityIndicator 
                size={'large'}
                color={'#000'}
              />
            )}
            injectedJavaScript={inject_script}
            onMessage={e => set_note_data((prev) => {
              return {
                ...prev,
                content : e.nativeEvent.data
              }
            })}

            onError={(e) => console.log('il y a une erreur :', e)}
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

  headerRight : {
    flexDirection : 'row',
    alignItems : 'center',  
    gap : 8
  }
});
