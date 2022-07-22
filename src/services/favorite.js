import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "./api";
import axios from "axios";

let coins = [
  {
    id: 1,
    code: "",
    coin: "USD-BRL",
    value: 0,
    updateAt: null,
    value_formated: "",
  },
  {
    id: 2,
    code: "",
    coin: "EUR-BRL",
    value: 0,
    updateAt: null,
    value_formated: "",
  },
  {
    id: 3,
    code: "",
    coin: "CAD-BRL",
    value: 0,
    updateAt: null,
    value_formated: "",
  },
  {
    id: 4,
    code: "",
    coin: "MXN-BRL",
    value: 0,
    updateAt: null,
    value_formated: "",
  },
  {
    id: 5,
    code: "",
    coin: "GBP-BRL",
    value: 0,
    updateAt: null,
    value_formated: "",
  },
];

let aux = [
  {
    id: 1,

    coin: "USD-BRL",
  },
  {
    id: 2,

    coin: "EUR-BRL",
  },
  {
    id: 3,

    coin: "CAD-BRL",
  },
  {
    id: 4,

    coin: "MXN-BRL",
  },
  {
    id: 5,

    coin: "GBP-BRL",
  },
];

function upsert(array, item) { // (1)
  const i = array.findIndex(_item => _item.id === item.id);
  if (i > -1) array[i] = item; // (2)
  else array.push(item);
}
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

export async function getCotacao() {
  const data = await AsyncStorage.getItem("@cotacaoAtual");

  const formatMoney = (value) => {
    return parseFloat(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  // console.log("Entrando no data");
  // console.log(data);
  // if (data == null) {
  const formatCoins = coins.map((c) => c.coin).join(",");

  const response = await axios.get(
    `http://economia.awesomeapi.com.br/json/last/${formatCoins}`
  );
  // console.log("response");
  // console.log(response);
  const formatResponse = Object.keys(response.data).map(function (key) {
    return response.data[key];
  });
  // console.log("formatResponse");
  // console.log(formatResponse);

  for (let cc of formatResponse) {
    let formatValue = parseFloat(cc.ask).toFixed(2);

    coins = [
      ...coins.filter((cr) => cr.coin !== cc.code),
      {
        coin: `${cc.code}-${cc.codein}`,
        value: parseFloat(cc.ask),
        value_formated: formatMoney(formatValue),
        updateAt: cc.create_date,
        code: cc.code,
      },
    ];
  }
  
  // console.log("coin 1", coins);
  coins = coins.filter((c) => c.value > 0);
  // coins = coins.map((c) => c)
  // console.log("coins");
  // console.log(coins);
  // alert(coins.length())
  return coins;
  // } else {
  //   return [];
  // }
}

export async function setCotacao(cotacao) {
  await AsyncStorage.setItem("@cotacaoAtual", cotacao);

  const response = await getCotacao();

  return response;
}
