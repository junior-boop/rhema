import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/Themed';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import IdGenerator from '../hooks/id-generator'
import MultipleSelection from '@/components/multiselecter';
import { MaterialIcons } from '@expo/vector-icons';
import ReferenceBiblique from '@/components/referece';
import { Router } from 'expo-router';
import { useGlobalContext } from '@/context/global_context';
// import Loading from '../assets/images/SvgSpinners3DotsFade.svg'

export default function ModalScreen() {
  const {id} = useLocalSearchParams()
  const { getNote } = useGlobalContext()
  const { note_content } = getNote(id as string)
  const note  = JSON.parse(note_content as string)
  const [char, setChar] = useState(0)
  const [ref, setRef] = useState('')
  const [description, setDescription] = useState('')

  const [select, setSelect] = useState({}) 
  const [domainSelect, setDomainSelect] = useState([])
  const [identif, setIdentif] = useState(null)
  const [choix, setchoix] = useState(false)
  const [validation, setValidation] = useState(false)


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
    {name : 'Soi-Même', hash : '#soi-meme', code : 4},
    {name : 'Témoignage', hash : '#temoignage', code : 5},
    {name : 'Plan', hash : '#plan', code : 6},
    {name : 'Prières', hash : '#prieres', code : 7},
    {name : 'Découverte biblique', hash : '#decouverte_biblique', code : 8},
    {name : 'L\'Amour', hash : '#amour', code : 9},
    {name : 'Temps', hash : '#temps', code : 10},
    {name : 'Sagesse', hash : '#sagesse', code : 11},
    {name : 'La Prospérite', hash : '#prosperite', code : 12},
    {name : 'Justice', hash : '#justice', code : 13},
    {name : 'Général', hash : '#general', code : 14},
  ]
  

  const handleShare = async () => {
    setValidation(true)
    const key = IdGenerator(15, 5)
    const articles =  {
      article_content : note,
      articleId : 'article_'+key+'_'+Date.now(),
      description : description,
      reference : ref,
      themes : domainSelect,
      published_from : {
        noteId : id, 
        articleId : 'article_'+key+'_'+Date.now(),
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

    if(request.ok) {
      router.back()
      setValidation(false)
    }
  }


   const handleChangeDomaine = (value : any) => {
      setDomainSelect(value)
   }


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
          <Text fontWeight='700' style = {{textTransform : 'uppercase', color : '#777'}} >Description*</Text>
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
        <ReferenceBiblique onChange={(e) => setRef(JSON.stringify(e))} />
        <View>
          <View style = {{paddingHorizontal : 20, paddingTop : 20, paddingBottom : 10}}>
            <Text fontWeight='700' style = {{textTransform : 'uppercase', color : '#777'}} >Themes*</Text>
          </View>
          <View style = {{paddingHorizontal : 14}}>
            <TouchableOpacity onPress={() => setchoix(true)} style = {{ minHeight : 44, alignItems : 'center', height : 'auto', borderColor : '#e2e8f0', borderWidth : 1, borderRadius : 8 , flexDirection : 'row', flexWrap : 'wrap', paddingVertical : 6, gap : 6, paddingHorizontal : 6}}>
              {
                domainSelect.length === 0
                ? <Text style = {{ fontSize : 18, paddingLeft : 10, color : '#94a3b8'}}>Selectionner un domaine ou sujet</Text>
                : (
                  <>
                    {
                      domainSelect.map((el, key) => <Text key = {key} fontWeight='500' style = {{ paddingHorizontal : 9, paddingVertical : 4, borderRadius : 4, backgroundColor : '#eff6ff', color : "#2563eb"}}>{el.hash}</Text>)
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
          <View style ={{ height : "80%", width : '100%', backgroundColor : 'white', position : 'absolute', bottom : 0}}>
            <View style = {{ alignItems : 'center', height : 20, justifyContent : 'center'}}>
                <View style = {{ height : 4, width : 100, borderRadius : 50, backgroundColor : '#ccc'}}></View>
            </View>
            <View style ={{ flex : 1}}>
              <View >
                <Text style = {{ fontSize : 24, textAlign : 'center', paddingTop : 12, paddingBottom : 0, marginBottom : -10}}>Choisir le domaine</Text>
              </View>
              <MultipleSelection items={domaine}  value={domainSelect} onChange={handleChangeDomaine}/>
              <View style = {{ flexDirection : 'row', justifyContent : 'center', position : 'absolute', bottom : 0,  width : '100%', paddingVertical : 18, backgroundColor : 'white', elevation : 20}}>
                <TouchableOpacity onPress={() => setchoix(false)} style = {{ paddingHorizontal : 18, paddingVertical : 7, borderRadius : 50, backgroundColor : '#3b82f6'}}>
                  <Text fontWeight='600' style = {{ fontSize : 19, color : 'white', marginBottom : -2}}> Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>)
      }

      {
        validation && (
            <View style = {{ position : 'absolute', top : 0, left : 0, width : '100%', height : '100%', backgroundColor : '#FFFa', justifyContent : 'center', alignItems : 'center', zIndex : 10}}>
              <View>
                {
                  validation && <ActivityIndicator size={'large'} color={'black'} />
                }
              </View>
            </View>
        )
      }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
