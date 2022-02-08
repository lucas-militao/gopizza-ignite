import React, { useState } from "react";
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Container, Header, Title, DeleteLabel, Upload, PickImageButton } from "./styles";
import { InputPrice } from "@components/InputPrice";

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

        <InputPrice size="P"/>
        <InputPrice size="M"/>
        <InputPrice size="G"/>
      </GestureHandlerRootView>
    </Container>
  )
}