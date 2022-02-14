import { ButtonBack } from "@components/ButtonBack";
import { RadionButton } from "@components/RadioButton";
import React, { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import { PIZZA_TYPES } from "@utils/pizzaTypes";
import { Container, ContentScroll, Form, FormRow, Header, InputGroup, Label, Photo, Price, Sizes, Title } from "./styles";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { OrderNavigationProps } from "src/@types/navigation";
import { ProductProps } from "@components/ProductCard";

type PizzaResponse = ProductProps & {
  price_sizes: {
    [key: string]: number;
  }
};

export function Order() {
  const [size, setSize] = useState('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if(id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => setPizza(response.data() as PizzaResponse))
        .catch(() => Alert.alert('Pedido', 'Não foi possível carregar produto!'));
    }
  }, [])

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
          
          <Photo source={{ uri: pizza.photo_url }}/>

          <Form>
            <Title>{pizza.name}</Title>
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