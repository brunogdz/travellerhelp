import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "./api";

// Buscar moeda favoritada
export async function getFavorite() {
  const data = await AsyncStorage.getItem("@favCoin");

  if (data !== null) {
    const response = await api.get(
      `api/categories/${data}?fileds=name&populate=expenses,expenses.cover`
    );

    return response.data?.data?.attributes?.expenses?.data;
  } else {
    return [];
  }
}

// Favoritar uma moeda
export async function setFavorite(category) {
  await AsyncStorage.setItem("@favCoin", String(category));

  const response = await getFavorite();

  return response;
}
