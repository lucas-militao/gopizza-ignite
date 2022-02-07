import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Container, Header, Title, DeleteLabel } from "./styles";

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack />

        <Title>Cadastrar</Title>

        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>

      <Photo uri="https://github.com/lucas-militao.png"/>
    </Container>
  )
}