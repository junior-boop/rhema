import { Text } from "@/components/Themed";
import { ScrollView, StatusBar, TouchableOpacity, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from 'expo-file-system'
import { useEffect, useRef, useState } from "react";
import { Asset } from "expo-asset";
import WebView from "react-native-webview";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { convert } from "@/constants/convert";
import { RiArrowLeftLine, RiChat2Line, RiDownload2Line, RiErrorWarningLine, RiOpenArmFill, RiOpenArmLine, RiShareLine } from "@/components/icons";
import { w } from "@/constants/others";
import ModalComment from "@/components/ModalComment";

export default function Articles() {
  const empty_string = '{"blocks":[{"type":"titre","data":{"text":"Votre titre"}},{"type":"paragraph","data":{"text":"Faites nous grandir dans la foi"}}]}'
  const [htmlSource, setHtmlSource] = useState('')
  const { articleId, article_content } = useLocalSearchParams()
  const [velocity, setVelocity] = useState(0)
  const [progress, setProgress] = useState(0)
  const [appreciation, setAppreciation] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [onClose, setOnClose] = useState(false)

  const AppbarPos = useRef(new Animated.Value(-30)).current
  const BottombarPos = useRef(new Animated.Value(-30)).current

  const colorBtn = "#64748b"


  const html = () => {
    if (article_content === undefined) {
      return empty_string
    }
    if (article_content !== null) {
      return article_content
    } else {
      return empty_string
    }
  }

  const files = async () => {
    const localhtml = require('../../assets/reader.html')
    const [{ localUri, uri }, test] = await Asset.loadAsync(localhtml)
    const fileHtml = await FileSystem.readAsStringAsync(localUri as string)
    setHtmlSource(fileHtml)
  }

  useEffect(() => {
    files()
  }, [])


  const inject_script = `
  function setData() {
      const html = document.querySelector("html")
      const data = document.querySelector("#data");
      data.innerText = JSON.stringify(${html()});
      html.style.fontSize = ${convert(16)}+"px"
    };
    
    setTimeout(() => {
      setData();
    }, 500)     
  true;
  `

  const AppBarVisible = () => {
    Animated.timing(AppbarPos, {
      toValue: 28,
      duration: 300,
      useNativeDriver: false
    }).start()
  }
  const BottomBarVisible = () => {
    Animated.timing(BottombarPos, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start()
  }
  const AppBarNotVisible = () => {
    Animated.timing(AppbarPos, {
      toValue: -30,
      duration: 300,
      useNativeDriver: false
    }).start()
  }
  const BottomBarNotVisible = () => {
    Animated.timing(BottombarPos, {
      toValue: -60,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    if (velocity > 0) { AppBarNotVisible(); BottomBarNotVisible() }
    else { AppBarVisible(); BottomBarVisible() }
  }, [velocity])

  const handleDarkSide = () => {
    setOpenModal(!openModal)
    setOnClose(false)
    console.log('je fonctionne')
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <Stack.Screen options={{ animation: "ios" }} />
      <StatusBar barStyle={'dark-content'} backgroundColor={"white"} />
      <Animated.View style={{ height: convert(56), alignItems: 'center', padding: convert(16), flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', zIndex: 12, backgroundColor: 'white', width: w, top: AppbarPos }}>
        <TouchableOpacity onPress={() => router.back()}>
          <RiArrowLeftLine width={convert(24)} height={convert(24)} color={'black'} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: convert(24) }}>
          <TouchableOpacity>
            <RiShareLine width={convert(24)} height={convert(24)} color={colorBtn} />
          </TouchableOpacity>

          <TouchableOpacity>
            <RiErrorWarningLine width={convert(24)} height={convert(24)} color={colorBtn} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlSource }}
        javaScriptEnabled
        scalesPageToFit={true}
        onScroll={(e) => setVelocity(e.nativeEvent.velocity.y !== undefined && e.nativeEvent.velocity.y)}
        startInLoadingState={true}
        injectedJavaScript={inject_script}
        onLoadProgress={(e) => setProgress(e.nativeEvent.progress)}
        renderLoading={() => (
          <View style={{ position: 'absolute', bottom: '10%', width: w, alignItems: 'center' }}>
            <View style={{ height: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text fontWeight='600' >Chargement...</Text>
            </View>
            <Animated.View style={{ backgroundColor: '#3b82f6', height: 3, width: 200 * progress }}></Animated.View>
          </View>
        )}
      />
      <Animated.View style={{ height: convert(56), alignItems: 'center', padding: convert(16), flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', zIndex: 12, backgroundColor: 'white', width: w, bottom: BottombarPos, elevation: 30 }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={() => setAppreciation(!appreciation)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, flex: 1 }}>
            {
              !appreciation
                ? <RiOpenArmLine width={convert(24)} height={convert(24)} color={colorBtn} />
                : <RiOpenArmFill width={convert(24)} height={convert(24)} color={'#3b82f6'} />
            }
            <Text fontWeight="600" style={{ fontSize: convert(16), color: appreciation ? '#3b82f6' : colorBtn }}> 2k </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpenModal(!openModal)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, flex: 1 }}>
            <RiChat2Line width={convert(24)} height={convert(24)} color={colorBtn} />
            <Text fontWeight="600" style={{ fontSize: convert(16), color: colorBtn }}> 200 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, flex: 1 }}>
            <RiDownload2Line width={convert(24)} height={convert(24)} color={colorBtn} />
          </TouchableOpacity>

        </View>
      </Animated.View>
      {
        openModal && <ModalComment onToucheDarkSide={handleDarkSide} open={onClose} close={() => {
          setOnClose(false)
          setTimeout(() => {
            setOpenModal(false)
          }, 2000)
        }} />
      }
    </SafeAreaView>
  )
}