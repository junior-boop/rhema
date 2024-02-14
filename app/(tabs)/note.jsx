import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Btn_New_Note from '../../components/btn_editor';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{...styles.container, position : 'relative'}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <View style = {{ width : '100%', paddingVertical : 12, paddingHorizontal : 16, top : 26, zIndex : 12, position : 'absolute' }}>
            <TouchableOpacity style = {{ backgroundColor : '#f1f5f9', height : 48, borderRadius : 60, flexDirection : 'row', alignItems : 'center', gap : 12, justifyContent:'center', width:'100%'}}>
                <View>
                    <AntDesign name="search1" size={20} color="black" />
                </View>
                <Text style = {styles.text}> Rechercher un note</Text>
            </TouchableOpacity>
        </View>
         <Btn_New_Note />
      <ScrollView style = {{...styles.container, position : 'relative', top:0}}>
        <View style = {styles.vide}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white'
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

  text : {
    fontSize : 18
  },
  vide : {
    height : 24 + 48
  }
  
});
