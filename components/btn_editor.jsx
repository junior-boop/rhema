import { TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { Link,  router } from 'expo-router'

export default function Btn_New_Note(){

    const handleClick = () => {
        router.navigate({pathname : '/[id]', params : { id : '1234'}})
    }

    return(
        <TouchableOpacity onPress={handleClick} style = {styles.btn_ajoute}>
            <AntDesign name="plus" size={32} color="white"  />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    btn_ajoute : {
        position : 'absolute',
        zIndex : 12,
        bottom : 20,
        right : 20,
        width : 56,
        aspectRatio : 1,
        borderRadius : 56,
        backgroundColor : '#3b82f6',
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 2
      }
})