import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native"

export default function NoteItems({note}){
  const [data, setData] = useState(null)
      
    // const Blocks_reference = useMemo(() => {
    //     if(note!== null){
    //         const t = note.content
    //       const jsonvalue = JSON.parse(t.length > 1 && t)
          
    //       if(t.length === 0){
    //         return null
    //       }
    //       if( t.length > 3){
    //         return t.slice(0, 2)
    //       } else return t
    //     } else return null
    //   }, [note])
  


  
   
  

      
    useEffect(() => {
      // console.log(typeof note.note_content, 'note : '+ note.note_content.length)
      if(note !== undefined && typeof note.note_content === 'string'){
        const note_content = note.note_content.length === 0 ? [] : JSON.parse(note.note_content)
        setData(note_content)
      }
      // const note_content = []
    }, [])

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
      <TouchableNativeFeedback onPress={() => {
        console.log(data)
      }}>
        <View style = {styles.View_1}>
        {
          data !== null && data.hasOwnProperty('blocks') && (<Text style = {styles.titre}>{block_titre()}</Text>)
        }
        <View style = {styles.View_2}>
          {data!== null && block_text().map((el, key) => (<Text key={key}>{el.value}</Text>))}
          <View ></View>
        </View>
        <View style = {styles.ref_block}>
          {/* {Blocks_reference() !== null && Blocks_reference().map((el, key) => (<Text className='px-2 py-1 rounded-sm text-slate-800 font-bold text-xs bg-slate-200 w-max' key={key}>el.data.reference</Text>))} */}
        </View>
      </View>
      </TouchableNativeFeedback>
    )
  }


const styles = StyleSheet.create({
    View_1 : {
        width : '100%',
        borderRadius : 8,
        backgroundColor : "white", 
        borderColor : '#e2e8f0',
        borderWidth : 1,
        padding : 16,
        maxHeight : 300,
        userSelect : 'none'
    },

    titre : {
        fontWeight : '800',
        fontSize : 18,
        marginBottom : 14,
    }, 
    View_2 : {
        flex : 1, 
        overflow : 'hidden',
        position : 'relative'
    },

    texte : {
        fontSize : 12,
        lineHeight : 1.1
    },
    ref_block : {
        paddingTop : 8,
    }, 
    ref : {
        paddingHorizontal : 8, 
        borderRadius : 4, 
        color : '#1e293b',
        fontWeight : '800',
        fontSize : 10, 
        backgroundColor : '#e2e8f0',
        width : 'auto'
    }
})