import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabOneScreen() {
  return (
      <SafeAreaView style = {styles.container}>
        <View style = {{ flex : 1, backgroundColor : 'white', padding : 16 }}>
            <Link href={'/editor'} style= {{ width : 70, paddingHorizontal : 18, paddingVertical : 7, borderRadius : 5, backgroundColor : '#f4f4f4'}} >              
              <Text>Editor</Text>
            </Link>
        </View>
      </SafeAreaView>
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
