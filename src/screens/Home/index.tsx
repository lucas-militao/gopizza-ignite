import React, { useEffect } from "react";
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemsNumber, Title } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import happyEmoji from '@assets/happy.png';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Alert, TouchableOpacity } from "react-native";
import { SearchBar } from "@components/SearchBar";
import { ProductCard, ProductProps } from "@components/ProductCard";
import firestore from '@react-native-firebase/firestore';

export function Home() {
  const { COLORS } = useTheme();

  function fetchPizza(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[];

        console.log(data);
      })
      .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta!'));
  }

  useEffect(() => {
    fetchPizza('');
  }, []);

  return(
    <Container>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Header>
          <Greeting>
            <GreetingEmoji source={happyEmoji}/>
            <GreetingText>Olá, Admin</GreetingText>
          </Greeting>

          <TouchableOpacity>
            <MaterialIcons name="logout" color={ COLORS.TITLE } size={24}/>
          </TouchableOpacity>
        </Header>

        <SearchBar
          onClear={() => {}}
          onSearch={() => {}}
        />

        <MenuHeader>
          <Title>Cardápio</Title>
          <MenuItemsNumber>10 pizzas</MenuItemsNumber>
        </MenuHeader>

        <ProductCard data={{id: '1', name: 'Pizza', description: 'qualquer coisa!', photo_url: 'https://github.com/lucas-militao.png'}}/>
        
      </GestureHandlerRootView>
    </Container>
  )
}