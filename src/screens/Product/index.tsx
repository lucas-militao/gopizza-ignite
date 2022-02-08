import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Container, Header, Title, DeleteLabel, Upload, PickImageButton } from "./styles";

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Header>
          <ButtonBack />

          <Title>Cadastrar</Title>

          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri=""/>

          <PickImageButton title="Carregar" type="secondary" />
        </Upload>
      </GestureHandlerRootView>
    </Container>
  )
}