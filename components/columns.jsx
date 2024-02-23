import { StyleSheet, View } from "react-native"
import NoteItems from "./noteItems"

/**
 * 
 * @param {{data : Array}} param0 
 * @returns 
 */
 export default function Column({data}){
    const liste_1 = data !== undefined && data.map((el, key) => {
      if(key % 2 === 0) return el
    })
    const liste_2 = data !== undefined && data.map((el, key) => {
      if(key % 2 === 1) return el
    })
  

    return(
      <View style = {styles.block}>
        <View style={styles.column}>
          {
            data !== undefined && liste_1.map((el, key) => el !== undefined ? (<NoteItems note = {el}  key = {key} />) : null)
          }
        </View>
        <View style={styles.column}>
          {
            data !== undefined && liste_2.map((el, key) => el !== undefined ? (<NoteItems note = {el}  key = {key} />) : null)
          }
        </View>
      </View>
    )
  }

const styles = StyleSheet.create({
    block : {
        gap : 8,
        flexDirection : 'row',
        paddingLeft : 4
    }, 
    column : {
        width : "48%",
        gap : 8, 
    }
})