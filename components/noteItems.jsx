import { useEffect, useMemo, useState } from "react"
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView, TouchableOpacity } from "react-native"
import { router } from 'expo-router'

export default function NoteItems({note}){
  const [data, setData] = useState(null)
      
      
    useEffect(() => {
      if(note !== undefined && typeof note.note_content === 'string'){
        const note_content = note.note_content.length === 0 ? null : JSON.parse(note.note_content)
        setData(note_content)
      }      
    }, [note])

    const Blocks_reference = useMemo(() => {
      if(note!== undefined && typeof note.note_content === 'string'){
          if(data !== null && data.hasOwnProperty('blocks')){
            const t = data.blocks.filter((el) => el.type === 'bible_ref')
            if(t.length === 0){
              return null
            }
            if( t.length > 3){
              return t.slice(0, 2)
            } else return t
          }
        
      } else return null
    }, [data])

    /**
     * @returns {Array}
     */
    const block_text = () => {
      if(data !== null && data.hasOwnProperty('blocks')){
          const t = data.blocks.filter((el) => el.type === 'paragraph')
          return t
      } else return []
    }
  
    const block_titre = () => {
      
      if(data !== null && data.hasOwnProperty('blocks')){
        if(data.blocks.length > 0){
          const titre = data.blocks.map(element => {
            if(element.type === 'titre'){
              return element.data.text
            }
          });

          return titre[0]
        }
      }
    }

    return(
      <View style = {{
        ...styles.View_1,
        borderRadius : 8,
        overflow : 'hidden'
      }}>
        <TouchableOpacity  style = {{ borderRadius : 8}} onPress={() => {
            console.log(note.noteId)
            router.navigate({
              pathname : '/[id]', 
              params : {
                id : note.noteId, 
                userid : note.userId, 
                note_content : note.note_content.length === 0 ? null : note.note_content
              }
            })
        }}>
          <View style = {{ paddingHorizontal : 14}}>
          {
            data !== null && data.hasOwnProperty('blocks') && (<Text style = {styles.titre}>{block_titre()}</Text>)
          }
          <View style = {styles.View_2}>
            {data !== null && block_text().map((el, key) => <Text style = {styles.texte} key={key}>{el.data.text}</Text>)}
            <View ></View>
          </View>
          
        </View>
        </TouchableOpacity>
        <ScrollView horizontal = {true} contentContainerStyle = {{ paddingHorizontal : 14, gap : 8, paddingTop : 12}} showsHorizontalScrollIndicator = {false}>
            {Blocks_reference !== null && Blocks_reference !== undefined && Blocks_reference.map((el, key) => (<Text style = {styles.ref} key={key}>{el.data.reference}</Text>))}
          </ScrollView>
      </View>
    )
  }

const styles = StyleSheet.create({
    View_1 : {
        width : '100%',
        backgroundColor : "white", 
        borderColor : '#e2e8f0',
        borderWidth : 1,
        paddingVertical : 12,
        maxHeight : 300,
        userSelect : 'none'
    },

    ref : {
      paddingHorizontal : 8,
      paddingVertical : 4,
      borderRadius : 4,
      color : '#1e293b',
      fontWeight : '800',
      fontSize : 12,
      backgroundColor : "#f1f5f9",
      width : 'auto'
    },

    titre : {
        fontWeight : '700',
        fontSize : 16,
        marginBottom : 5
    }, 
    View_2 : { 
        overflow : 'hidden',
        position : 'relative',
        height : 'auto',
        maxHeight : 200
    },

    texte : {
        fontSize : 14,
        lineHeight : 16,
        color : '#444'
    },
    ref : {
        paddingHorizontal : 8, 
        paddingVertical : 4,
        borderRadius : 4, 
        color : '#1e293b',
        fontWeight : '800',
        fontSize : 12, 
        backgroundColor : '#e2e8f0',
        width : 'auto'
    }
})