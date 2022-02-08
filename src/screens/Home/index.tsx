import React from "react";
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemsNumber, Title } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import happyEmoji from '@assets/happy.png';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { SearchBar } from "@components/SearchBar";

export function Home() {
  const { COLORS } = useTheme();

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
      </GestureHandlerRootView>
    </Container>
  )
}