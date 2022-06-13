import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function CategoryItem({data, favorite}) {
    const navigation = useNavigation();

    function handleNavigate(){
        navigation.navigate("CategoryCoin", {id: data.id, title: data?.attributes?.name})
    }

    return (
        <TouchableOpacity style={style.container}
        activeOpacity={0.7}
        onPress={handleNavigate}
        onLongPress={favorite}
        >
            <Text style={style.name}>{data?.attributes?.name}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginLeft: 8,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    name:{

    }
})