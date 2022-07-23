import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import ExpenseItem from "../../components/ExpenseItem";
import { getCotacao } from "../../services/favorite";
// import { FlatList } from "react-native-web";

export default function Search() {
  const [input, setInput] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [cotacao, setCotacao] = useState([]);
  const [empty, setEmpty] = useState(false);

  async function handleSearchPost() {
    if (input === "") {
      alert("Digite algo para assim poder buscar");
      return;
    }

    const test = await getCotacao();
    // console.log
    // console.log("test", test)
    // alert(test.length)
    setCotacao([test]);

    const response = await api.get(
    //   `api/expenses?filters[title][$containsi]=${input}&populate=cover`
    `api/expenses?filters[title][$containsi]=${input}&populate=category`
    );

    if (response.data?.data.length === 0) {
      setEmpty(true);
      setExpenses([]);
      return;
    }

    setExpenses(response.data?.data);
    setEmpty(false)
    setInput("");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          style={styles.input}
          placeholder="O que está buscando?"
        />

        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={handleSearchPost}
        >
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      {empty && (
        <View>
          <Text style={styles.emptyResult}>
            Infelizmente não foi encontrado nenhum gasto com esse título
          </Text>
        </View>
      )}

      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={expenses}
        keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ExpenseItem data={item} cotacoes={cotacao} />
          )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 18,
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: "85%",
    backgroundColor: "#c4c4c4",
    height: 45,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  buttonSearch: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c4c4",
    height: 45,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  emptyResult: {
    textAlign: "center",
    fontSize: 16,
    padding: 15
  },
});
