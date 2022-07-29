import React, {useState} from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import AppIntroSlider from "react-native-app-intro-slider";
import { SIZES, COLORS } from "./src/constants/theme";

const slides = [
  {
    id: 1,
    title: 'Traveller Help',
    description: 'App que você consegue cadastrar os seus gastos em outras moedas, e sabendo o quanto você gastou em real.',
    image: require('./src/assets/travellerLogo2.png')
  },
  {
    id: 2,
    title: 'Favoritando uma moeda',
    description: 'Ao clicar você acessa os gastos referentes a moeda em questão, mas se pressionar por mais tempo você irá favoritar e conseguirá ver na tela principal',
    image: require('./src/assets/favoriteCoin.png')
  },
  {
    id: 3,
    title: 'Atualizar / Refresh',
    description: 'Se ir nos Ultimos gastos e arrastar para baixo, você atualiza e valida caso tenha alguma alteração que ainda não exibiu ainda a diferença.',
    image: require('./src/assets/refresh.png')
  },
]

export default function App() {
  const [showHome, setShowHome] = useState(false);

  const buttonLabel = (label) => {
    return(
      <View style={{
        padding: 12,
      }}>
        <Text style={{
          color: COLORS.title,
          fontWeight: '700',
          fontSize: SIZES.h4
        }}>
          {label}
        </Text>
      </View>
    )
  }
  if(!showHome){
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View style={{
              flex: 1,
              alignItems: 'center',
              padding: 15,
              paddingTop: 100,
              backgroundColor: COLORS.primary
            }}>
              <Image 
              source={item.image}
              style={{
                width: SIZES.width - 80,
                height: 400 
              }}
                resizeMode="contain"
              />
              <Text style={{
                fontWeight: 'bold',
                color: COLORS.title,
                fontSize: SIZES.h1
              }}>
                {item.title}
              </Text>
              <Text style={{
                textAlign: 'center',
                paddingTop: 5,
                color: COLORS.title
              }}>
                {item.description}
              </Text>
            </View>
          )
        }}
        activeDotStyle={{
          backgroundColor: COLORS.title,
          width: 30
        }}
        showSkipButton
        renderNextButton={() => buttonLabel("Next")}
        renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Done")}
        onDone={() => {
          setShowHome(true)
        }}
      />
    )
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#131D3F" barStyle="light-content" showHideTransition="true" />
      <Routes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
