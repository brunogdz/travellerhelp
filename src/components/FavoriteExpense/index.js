import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width: WIDTH } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

export default function FavoriteExpense({ data }) {

    const navigation = useNavigation();

    function handleNavigate(){
      navigation.navigate("Detail", {id: data.id})
    }

  return (
    <TouchableOpacity style={styles.container}
    onPress={handleNavigate}
    >
      <View style={styles.cover}>
        <Text style={styles.title} numberOfLines={1}>{data?.attributes?.title}</Text>
        <Text style={styles.description}>$ {data?.attributes?.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  cover: {
    borderRadius: 4,
    width: WIDTH - 60,
    height: 50,
    paddingLeft: 12,
    // justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#232630",
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: '#121212',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 8,
    maxWidth: WIDTH - 120
  },
  description: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      position: 'absolute',
      right: 0,
      marginRight: 12,
      textShadowColor: '#121212'
  }
});
