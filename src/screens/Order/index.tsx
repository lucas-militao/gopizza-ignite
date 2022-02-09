import { ButtonBack } from "@components/ButtonBack";
import React from "react";
import { Platform } from "react-native";
import { Container, Header, Photo } from "./styles";

export function Order() {

  return(
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack
          onPress={() => {}}
          style={{ marginBottom: 108 }}
        />
      </Header>
      
      <Photo source={{ uri: 'http://github.com/lucas-militao.png' }}/>
    </Container>
  )
}