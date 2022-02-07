import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";
import { Container, ContainerButton, Load, Title, TypeProps } from "./styles";

type Props = RectButtonProperties & {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
}

export function Button({
  title,
  type = 'primary',
  isLoading = false,
  ...rest
}: Props) {

  return(
    <Container type={type}>
        <ContainerButton
          enabled={!isLoading}
          {...rest}
        >
        { isLoading ? <Load /> : <Title>{title}</Title>}
      </ContainerButton>
    </Container>
  )
}