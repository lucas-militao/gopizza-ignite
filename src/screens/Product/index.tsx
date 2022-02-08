import React, { useState } from "react";
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Container, Header, Title, DeleteLabel, Upload, PickImageButton, Form, InputGroup, Label, InputGroupHeader, MaxCharacters } from "./styles";
import { InputPrice } from "@components/InputPrice";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

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

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Header>
            <ButtonBack />

            <Title>Cadastrar</Title>

            <TouchableOpacity>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          </Header>

          <Upload>
            <Photo uri={image}/>

            <PickImageButton 
              title="Carregar" 
              type="secondary" 
              onPress={handleImagePicker}
            />
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

            <Button
              title="Cadastrar pizza"
              isLoading={isLoading}
            />

          </Form>
        </GestureHandlerRootView>

      </ScrollView>
    </Container>
  )
}