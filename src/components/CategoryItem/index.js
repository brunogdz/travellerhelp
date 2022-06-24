import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import getTheValue from "../../util";

import { useNavigation } from "@react-navigation/native";

export default function CategoryItem({ data, favorite, cotacoes }) {
  const navigation = useNavigation();
  // console.log("data no category",data)

  function handleNavigate() {
    navigation.navigate("CategoryCoin", {
      id: data.id,
      title: data?.attributes?.name,
    });
  }

  function getTheCurrentCotation(name) {
    let a = cotacoes.map((e) => e.find((tes) => tes.code === name));
    if (a) {
      let value = a[0]?.value_formated;
      return value;
    } else {
      return 0.0;
    }
  }

  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.7}
      onPress={handleNavigate}
      onLongPress={favorite}
    >
      <Text style={style.name}>{data?.attributes?.name}</Text>
      <Text style={style.value}>
        {getTheCurrentCotation(data?.attributes?.name)}
      </Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#F3C530",
    marginLeft: 8,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    width: 100,
  },
  name: {
    color: "#FFF",
    fontSize: 16,
  },
  value: {
    color: "#FFF",
    fontSize: 14,
  },
});
