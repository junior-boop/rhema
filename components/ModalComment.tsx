import { w } from "@/constants/others";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, TouchableOpacity, View, TextInput } from "react-native";
import { Text } from "./Themed";
import { RiChatNewLine, RiCloseLine } from "./icons";
import { convert } from "@/constants/convert";

export default function ModalComment({ onToucheDarkSide, open, close } : { onToucheDarkSide : () => void, open : boolean, close : () => void }){
    const opacityRef = useRef(new Animated.Value(0)).current
    const openRef = useRef(new Animated.Value(0)).current
    const [height, setHeight] = useState(0)

    const AnimatedOpacityOn = () => {
        Animated.timing(opacityRef, {
            toValue : 1,
            duration : 300,
            useNativeDriver : false
        }).start()
    }
    const AnimatedOpacityOff = () => {
        Animated.timing(opacityRef, {
            toValue : 0,
            duration : 300,
            useNativeDriver : false
        }).start()
    }

    const BottomOn = () => {
       setTimeout(() => {
            Animated.timing(openRef, {
                toValue : 0,
                duration : 500,
                useNativeDriver : false
            }).start()
       }, 1000)
    }

    const BottomOff = () => {
        setTimeout(() => {
            Animated.timing(openRef, {
                toValue : -(height + 20),
                duration : 500,
                useNativeDriver : false
            }).start()
        }, 1000)
    }

    useEffect(() => {
        if(!open) {AnimatedOpacityOff() ; BottomOff()}
        else {AnimatedOpacityOn() ; BottomOn()}
    }, [open])
    return(
        <View style = {{ position : 'absolute', width :w, height : '100%', top : 28, left : 0, zIndex : 20,}}>
            <Animated.View style = {{backgroundColor :'#0007', flex : 1, opacity : opacityRef}}><Pressable onPress={onToucheDarkSide} style = {{ flex : 1}}></Pressable></Animated.View>
            <Animated.View onLayout={(e) => setHeight(e.nativeEvent.layout.height)} style = {{ width : w, height :'90%', backgroundColor : 'white', position : 'absolute', bottom : openRef}}>
                <View style = {{ paddingHorizontal : 20}}>
                    <View style = {{ height : 56, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text fontWeight="600" style = {{ fontSize : 18}}>Commentaires</Text>
                        <TouchableOpacity onPress={close}>
                            <RiCloseLine width={24} height={24} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style = {{flex : 1}} contentContainerStyle = {{ paddingHorizontal : 16, paddingTop : 3, paddingBottom : 34}}>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </ScrollView>
                <View style = {{ minHeight : 56, maxHeight:156, width : w, flexDirection : 'row', paddingHorizontal : 20, alignItems : 'center', borderTopWidth : 1, borderTopColor : '#aaa4'}}>
                    <TextInput 
                        editable
                        multiline
                        maxLength={3000}
                        style = {{ flex : 1, fontSize : 18, fontFamily : 'Poppins', minHeight:56}}
                        placeholder="Enter your comment"
                        autoFocus = {false}
                    />
                    <TouchableOpacity>
                        <RiChatNewLine width = {24} height = {24} color = {'black'} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

function Comment() {
    return(
        <View style = {{ flexDirection : 'row', gap : 12}}>
            <View>
                <View style = {{ height : 48, width : 48, borderRadius : 48, backgroundColor : "#64748b"}} />
            </View>
            <View style = {{ flex : 1}}>
                <Text fontWeight="600">Daniel Seppo Eke - 2min</Text>
                <Text style = {{ fontSize : convert(16)}} >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis accusantium nihil beatae recusandae a ea iste optio at, pariatur dolores? Expedita, cupiditate optio!
                </Text>
                <View style = {{ height : 40, flexDirection : 'row', }}>

                </View>
            </View>

        </View>
    )
}