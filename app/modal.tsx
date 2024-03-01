import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/Themed';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import IdGenerator from '../hooks/id-generator'

export default function ModalScreen() {
  const {note_content, id} = useLocalSearchParams()
  const note  = JSON.parse(note_content as string)
  const [char, setChar] = useState(0)
  const [description, setDescription] = useState('')
  const [ref,setRef] = useState('')
  const [select, setSelect] = useState({}) 
  const [domainSelect, setDomainSelect] = useState([])
  const [identif, setIdentif] = useState(null)
  const [choix, setchoix] = useState(false)

  const onChangeText = (text:any) => {
    setChar(text.length)
    setDescription(text)
  }

  const block_titre = () => {
      
    if(note !== null && note.hasOwnProperty('blocks')){
      if(note.blocks.length > 0){
        const titre = note.blocks.map((element : any) => {
          if(element.type === 'titre'){
            return element.data.text
          }
        });

        return titre[0]
      }
    }
  }


  const domaine = [
    {name : 'La Santification', hash : '#santification', code : 1},
    {name : 'Vie en Societe', hash : '#societe', code : 2},
    {name : 'La Foi', hash : '#foi', code : 3},
    {name : 'Soi-Meme', hash : '#soi-meme', code : 4},
    {name : 'Temoignage', hash : '#temoignage', code : 5},
    {name : 'Plan', hash : '#plan', code : 6},
    {name : 'Prieres', hash : '#prieres', code : 7},
    {name : 'Decouverte biblique', hash : '#decouverte_biblique', code : 8},
    {name : 'L\'Amour', hash : '#amour', code : 9},
    {name : 'Temps', hash : '#temps', code : 10},
    {name : 'Sagesse', hash : '#sagesse', code : 11},
    {name : 'La Prosperite', hash : '#Prosperite', code : 12},
    {name : 'Justice', hash : '#justice', code : 13},
    {name : 'General', hash : '#general', code : 14},
  ]
  

  const handleShare = async () => {
    const id = IdGenerator(15, 5)
    const articles =  {
      article_content : note,
      articleId : 'article_'+id+'_'+Date.now(),
      description : description,
      reference : ref,
      themes : domainSelect,
      published_from : {
        noteId : id, 
        time : Date.now(),
        timeToString : new Date()
      },
      title : block_titre(), 

    }
    const request = await fetch('https://nuvelserver.godigital.workers.dev/articles/daniel_10000-20000-30000/doc/' + articles.articleId , {
      method : 'post',
      body : JSON.stringify(articles),
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    if(request.ok) console.log(JSON.stringify(await request.json()))
  }

  
   useEffect(() => {
      if(domainSelect.length === 0){
        setDomainSelect([])
      }
   }, [])

   useEffect(() => {
      if(identif!== null){
        if(domainSelect.length === 0){
          setDomainSelect(prev => [...prev, select])
        }

        domainSelect.forEach(el => {
          if(el.code !== identif) {
            setDomainSelect(prev => [...prev, select])
          }

          if(select === undefined){
            const filter = domainSelect.filter(el => el.code !== identif)
            setDomainSelect(filter)
          }
        })

        
      }
      console.log(identif, 4)
   }, [select])


  useEffect(() => {
    console.log(domainSelect, 1)
  }, [domainSelect])
  return (
    <SafeAreaView style={{borderColor : 'black', height : "100%", backgroundColor : 'white'}}>
      <Stack.Screen
        options={{
          headerShadowVisible : false,
          headerRight : () => (
            <TouchableOpacity onPress={handleShare} style = {{ paddingHorizontal : 18, paddingVertical : 8, backgroundColor : '#3b82f6', borderRadius : 50, }}>
              <Text fontWeight='600' style = {{ fontSize : 16, color : 'white', lineHeight : 24, marginBottom : -2}}>Publier</Text>
            </TouchableOpacity>
          )
        }}
      />
      <StatusBar style='dark' />
      <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style = {{paddingHorizontal : 20, paddingVertical : 10}}>
          <Text fontWeight='700' style = {{textTransform : 'uppercase', color : '#777'}} >Titre de l'article</Text>
          <Text fontWeight='700' style = {{ fontSize : 28}}>{block_titre()}</Text>
        </View>
        <View style = {{paddingHorizontal : 20, paddingVertical : 10}}>
          <Text fontWeight='700' style = {{textTransform : 'uppercase', color : '#777'}} >Description *</Text>
        </View>
        <View style = {{paddingHorizontal : 14, position : 'relative'}}>
          <TextInput
              editable
              multiline
              numberOfLines={6}
              maxLength={168}
              placeholder='Une breve description de votre articles'
              textAlignVertical='top'
              placeholderTextColor={'#94a3b8'}
              onChangeText={text => onChangeText(text)}
              value={description}
              style={{padding: 10, fontSize : 18, fontFamily : 'Poppins', paddingVertical : 7, justifyContent : 'flex-start', borderRadius : 8, borderColor : '#e2e8f0', borderWidth :1}}
            />
            <View style = {{ position : 'absolute', bottom : 0, right : 10, height : 30, justifyContent : 'center', paddingHorizontal : 10}}>
              <Text fontWeight='600' style = {{ marginBottom : -2, fontSize : 12, color : char > 140 ? '#ff0044' : '#444'}}>{char <= 9 ? `0${char}` : char} char./168 </Text>
            </View>
        </View>
        <View>
          <View style = {{paddingHorizontal : 20, paddingTop : 20, paddingBottom : 10}}>
            <Text fontWeight='700' style = {{textTransform : 'uppercase', color : '#777'}} >Reference Biblique*</Text>
          </View>
          <View style = {{paddingHorizontal : 14, position : 'relative'}}>
            <TextInput
                placeholder='Exode 20: 1'
                placeholderTextColor={'#94a3b8'}
                onChangeText={text => setRef(text)}
                value={ref}
                style={{padding: 10, fontSize : 18, fontFamily : 'Poppins', paddingVertical : 7, justifyContent : 'flex-start', borderRadius : 8, borderColor : '#e2e8f0', marginBottom : -4, borderWidth : 1}}
              />
        
          </View>
        </View>
        <View>
          <View style = {{paddingHorizontal : 20, paddingTop : 20, paddingBottom : 10}}>
            <Text fontWeight='700' style = {{textTransform : 'uppercase', color : '#777'}} >Themes*</Text>
          </View>
          <View style = {{paddingHorizontal : 14}}>
            <TouchableOpacity onPress={() => setchoix(true)} style = {{ minHeight : 44, alignItems : 'center', height : 'auto', borderColor : '#e2e8f0', borderWidth : 1, borderRadius : 8 , flexDirection : 'row'}}>
              {
                domainSelect.length === 0
                ? <Text style = {{ fontSize : 18, paddingLeft : 10, color : '#94a3b8'}}>Selectionner un domaine ou sujet</Text>
                : (
                  <>
                    {
                      domainSelect.map((el, key) => <Text key = {key} fontWeight='600' style = {{ paddingHorizontal : 9, paddingVertical : 4, borderRadius : 4, backgroundColor : '#eff6ff', color : "#2563eb",marginLeft : 6  }}>{el.hash}</Text>)
                    }
                  </>
                )
              }
            </TouchableOpacity>                      
          </View>
        </View>
        <View style = {{ height : 120}} />
      </ScrollView>
      {
        choix && (<View style = {{ position : 'absolute', top : 0, left : 0, width : '100%', height : '100%', backgroundColor : '#0005'}}>
        <View style = {{ width : "100%", height : '100%',position : 'relative'}}>
          <View style ={{ height : "70%", width : '100%', backgroundColor : 'white', position : 'absolute', bottom : 0}}>
            <View style = {{ alignItems : 'center', height : 20, justifyContent : 'center'}}>
                <View style = {{ height : 4, width : 100, borderRadius : 50, backgroundColor : '#ccc'}}></View>
            </View>
            <View>
              <View >
                <Text style = {{ fontSize : 24, textAlign : 'center', paddingTop : 12, paddingBottom : 0, marginBottom : -10}}>Choisir le domaine</Text>
              </View>
              <View style = {{padding : 32, alignItems : 'center'}}>
                <View style = {{ flexDirection : 'row', justifyContent : 'center', alignItems : 'center', alignContent : 'center', width :'98%', gap : 8, flexWrap : 'wrap'}}>
                    {
                      domaine.map((el, key) => <Domaine id= {(e:number) => setIdentif(e)}  value = {el} key={key} onChangeValue={(e:any) => setSelect(e)} /> )
                    }
                </View>
              </View>
              <View style = {{ flexDirection : 'row', justifyContent : 'center'}}>
                <TouchableOpacity onPress={() => setchoix(false)} style = {{ paddingHorizontal : 18, paddingVertical : 7, borderRadius : 50, backgroundColor : '#3b82f6'}}>
                  <Text fontWeight='600' style = {{ fontSize : 19, color : 'white', marginBottom : -2}}> Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>)
      }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

 type domaineProps = { 
    id : any,
    value : any,
    onChangeValue : any
 }
function Domaine({ id, value, onChangeValue } : domaineProps) {
  const [state, setState] = useState(false)

  const handlePress = () => {
    setState(!state)
    id(value.code)
    
  }

  useEffect(()=> {
    if(state) onChangeValue(value)
    else onChangeValue(undefined)
  }, [state])

  return(<Text onPress={handlePress} fontWeight='500' style = {{ paddingHorizontal : 16, paddingVertical : 7, marginBottom : -6, backgroundColor: state ? '#1e293b': '#e2e8f0', fontSize : 16, borderRadius : 50, color : state ? 'white' : 'black'  }}>{value.hash}</Text>)
}

// tableau[tablau.length - 1] || tableau.at(-3)

const styles = StyleSheet.create({
  container: {
    flex: 1
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
