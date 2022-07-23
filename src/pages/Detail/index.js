import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import api from "../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { compareAsc, format } from "date-fns";
import DetailImage from "../../../assets/detail-image.jpg";
import cotacaoCoin from "../../services/cotacaoMoedas";
import cotacaoCoinData from "../../services/cotacaoMoedaDate";

export default function Detail({ id, title }) {
  const route = useRoute();
  const navigation = useNavigation();

  const [post, setPost] = useState({});
  const [moeda, setMoeda] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [cotacaoData, setCotacaoData] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    async function getPost() {
      const response = await api.get(
        `api/expenses/${route.params?.id}?populate=category`
      );
      setPost(response.data.data);
      let cotacao = parseFloat(
        response.data?.data?.attributes?.cotation
      ).toFixed(2);
      setMoeda(cotacao);

      let gasto = parseFloat(
        response.data?.data?.attributes?.description
      ).toFixed(2);

      const dateFormat = format(
        new Date(response.data?.data?.attributes?.date),
        "dd/MM/yyyy"
      );
      setCotacaoData(dateFormat);
      let total = parseFloat(cotacao * gasto).toFixed(2);
      setValorTotal(total);
    }

    getPost();
  }, []);
  async function deleteGasto() {
    try {
      const result = await axios.delete(
        `http://192.168.56.1:8082/api/expenses/${post?.id}`
      );
      // const response = await axios({method: 'post', url: 'http://192.168.56.1:8082/api/expenses', modifiedData);
      console.log("Response of register: ", result);
      navigation.navigate("Home");
    } catch (error) {
      alert(error);
    }
  }

  function handleNavigateEdit() {
    navigation.navigate("EditExpense", {
      idEdit: post?.id,
      titleEdit: post?.attributes?.title,
      descriptionEdit: post?.attributes?.description,
      dateEdit: post?.attributes?.date,
      categoryEdit: post?.attributes?.category?.data?.id,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image resizeMode="cover" style={styles.image} source={DetailImage} />
      <View>
        <View style={styles.titleContent}>
          <Text style={styles.title}>{post?.attributes?.title}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.textContent}>
            Compra realizada em: {cotacaoData}
          </Text>
          <Text style={styles.textContent}>
            Cotacao da moeda na compra: R${moeda}
          </Text>
          <Text style={styles.textContent}>Total Gasto: R${valorTotal}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonEdit} onPress={handleNavigateEdit}>
              <Text style={{ color: "#fff" }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => setShowConfirmation(true)}
            >
              <Text style={{ color: "#fff" }}>Excluir</Text>
            </TouchableOpacity>
          </View>
          {showConfirmation && (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 10,
                  color: "#FBA94C",
                }}
              >
                Certeza que deseja excluir?
              </Text>
              <View style={styles.buttonsConfirm}>
                <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => setShowConfirmation(false)}
                >
                  <Text style={{ color: "#fff" }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonConfirm}
                  onPress={deleteGasto}
                >
                  <Text style={{ color: "#fff" }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
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
  titleContent: {
    backgroundColor: "#0e1630",
    height: 70,
    alignItems: "center",
  },
  textContent: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "700",
    fontSize: 32,
    color: "#fff",
  },
  content: {
    backgroundColor: "#131d3f",
    height: "100%",
    padding: 20,
  },
  buttonsConfirm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonEdit: {
    height: 35,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FBA94C",
  },
  buttonDelete: {
    height: 35,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "red",
  },
  buttonCancel: {
    height: 35,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "red",
    borderColor: "red",
  },
  buttonConfirm: {
    height: 35,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "green",
  },
});
