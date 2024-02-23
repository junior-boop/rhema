import { StyleSheet, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";

type standardBtn = {
    name : React.ComponentProps<typeof MaterialCommunityIcons>['name'],
    onPress : () => void
}

function StandardBtn({name, onPress}:standardBtn){
    return (
        <TouchableOpacity onPress={onPress} style = {styles.btn}>
            <MaterialCommunityIcons name={name} size={24} color="black"  />
        </TouchableOpacity>
    )
}


export default StandardBtn

const styles =  StyleSheet.create({
    btn : {
        width : 42, 
        height: 42,
        borderRadius : 50,
        alignItems : 'center',
        justifyContent : 'center'
    }
})