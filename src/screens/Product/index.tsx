import React, { useEffect, useState } from "react";
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { Alert, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Container, Header, Title, DeleteLabel, Upload, PickImageButton, Form, InputGroup, Label, InputGroupHeader, MaxCharacters } from "./styles";
import { InputPrice } from "@components/InputPrice";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductNavigationProps } from "src/@types/navigation";
import { ProductProps } from "@components/ProductCard";

type PizzaResponse = ProductProps & {
  photo_path: string;
  price_sizes: {
    p: string;
    m: string;
    g: string;
  }
}

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photo_path, setPhoto_Path] = useState('');
  
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;
  

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza!');
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza!');
    }

    if (!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza!');
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza!');
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLocaleLowerCase().trim(),
        description,
        price_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso!'))
      .catch(() => Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.'));

    setIsLoading(false);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => {
          const product = response.data() as PizzaResponse;

          setName(product.name);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.price_sizes.p);
          setPriceSizeM(product.price_sizes.m);
          setPriceSizeG(product.price_sizes.g);
          setPhoto_Path(product.photo_path);
        })
    }
  }, [id])

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Header>
            <ButtonBack onPress={handleGoBack} />

            <Title>Cadastrar</Title>

            {
              !id ?
              <TouchableOpacity>
                <DeleteLabel>Deletar</DeleteLabel>
              </TouchableOpacity>
              : <View style={{ width: 20 }}/>
            }
          </Header>

          <Upload>
            <Photo uri={image}/>

            {
              !id &&
              <PickImageButton 
                title="Carregar" 
                type="secondary" 
                onPress={handleImagePicker}
              />
            }
          </Upload>

          <Form>
            <InputGroup>
              <Label>Nome</Label>
              <Input 
                onChangeText={setName}
                value={name}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupHeader>
                <Label>Descrição</Label>
                <MaxCharacters>0 de 60 caracteres</MaxCharacters>
              </InputGroupHeader>

              <Input
                multiline
                maxLength={60}
                style={{ height: 80 }}
                onChangeText={setDescription}
                value={description}
              />
            </InputGroup>

            <InputGroup>
              <Label>Tamanhos e preços</Label>

              <InputPrice size="P" 
                onChangeText={setPriceSizeP} 
                value={priceSizeP} />
              <InputPrice 
                size="M" 
                onChangeText={setPriceSizeM} 
                value={priceSizeM} />
              <InputPrice 
                size="G" 
                onChangeText={setPriceSizeG} 
                value={priceSizeG} />
            </InputGroup>

            {
              !id &&
              <Button
                title="Cadastrar Pizza"
                isLoading={isLoading}
                onPress={handleAdd}
              />
            }

          </Form>
        </GestureHandlerRootView>

      </ScrollView>
    </Container>
  )
}