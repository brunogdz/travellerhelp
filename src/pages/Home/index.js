import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import CategoryItem from "../../components/CategoryItem";
import { getFavorite, setFavorite } from "../../services/favorite";
import FavoriteExpense from "../../components/FavoriteExpense";
import ExpenseItem from "../../components/ExpenseItem";

export default function Home() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favCategory, setFavCategory] = useState([]);

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function loadData() {
      await getListExpenses();

      const category = await api.get("/api/categories");
      setCategories(category.data.data);
    }

    loadData();
  }, []);

  // Ao abrir o app validar caso tenha salvo uma moeda em destaque para validar os meus gastos
  useEffect(() => {
    async function favorite() {
      const response = await getFavorite();
      setFavCategory(response);
    }

    favorite();
  }, []);

  // funcao para pegar as despesas, ordenando do mais atual para o menos recente
  async function getListExpenses(){
    const response = await api.get("/api/expenses?populate=category&sort_by=desc(date)") // http://localhost:8082/api/expenses?populate=category&sort=date:desc
    setExpenses(response.data.data)
  }

  // favoritando uma moeda em questão
  async function handleFavorite(id) {
    const response = await setFavorite(id);
    setFavCategory(response);
    console.log(response);
    alert(
      "Moeda Favoritada, agora pode ver os gastos referentes a uma moeda em questão."
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Traveller Help</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Feather name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingRight: 12 }}
        style={styles.categories}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />

      <View style={styles.main}>
        {favCategory.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{paddingEnd: 25}}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoriteExpense data={item} />}
          />
        )}

        <Text style={[styles.titleExpense, 
        {marginTop: favCategory.length > 0 ? -20 : 46}]}>Ultimos gastos</Text>

        <FlatList 
        style={{flex: 1, paddingHorizontal: 18}}
        showsVerticalScrollIndicator={false}
        data={expenses}
        keyExtractor={ (item) => String(item.id)}
        renderItem={({item}) => <ExpenseItem data={item}/>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F5CBF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
  },
  categories: {
    maxHeight: 115,
    backgroundColor: "#131D3F",
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9,
  },
  main: {
      backgroundColor: '#4A567D',
      flex: 1,
      marginTop: -30,
  },
  titleExpense: {
    fontSize: 21,
    paddingHorizontal: 18,
    marginBottom: 14,
    fontWeight: 'bold',
    color: '#FFF'
  }
});
