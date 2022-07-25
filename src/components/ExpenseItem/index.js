import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { compareAsc, format } from "date-fns";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function ExpenseItem({ data, cotacoes, moeda }) {
  // console.log("cotacoes vieram", data?.attributes?.category?.data?.attributes?.name)
  const navigation = useNavigation();
  
 
  function getTheCurrentCotation(name) {
    let a = cotacoes.map((e) => e.find((tes) => tes.code === name));
    if (a) {
      let value = a[0]?.value_formated;
      return value;
    } else {
      return 0.0;
    }
  }

  // console.log()
  let cotacaoAtual = getTheCurrentCotation(
    data?.attributes?.category?.data?.attributes?.name
  );

  
  //  console.log("value of the current value ", value)
  const valorReal = parseFloat(
    Number(data?.attributes?.cotation) * Number(data?.attributes?.description)
  ).toFixed(2);

  const dateFormat = format(new Date(data?.attributes?.date), "dd/MM/yyyy");
  // const year = dateFormat.getFullYear()
  // const month = dateFormat.getMonth()
  // const day = dateFormat.getDate();
  const descriptionFormated = parseFloat(
    Number(data?.attributes?.description)
  ).toFixed(2);
  const cotacaoFormated = parseFloat(
    Number(data?.attributes?.cotation)
  ).toFixed(2);

  
  function handleDetails() {
    navigation.navigate("Detail", { id: data?.id });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleDetails}>
      <Text style={styles.title}>{data?.attributes?.title}</Text>
      <View style={styles.content}>
        <View>
          <Text style={styles.spent}>Valor: $ {descriptionFormated}</Text>
          {moeda && <Text style={styles.coin}>Moeda: {moeda}</Text>}
          {data?.attributes?.category?.data?.attributes?.name && (
            <Text style={styles.coin}>
              Moeda: {data?.attributes?.category?.data?.attributes?.name}
            </Text>
          )}
          <Text style={styles.cotacao}>
            Cotação na compra: R$ {cotacaoFormated}
          </Text>
        </View>
        <View>
          <Text style={styles.date}>{dateFormat}</Text>

          <Text style={{ color: "#969CB2", fontSize: 16 }}>
            Total: <Text style={styles.totalValue}>R$ {valorReal}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 4,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#7038F2",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  spent: {
    fontSize: 20,
    color: "#C7A874",
    fontWeight: "bold",
  },
  coin: {
    fontSize: 14,
    color: "#f3c530",
  },
  cotacao: {
    fontSize: 14,
    color: "#f3c530",
  },
  totalValue: {
    color: "#F29538",
    fontSize: 20,
  },
  date: {
    color: "#969CB2",
    textAlign: "right",
  },
});
