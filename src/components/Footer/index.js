import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Footer(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.title}>Listagem</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.title}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.title}>Cotações</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#F7F5FA'
    },
    title: {
        fontSize: 16,
        color: '#969CB3',
    }
})