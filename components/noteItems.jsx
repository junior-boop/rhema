import { useEffect, useMemo, useState } from "react"
import { View, StyleSheet, TouchableNativeFeedback, ScrollView, TouchableOpacity } from "react-native"
import { Text } from './Themed'
import { router } from 'expo-router'
import { LinearGradient } from "expo-linear-gradient"
import NoteLongPress_Btn from './btn_noteLongPress'
import { MaterialIcons } from '@expo/vector-icons';
import { convert } from "../constants/convert"

export default function NoteItems({note}){
  const [data, setData] = useState(null)

  const [longSelection, setLongSelection] = useState(false)
      
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
          let String = ''
          t.forEach((element, key) => {
            const text = element.data.text.replace('&nbsp;', '')
            if(key < 1) String += text
            if(key >= 1) String += "\n"+text
          });

          return String
      } else return "Block Vide"
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

    const handleCloseSelect = () => {
      setLongSelection(false)
    }

    const valuetext = 'Block vide'

    return(
      <View style = {{
        ...styles.View_1,
        borderRadius : 2, 
        borderColor : longSelection ? '#000' : '#e2e8f0',
        overflow : 'hidden',
        position : 'relative',
      }}>
        {
          longSelection && (<LinearGradient 
            colors={['rgba(255,255,255, 1)', 'transparent']}
            style = {{
              position : 'absolute',
              zIndex : 2,
              top : 0,
              left : 0,
              height : "100%",
              width : "100%",
            }}
          />)
        }
        {
          longSelection && (<View style = {{
            position : 'absolute',
            top : 7,
            left : 0,
            width : "96%",
            zIndex : 3, 
            flexDirection : 'row',
            gap: 4,
            justifyContent : 'flex-end'
  
          }}>
  
            {data !== null && <NoteLongPress_Btn icon={<MaterialIcons name="publish" size={18} color="white"/>} onPress={() => {
              router.navigate({pathname : '/modal', params : {note_content : note.note_content, id:note.noteId}})
              setLongSelection(false)
            } } />}
            <NoteLongPress_Btn icon={<MaterialIcons name="delete-outline" size={18} color="white" />} />
            <NoteLongPress_Btn icon={<MaterialIcons name="close" color={'white'} size={18} onPress={handleCloseSelect} />} />
  
          </View>)
        }
        <TouchableOpacity

        onPress={() => {
            router.navigate({
              pathname : '/[id]', 
              params : {
                id : note.noteId, 
                userid : note.userId, 
                note_content : note.note_content.length === 0 ? null : note.note_content
              }
            })
        }}

        onLongPress={() => {
          setLongSelection(true)
        }}
        >
          <View style = {{ paddingHorizontal : convert(14)}}>
          {
            data !== null && data.hasOwnProperty('blocks') && (<Text fontWeight="500" style = {styles.titre}>{block_titre()}</Text>)
          }
          <View style = {styles.View_2}>
            {data !== null && <Text fontWeight="400" style = {styles.texte} >{block_text()}</Text>}
            {data === null && <Text style = {{ color : '#999' }}>{valuetext}</Text>}
          </View>
          
        </View>
        </TouchableOpacity>
        { Blocks_reference !== null && Blocks_reference !== undefined && (<ScrollView horizontal = {true} contentContainerStyle = {{ paddingHorizontal : 14, gap : 8, paddingTop : 12}} showsHorizontalScrollIndicator = {false}>
            {Blocks_reference.map((el, key) => (<Text fontWeight="600" style = {styles.ref} key={key}>{el.data.reference}</Text>))}
          </ScrollView>)}
      </View>
    )
  }

const styles = StyleSheet.create({
    View_1 : {
        width : '100%',
        backgroundColor : "white",
        borderWidth : convert(1),
        paddingVertical : convert(12),
        maxHeight : convert(300),
        userSelect : 'none'
    },
    titre : {
        fontSize : convert(16),
        marginBottom : convert(5),
        lineHeight : convert(18)
    }, 
    View_2 : { 
        overflow : 'hidden',
        position : 'relative',
        height : 'auto',
        maxHeight : convert(150)
    },

    texte : {
        fontSize : convert(14),
        lineHeight : convert(17),
        color : '#444'
    },
    ref : {
        paddingHorizontal : convert(8), 
        paddingVertical : (4),
        borderRadius : (1), 
        color : '#1e293b',
        fontSize : convert(13), 
        backgroundColor : '#e2e8f0',
        width : 'auto'
    }
})