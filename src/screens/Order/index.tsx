import { ButtonBack } from "@components/ButtonBack";
import { RadionButton } from "@components/RadioButton";
import React, { useState } from "react";
import { Platform } from "react-native";
import { PIZZA_TYPES } from "@utils/pizzaTypes";
import { Container, ContentScroll, Form, FormRow, Header, InputGroup, Label, Photo, Price, Sizes, Title } from "./styles";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export function Order() {
  const [size, setSize] = useState('');
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return(
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ContentScroll>

          <Header>
            <ButtonBack
              onPress={handleGoBack}
              style={{ marginBottom: 108 }}
            />
          </Header>
          
          <Photo source={{ uri: 'http://github.com/lucas-militao.png' }}/>

          <Form>
            <Title>Nome da pizza</Title>
            <Label>Selecione um tamanho</Label>
            <Sizes>
              {
                PIZZA_TYPES.map(item => (
                  <RadionButton
                    key={item.id}
                    title={item.name}
                    selected={size === item.id}
                    onPress={() => setSize(item.id)}
                  />
                ))
              }
            </Sizes>

            <FormRow>
              <InputGroup>
                <Label>Número da mesa</Label>
                <Input keyboardType="numeric"/>
              </InputGroup>

              <InputGroup>
                <Label>Quantidade</Label>
                <Input keyboardType="numeric"/>
              </InputGroup>
            </FormRow>

            <Price>Valor de R$ 00,00</Price>

            <Button
              title="Confirmar pedido"
            />
          </Form>
        </ContentScroll>
      </GestureHandlerRootView>
    </Container>
  )
}