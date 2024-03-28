import { StyleSheet, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import { RiDeleteBin6Line, RiSaveFill, RiSaveLine, RiShareForwardBoxFill, RiUploadCloud2Line } from "./icons";

type standardBtn = {
    name: React.ComponentProps<typeof MaterialCommunityIcons>['name'],
    onPress: () => void
}

function StandardBtn({ name, onPress }: standardBtn) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            {
                name === 'content-save'
                    ? <RiSaveLine width={24} height={24} color="black" />
                    : name === 'delete'
                        ? <RiDeleteBin6Line width={24} height={24} color="black" />
                        : name === 'share'
                            ? <RiShareForwardBoxFill width={24} height={24} color="black" />
                            : name === 'update'
                                ? <RiUploadCloud2Line width={24} height={24} color="black" />
                                : null
            }
        </TouchableOpacity>
    )
}


export default StandardBtn

const styles = StyleSheet.create({
    btn: {
        width: 42,
        height: 42,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})