import { Text } from "@/components/Themed";
import { RiUser6Line } from "@/components/icons";
import { convert } from "@/constants/convert";
import { w } from "@/constants/others";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
// import GrandItem from "@/components/grandeAffiche";
const color = "#64748b";

export default function TabOneScreen() {
  const scrolling = useRef(new Animated.Value(0)).current;
  const transition = scrolling.interpolate({
    inputRange: [convert(0), convert(90)],
    outputRange: [0, -convert(90)],
    extrapolate: "clamp",
  });

  const domaine = [
    { name: "La Santification", hash: "#santification", code: 1 },
    { name: "Vie en Societe", hash: "#societe", code: 2 },
    { name: "La Foi", hash: "#foi", code: 3 },
    { name: "Soi-Même", hash: "#soi-meme", code: 4 },
    { name: "Témoignage", hash: "#temoignage", code: 5 },
    { name: "Plan", hash: "#plan", code: 6 },
    { name: "Prières", hash: "#prieres", code: 7 },
    { name: "Découverte biblique", hash: "#decouverte_biblique", code: 8 },
    { name: "L'Amour", hash: "#amour", code: 9 },
    { name: "Temps", hash: "#temps", code: 10 },
    { name: "Sagesse", hash: "#sagesse", code: 11 },
    { name: "La Prospérite", hash: "#prosperite", code: 12 },
    { name: "Justice", hash: "#justice", code: 13 },
    { name: "Général", hash: "#general", code: 14 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Animated.View
        style={{
          height: convert(92 + 42),
          width: w,
          backgroundColor: "white",
          position: "absolute",
          top: 28,
          left: 0,
          zIndex: 10,
          transform: [
            {
              translateY: transition,
            },
          ],
        }}>
        <View
          style={{
            height: convert(92),
            width: w,
            paddingHorizontal: convert(16),
            alignItems: "flex-end",
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                height: convert(32),
                width: convert(32),
                resizeMode: "contain",
              }}
            />
            <Text fontWeight='600' style={{ fontSize: 24 }}>
              Nuvels
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 36,
              aspectRatio: 1,
              borderRadius: 36,
              borderWidth: 2,
              borderColor: color,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <RiUser6Line width={24} height={24} color={color} />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: convert(42), width: w }}
          centerContent={true}
          pagingEnabled={true}
          snapToAlignment='center'
          contentInsetAdjustmentBehavior='automatic'
          contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
          <Onglet label='Pour vous' />
          <Onglet label='Nouveautés' />
          {domaine.map((el, key) => (
            <Onglet label={el.name} key={key} />
          ))}
        </ScrollView>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        bounces={true}
        style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={{ height: convert(92 + 42), width: w }}></View>
        <GrandItem />
        <GrandItem />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <Decouvert />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <View style={{ height: 2000, width: "100%" }}></View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function Onglet({ label }: { label: string }) {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      style={{
        height: convert(42),
        justifyContent: "center",
        position: "relative",
      }}>
      <Text fontWeight='500' style={{ color: "#444" }}>
        {label}
      </Text>
      {active && (
        <View
          style={{
            height: 2,
            width: "100%",
            position: "absolute",
            backgroundColor: "black",
            bottom: 0,
          }}></View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  webViewStyle: {
    height: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});


export function GrandItem() {
  const handleClick = () => {
    router.navigate({
      pathname: '/article/[articles]',
      params: {
        articles: 'article_W2k7M-hbZDE-xinZ5_1709269256164',
        article_content: null
      },
    })
  }
  return (
    <Pressable onPress={handleClick} style={{ paddingHorizontal: convert(20), paddingVertical: convert(20) }}>
      <View style={{ paddingBottom: convert(20), borderBottomWidth: 1, borderBottomColor: color }}>

        <Text fontWeight="700" style={{
          fontSize: convert(24)
        }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, cumque.
        </Text>
        <Text fontWeight="400" style={{ fontSize: convert(18), color: color }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore repellendus quo explicabo nulla numquam? Sapiente eos sint itaque ea saepe.</Text>
        <View style={{ paddingVertical: convert(5), flexDirection: 'row', alignItems: 'center', gap: convert(10), marginBottom: convert(12) }}>
          <View style={{ width: convert(40), aspectRatio: 1, backgroundColor: '#777', borderRadius: convert(36) }}></View>
          <View>
            <Text fontWeight="600" style={{ fontSize: convert(16), marginBottom: convert(-5), color: color }}>Daniel Seppo Eke</Text>
            <Text fontWeight="400" style={{ fontSize: convert(14), color: color }}>Publier le 12 avril</Text>
          </View>
        </View>
        <View style={{ width: '100%', aspectRatio: 1, backgroundColor: color }}></View>
      </View>
    </Pressable>
  )
}


function LittleItem() {
  const handleClick = () => {
    router.navigate({
      pathname: '/article/[articles]',
      params: {
        articles: 'article_W2k7M-hbZDE-xinZ5_1709269256164',
        article_content: null
      },
    })
  }
  return (
    <Pressable
      onPress={handleClick}
      style={{ paddingHorizontal: convert(20), paddingBottom: convert(20) }}>
      <View style={{ flexDirection: 'row', alignItems: "flex-start", borderBottomWidth: 1, borderColor: color, paddingBottom: convert(20) }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: convert(10), marginBottom: convert(5) }}>
            <View style={{ width: convert(24), aspectRatio: 1, backgroundColor: '#777', borderRadius: convert(26) }}></View>
            <View>
              <Text fontWeight="500" style={{ fontSize: convert(14), marginBottom: convert(-5), color: color }}>Daniel Seppo Eke</Text>
            </View>
          </View>
          <View>
            <Text fontWeight="600" style={{ fontSize: convert(18), lineHeight: convert(24) }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, voluptatem.</Text>
            <Text style={{ fontSize: convert(14), color: color, marginTop: convert(5) }}>12 Avril 2010</Text>
          </View>
        </View>
        <View style={{ height: convert(82), width: convert(82), backgroundColor: color }}></View>
      </View>

    </Pressable>
  )
}


function Decouvert() {
  return (
    <View style={{ width: w, backgroundColor: color, paddingTop: convert(20), marginBottom: convert(32) }}>
      <Description_Auteur />
      <Auteur_articles />
      <View style={{ paddingHorizontal: convert(20), paddingVertical: convert(10), backgroundColor: "#0003", marginTop: convert(16) }}>
        <Text fontWeight="600" style={{ fontSize: convert(15), color: 'white' }}>
          Voir tous les articles de Daniel S.
        </Text>
      </View>
    </View>
  )
}


function Description_Auteur() {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View>
        <Text fontWeight="300" style={{ paddingBottom: 20, fontSize: 32, color: 'white' }}>Auteur à suivre</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: convert(14) }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#0006' }}></View>
        <View style={{ flex: 1 }}>
          <Text fontWeight="600" style={{ fontSize: convert(24), color: 'white' }}>Daniel Seppo Eke</Text>
          <Text fontWeight="400" style={{ fontSize: convert(16), color: 'white' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates deserunt sed perferendis? </Text>
        </View>
      </View>
    </View>
  )
}

function Auteur_articles() {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      centerContent={true}
      pagingEnabled={true}
      snapToAlignment='center'
      contentInsetAdjustmentBehavior='automatic'
      bounces={true}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 38, gap: 16 }}>
      <Articles />
      <Articles />
      <Articles />
      <Articles />
      <Articles />
      <Articles />
    </ScrollView>
  )
}


function Articles() {
  return (
    <View style={{ width: convert(200) }}>
      <View style={{ width: '100%', aspectRatio: 1, backgroundColor: '#0006' }}></View>
      <View>
        <Text fontWeight="600" style={{ color: 'white', fontSize: convert(20), marginTop: 7 }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe.
        </Text>
        <Text style={{ fontSize: convert(14), color: 'white', marginTop: convert(5) }}>12 Avril 2010</Text>
      </View>
    </View>
  )
}