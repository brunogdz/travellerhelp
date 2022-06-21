import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import api from "../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { compareAsc, format } from "date-fns";
import DetailImage from "../../../assets/detail-image.jpg";
import cotacaoCoin from "../../services/cotacaoMoedas";
import cotacaoCoinData from "../../services/cotacaoMoedaDate";


export default function Detail() {
  const route = useRoute();
  const navigation = useNavigation();

  const [post, setPost] = useState({});
  const [moeda, setMoeda] = useState("");
  const [cotacaoAtual, setCotacaoAtual] = useState("");
  const [cotacaoData, setCotacaoData] = useState("");

  useEffect(() => {
    async function getPost() {
      const response = await api.get(
        `api/expenses/${route.params?.id}?populate=category`
      );
      setPost(response.data.data);
      setMoeda(
        response.data?.data?.attributes?.category?.data?.attributes?.name
      );
      let moedaAtual = await cotacaoCoin(
        response.data?.data?.attributes?.category?.data?.attributes?.name
      );
      let dataAtualizacao = await cotacaoCoinData(
        response.data?.data?.attributes?.category?.data?.attributes?.name
      );
      let dataAtualizacaoFormatado = format(new Date(dataAtualizacao), "dd/MM/yyyy");
      setCotacaoAtual(moedaAtual);
      setCotacaoData(dataAtualizacaoFormatado);
    }

    getPost();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image resizeMode="cover" style={styles.image} source={DetailImage} />
      <Text style={styles.title}>{post?.attributes?.title}</Text>
      <Text>{moeda}</Text>
      <Text>
        Cotacao da moeda {moeda} atual: {cotacaoAtual}
      </Text>
      <Text>
        Última atualização: {cotacaoData}
      </Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 230,
  },
});
