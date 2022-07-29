import React, { useEffect, useState, useRef } from "react";
import Footer from "../../components/Footer";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import Animation from "../../assets/currency-exchange.json";
import { Picker } from "@react-native-picker/picker";
import cotacaoCoin from "../../services/cotacaoMoedas";

export default function Cotation() {
  const [selectedValue, setSelectedValue] = useState("");
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [valorFinal, setValorFinal] = useState(0)

  async function loadValue() {
    setLoading(true);
    const response = await cotacaoCoin(selectedValue);
    console.log(response);
    setTimeout(() => setLoading(false), 500);
    // setLoading(false);
    
    setValorFinal(parseFloat(value * response).toFixed(2))
  }

  if (loading) {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "#4a567d",
          alignItems: "center",
        //   justifyContent: 'center',
          flex: 1,
        }}
      >
        <LottieView
          source={Animation}
          autoPlay={true}
          loop={true}
          speed={1.5}
          style={{ width: 300, alignSelf: "center" }}
        />
        <Text style={{color: '#fff', fontSize: 25, }}>Carregando</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          backgroundColor: "#4a567d",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* <LottieView
          source={Animation}
          autoPlay={true}
          loop={true}
          speed={1.0}
          style={{ width: 150, alignSelf: "center" }}
        /> */}
        <View style={styles.selectMoeda}>
          <Text style={styles.title}>Selecione sua moeda</Text>
          <Picker
            // ref={pickerRef}
            selectedValue={selectedValue}
            style={{ height: 50 }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
            }}
            placeholder="Selecione a moeda"
          >
            <Picker.Item label="" value={1} />
            <Picker.Item label="USD - Dólar Americano" value={"USD"} />
            <Picker.Item label="EUR - Euro" value={"EUR"} />
            <Picker.Item label="CAD - Dólar Canadense" value={"CAD"} />
            <Picker.Item label="MXN - Peso Mexicano" value={"MXN"} />
            <Picker.Item label="GBP - Libra Esterlina" value={"GBP"} />
            {/* <Picker.Item label="GBP - Libra Esterlina" value={6} /> */}
          </Picker>
        </View>
        <View style={styles.InsertValue}>
          <Text>Digite um valor para converter em (R$)</Text>
          <TextInput
            placeholder="Ex: 150"
            style={styles.input}
            keyboardType="numeric"
            value={value}
            onChangeText={(valor) => setValue(valor)}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={loadValue}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        <View style={styles.ResultValue}>
          <Text style={styles.textoConverter}>{value} {selectedValue}</Text>
          <Text style={[styles.textoConverter, { fontSize: 14, margin: 5 }]}>
            Corresponde a
          </Text>
          <Text style={styles.textoConverter}>R$ {valorFinal}</Text>
        </View>
      </View>
      <View>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a567d",
    alignItems: "center",
  },
  selectMoeda: {
    width: "90%",
    marginTop: 40,
    paddingTop: 10,
    // paddingLeft: 18,
    backgroundColor: "#fff",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  title: {
    marginLeft: 7,
  },
  InsertValue: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    marginTop: 1,
    paddingTop: 10,
    paddingLeft: 7,
  },
  input: {
    width: "100%",
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 10,
  },
  botao: {
    width: "90%",
    backgroundColor: "#3f5cbf",
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },
  ResultValue: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  textoConverter: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
