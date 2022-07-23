import React, { useEffect, useState, useRef } from "react";
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
} from "react-native";
import axios from "axios";
import FundoRegister from "../../../assets/register.jpg";
import { Picker } from "@react-native-picker/picker";

export default function EditExpense({ route, navigation }) {
  const { idEdit, titleEdit, descriptionEdit, dateEdit, categoryEdit } =
    route.params;
  const [modifiedData, setModifiedData] = useState({
    data: {
      title: "",
      description: descriptionEdit,
      date: dateEdit,
      cotation: 6.23,
      category: [categoryEdit],
    },
  });
  const [title, setTitle] = useState(titleEdit);
  const [description, setDescription] = useState(JSON.stringify(descriptionEdit));
  const [selectedValue, setSelectedValue] = useState(categoryEdit);

  async function test() {
    modifiedData.data.category = [selectedValue];
    modifiedData.data.title = title;
    if (selectedValue == 1) {
      const response = await axios.get(
        `http://economia.awesomeapi.com.br/json/last/USD`
      );
      modifiedData.data.cotation = response.data["USDBRL"].ask;
    }
    if (selectedValue == 2) {
      const response = await axios.get(
        `http://economia.awesomeapi.com.br/json/last/EUR`
      );
      modifiedData.data.cotation = response.data["EURBRL"].ask;
    }
    if (selectedValue == 3) {
      const response = await axios.get(
        `http://economia.awesomeapi.com.br/json/last/CAD`
      );
      modifiedData.data.cotation = response.data["CADBRL"].ask;
    }
    if (selectedValue == 4) {
      const response = await axios.get(
        `http://economia.awesomeapi.com.br/json/last/MXN`
      );
      modifiedData.data.cotation = response.data["MXNBRL"].ask;
    }
    if (selectedValue == 5) {
      const response = await axios.get(
        `http://economia.awesomeapi.com.br/json/last/GBP`
      );
      modifiedData.data.cotation = parseFloat(
        response.data["GBPBRL"].ask
      ).toFixed(2);
    }
    modifiedData.data.description = parseFloat(description).toFixed(2);

    await registerExpense();
  }

  async function registerExpense() {
    try {
      const response = await axios.put(
        `http://192.168.56.1:8082/api/expenses/${idEdit}`,
        modifiedData
      );
      // const response = await axios({method: 'post', url: 'http://192.168.56.1:8082/api/expenses', modifiedData);
      console.log("Response of register: ", response);
    } catch (error) {
      alert(error);
    }
  }
  
  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.image}
        source={FundoRegister}
        imageStyle={{ opacity: 0.3 }}
      >
        <View>
          <Text style={styles.title}>
            Registre o seu gasto{"\n"} e selecione a moeda.
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            placeholder="Titulo do gasto"
            onChangeText={setTitle}
            value={title}
            style={styles.titleInput}
            multiline={true}
            maxLength={32}
          />
          <View>
            <Picker
              // ref={pickerRef}
              selectedValue={selectedValue}
              style={{ height: 50, width: 230 }}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
              }}
            >
              <Picker.Item label="Selecione a moeda" value={1} />
              <Picker.Item label="USD - Dólar Americano" value={1} />
              <Picker.Item label="EUR - Euro" value={2} />
              <Picker.Item label="CAD - Dólar Canadense" value={3} />
              <Picker.Item label="MXN - Peso Mexicano" value={4} />
              <Picker.Item label="GBP - Libra Esterlina" value={5} />
              {/* <Picker.Item label="GBP - Libra Esterlina" value={6} /> */}
            </Picker>
          </View>
          {/* {selectedValue && ( */}
          <TextInput
            placeholder="Custo"
            onChangeText={(text) => setDescription(text)}
            value={description}
            keyboardType="number-pad"
            style={styles.titleInput}
          />
          {/* )} */}
          {/* <View>
            <Text>{selectedValue}</Text>
          </View> */}
          <TouchableOpacity style={styles.buttonRegister} onPress={test}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
        {/* <Button title="Cadastrar" onPress={registerExpense}/> */}
      </ImageBackground>
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
    height: "100%",
  },
  title: {
    fontSize: 28,
    color: "#000",
    textAlign: "center",
    marginTop: 24,
  },
  buttonRegister: {
    width: 364,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    backgroundColor: "#00875F",
  },
  buttonText: {
    color: "#e1ede6",
  },
  titleInput: {
    width: 364,
    padding: 10,
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "#FFF",
  },
  valueInput: {
    width: 364,
    height: 56,
    backgroundColor: "#FFF",
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 40,
  },
});
