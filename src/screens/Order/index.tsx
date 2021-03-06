import React, { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OrderNavigationProps } from 'src/@types/navigation';

import { Button } from '@components/Button';
import { ButtonBack } from '@components/ButtonBack';
import { Input } from '@components/Input';
import { ProductProps } from '@components/ProductCard';
import { RadionButton } from '@components/RadioButton';
import { useAuth } from '@hooks/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PIZZA_TYPES } from '@utils/pizzaTypes';

import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from './styles';

type PizzaResponse = ProductProps & {
  price_sizes: {
    [key: string]: number;
  };
};

export function Order() {
  const [size, setSize] = useState('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState('');
  const [sendingOrder, setSendingOrder] = useState(false);

  const { user } = useAuth();

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const amount = size ? pizza.price_sizes[size] * quantity : '00,00';

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOrder() {
    if (!size) {
      Alert.alert('Pedido', 'Selecione o tamanho da pizza!');
      return;
    }

    if (!tableNumber) {
      Alert.alert('Pedido', 'Informe o número da mesa!');
      return;
    }

    if (!quantity) {
      Alert.alert('Pedido', 'Informe a quantidade');
      return;
    }

    setSendingOrder(true);

    firestore()
      .collection('orders')
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        image: pizza.photo_url,
      })
      .then(() => navigation.navigate('home'))
      .catch(() => {
        Alert.alert('Pedido', 'Não foi possível realizar o pedido!');
        setSendingOrder(false);
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then((response) => setPizza(response.data() as PizzaResponse))
        .catch(() =>
          Alert.alert('Pedido', 'Não foi possível carregar produto!'),
        );
    }
  }, []);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ContentScroll>
          <Header>
            <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
          </Header>

          <Photo source={{ uri: pizza.photo_url }} />

          <Form>
            <Title>{pizza.name}</Title>
            <Label>Selecione um tamanho</Label>
            <Sizes>
              {PIZZA_TYPES.map((item) => (
                <RadionButton
                  key={item.id}
                  title={item.name}
                  selected={size === item.id}
                  onPress={() => setSize(item.id)}
                />
              ))}
            </Sizes>

            <FormRow>
              <InputGroup>
                <Label>Número da mesa</Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={setTableNumber}
                  value={tableNumber}
                />
              </InputGroup>

              <InputGroup>
                <Label>Quantidade</Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={(value) => setQuantity(parseInt(value, 10))}
                />
              </InputGroup>
            </FormRow>

            <Price>Valor de R$ {amount}</Price>

            <Button
              title="Confirmar pedido"
              onPress={handleOrder}
              isLoading={sendingOrder}
            />
          </Form>
        </ContentScroll>
      </GestureHandlerRootView>
    </Container>
  );
}
