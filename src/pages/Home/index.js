import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import CategoryItem, {} from '../../components/CategoryItem'

export default function Home() {

    const navigation = useNavigation();
    const [categories, setCategories] = useState([])

    useEffect( () => {
        async function loadData (){
            const category = await api.get("/api/categories")
            setCategories(category.data.data)
        }

        loadData();
    }, [])

    // favoritando uma moeda em questão
    function handleFavorite(id){
        alert("Moeda Favoritada, agora pode ver os gastos referentes a uma moeda em questão. O " + id + " foi escolhido.")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Traveller Help</Text>

                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Feather name="search" size={24} color="#FFF"/>
                </TouchableOpacity>
            </View>

            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{paddingRight: 12}}
            style={styles.categories}
            data={categories}
            keyExtractor={ (item) => String(item.id)}
            renderItem={({item}) => (
                <CategoryItem 
                data={item}
                favorite={() =>handleFavorite(item?.attributes?.name)}
                />
            )}
            />
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
    },
    categories: {
        maxHeight: 115,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9
    }
})