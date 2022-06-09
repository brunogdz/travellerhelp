import React from "react";
import {View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import {Feather} from '@expo/vector-icons'

export default function Home() {

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Traveller Help</Text>

                <TouchableOpacity>
                    <Feather name="search" size={24} color="#FFF"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#016170'
    },
    header: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 24
    },
    title: {
        fontSize: 28,
        color: "#FFF",
        fontWeight: 'bold'
    }
})