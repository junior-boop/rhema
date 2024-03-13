import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';
import { useGlobalContext } from '@/context/global_context';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import StandardBtn from '../components/standardBtn';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system'


export default function TabOneScreen() {
  const { SaveData, data_note } = useGlobalContext()
  const [isSaving, setIsSaving] = useState(false)
  const empty_string = '{"blocks":[{"type":"titre","data":{"text":"Votre titre"}},{"type":"paragraph","data":{"text":"Faites nous grandir dans la foi"}}]}' 
  const {id, userid, note_content} = useLocalSearchParams()
  const [htmlSource, setHtmlSource] = useState('')
  const html = () => {
    if(note_content === undefined) {
      return empty_string
    }
    if(note_content !== null){
      return note_content
    } else {
      return empty_string
    }


  }

  
   
  const files = async () => {
      const localhtml = require('../assets/editor.html')
      const [{localUri, uri}, test] = await Asset.loadAsync(localhtml)
      const fileHtml = await FileSystem.readAsStringAsync(localUri as string)
      setHtmlSource(fileHtml)
  }

  
  
  const [note_data, set_note_data] = useState({
    noteId : id,
    note_content : '',
    published : false,
    epingler : 0
  })

  useEffect(() => {
    console.log(note_content)
  }, [])

  useEffect (() => {
    files()
  }, [])
    const handleSaveContent = async () => {
      if(note_data.note_content.length > 0){
        setIsSaving(true)
      
        try {
          const jsonValue = JSON.stringify(note_data);
          const response = await fetch(`https://nuvelserver.godigital.workers.dev/note/${userid}/doc/${id}/content`, {
              method : 'PUT',
              body : jsonValue,
              headers : {
                  'Content-Type' : 'application/json'
              }
          })
          SaveData({...note_data, updatedAt : Date.now()})
          if(response.ok){
            setIsSaving(false)
          }
        } catch (error) {
            console.log(error);
        }
      }
        
    }



    const inject_script = `
        
        const output = document.querySelector("#output") 
        function setData() {
          const data = document.getElementById("data")
          data.innerText = JSON.stringify(${html()})

          return data.innerHTML
        }
        
        setData()
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
                      <StandardBtn name='delete' />
                      {
                        isSaving ? <View style = {{ width :42, height : 42, borderRadius : 50, alignItems : 'center', justifyContent : 'center', backgroundColor : '#f0f9ff' }}><ActivityIndicator size={'small'} color={'#000'} /></View> : <StandardBtn name='content-save' onPress={handleSaveContent} />
                      }
                      <StandardBtn name='share' />
                  </View>
                ),
            }}
        />

        
        <WebView
            style = {styles.webViewStyle}
            originWhitelist={['*']}
            source = {{html : htmlSource}}
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
                note_content : e.nativeEvent.data
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
    gap : 3
  }
});

// { uri : 'https://editor-a1b.pages.dev'}