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
              <Input />
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
              />
            </InputGroup>

            <InputGroup>
              <Label>Tamanhos e preços</Label>

              <InputPrice size="P"/>
              <InputPrice size="M"/>
              <InputPrice size="G"/>
            </InputGroup>

            <Button
              title="Cadastrar pizza"
            />

          </Form>
        </GestureHandlerRootView>

      </ScrollView>
    </Container>
  )
}