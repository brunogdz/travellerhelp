import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0E1630" barStyle="light-content" showHideTransition="true" />
      <Routes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
