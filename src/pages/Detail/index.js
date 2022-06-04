import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function Detail() {
    return (
        <View style={styles.container}>
            <Text>Detail - to show what changes</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})