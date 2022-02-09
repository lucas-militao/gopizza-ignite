import { ButtonBack } from "@components/ButtonBack";
import { RadionButton } from "@components/RadioButton";
import React, { useState } from "react";
import { Platform } from "react-native";
import { PIZZA_TYPES } from "@utils/pizzaTypes";
import { Container, Header, Photo, Sizes } from "./styles";

export function Order() {
  const [size, setSize] = useState('');

  return(
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack
          onPress={() => {}}
          style={{ marginBottom: 108 }}
        />
      </Header>
      
      <Photo source={{ uri: 'http://github.com/lucas-militao.png' }}/>

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
    </Container>
  )
}