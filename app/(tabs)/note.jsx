import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Btn_New_Note from '../../components/btn_editor';
import { useGlobalContext } from '../../context/global_context'
import { useEffect, useState } from 'react';
import Titre_Page from '../../components/titre_page'
import Column from '../../components/columns';
import Published_list from '../../components/publish_list'

import { convert } from '../../constants/convert'

export default function TabTwoScreen() {
  const [element, setElement] = useState([])
  const { data_note, data_articles } = useGlobalContext()

  const readAllKeys = async () => {
    const order = data_note.sort((a, b) => a.updatedAt - b.updatedAt)
    setElement(order)
  }

  useEffect(() => {
    readAllKeys()
  }, [data_note])

  return (
    <SafeAreaView style={{...styles.container, position : 'relative'}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <View style = {{ width : '100%', paddingVertical : convert(12), paddingHorizontal : convert(16), top : convert(26), zIndex : 12, position : 'absolute' }}>
            <TouchableOpacity style = {{ backgroundColor : '#f1f5f9', height : convert(48), borderRadius : convert(60), flexDirection : 'row', alignItems : 'center', gap : 12, justifyContent:'center', width:'100%'}}>
                <View>
                    <AntDesign name="search1" size={20} color="black" />
                </View>
                <Text style = {styles.text}> Rechercher un note</Text>
            </TouchableOpacity>
        </View>
         <Btn_New_Note />
        <ScrollView style = {{...styles.container, position : 'relative', top:0}} showsVerticalScrollIndicator = {false}>
          <View style = {{ height : 70}}></View>
          <Published_list data = {data_articles} />
          <Titre_Page titre='Brouillons' />
          <View style = {styles.element_block}>
            {
              element.length === 0
              ? (<View></View>)
              :( <>
                <Column data = {data_note.reverse()} />  
              </> )
            }    
          </View>
          <View style = {styles.vide}></View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#f8fafc"
  },
  title: {
    fontSize: convert(20),
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: convert(30),
    height: 1,
    width: '80%',
  },

  text : {
    fontSize : convert(18)
  },
  vide : {
    height : convert(24 + 48)
  },
  element_block : {
    paddingHorizontal : convert(8)
  },

  
});
