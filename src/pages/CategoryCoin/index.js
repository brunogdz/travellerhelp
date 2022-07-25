import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { getCotacao } from "../../services/favorite";
import ExpenseItem from "../../components/ExpenseItem";

export default function CategoryCoin() {
  const navigation = useNavigation();
  const route = useRoute();
  const [expenses, setExpenses] = useState([]);
  const [cotacao, setCotacao] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        route.params?.title === ""
          ? "Categoria"
          : `Gastos na moeda - ${route.params?.title}`,
    });
  }, [navigation]);

  useEffect(() => {
    async function loadExpenses() {
      const test = await getCotacao();
      // console.log
      // console.log("test", test)
      // alert(test.length)
      setCotacao([test]);
      const response = await api.get(
        `api/categories/${route.params?.id}?fields=name&populate=expenses,category`
      );
      // console.log(response.data?.data)
      setExpenses(response.data?.data?.attributes?.expenses?.data);
    }
    loadExpenses();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={expenses}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ExpenseItem data={item} cotacoes={cotacao} moeda={route.params?.title} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#fff",
  },
});
