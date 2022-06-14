import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ValorEmReal from "../../util";
import { compareAsc, format } from "date-fns";

export default function ExpenseItem({ data }) {
  const valorReal =
    Number(data?.attributes?.category?.data?.attributes?.value) *
    Number(data?.attributes?.description);

  const dateFormat = format(new Date(data?.attributes?.date), "dd/MM/yyyy");
  // const year = dateFormat.getFullYear()
  // const month = dateFormat.getMonth()
  // const day = dateFormat.getDate();
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{data?.attributes?.title}</Text>
      <View style={styles.content}>
        <View>
          <Text style={styles.spent}>
            Valor: $ {data?.attributes?.description}
          </Text>
          <Text style={styles.coin}>
            Moeda: {data?.attributes?.category?.data?.attributes?.name}
          </Text>
          <Text style={styles.cotacao}>
            Cotação: R$ {data?.attributes?.category?.data?.attributes?.value}
          </Text>
        </View>
        <View>
        <Text style={styles.date}>{dateFormat}</Text>
          
          <Text style={{color: '#969CB2', fontSize: 16}}>Total: <Text style={styles.totalValue}>R$ {valorReal}</Text></Text>
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
    backgroundColor: '#7038F2'
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
    fontSize: 20

  },
  date: {
      color: '#969CB2',
      textAlign: 'right'
  },
});
