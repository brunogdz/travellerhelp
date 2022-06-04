import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function CategoryCoin() {
    return (
        <View style={styles.container}>
            <Text>CategoryCoin</Text>
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