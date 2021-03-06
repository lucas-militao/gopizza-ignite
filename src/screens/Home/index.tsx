import React, { useState, useCallback } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import happyEmoji from '@assets/happy.png';
import { ProductCard, ProductProps } from '@components/ProductCard';
import { SearchBar } from '@components/SearchBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  NewProductButton,
  Title,
} from './styles';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');

  const { user, signOut } = useAuth();

  const { COLORS } = useTheme();
  const navigation = useNavigation();

  function fetchPizza(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert('Consulta', 'Não foi possível realizar a consulta!'),
      );
  }

  async function handleSignOut() {
    await signOut();
  }

  function handleSearch() {
    fetchPizza(search);
  }

  function handelSearchClear() {
    fetchPizza('');
    setSearch('');
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'product' : 'order';
    navigation.navigate(route, { id });
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizza('');
    }, []),
  );

  return (
    <Container>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Header>
          <Greeting>
            <GreetingEmoji source={happyEmoji} />
            <GreetingText>Olá, Admin</GreetingText>
          </Greeting>

          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
          </TouchableOpacity>
        </Header>

        <SearchBar
          onChangeText={setSearch}
          value={search}
          onClear={handelSearchClear}
          onSearch={handleSearch}
        />

        <MenuHeader>
          <Title>Cardápio</Title>
          <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
        </MenuHeader>

        <FlatList
          data={pizzas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard data={item} onPress={() => handleOpen(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 125,
            marginHorizontal: 24,
          }}
        />

        {user?.isAdmin && (
          <NewProductButton
            title="Cadastrar Pizza"
            type="secondary"
            onPress={handleAdd}
          />
        )}
      </GestureHandlerRootView>
    </Container>
  );
}
