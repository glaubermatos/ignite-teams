import { TouchableOpacity } from "react-native";
import { css, styled } from "styled-components/native";

export type FilterStyleProps = {
    isActive?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
    height: 38px;
    width: 70px;
    border-radius: 4px;

    margin-right: 12px;

    ${({theme, isActive}) => isActive && css`
        border: 1px solid ${theme.COLORS.GREEN_700};
    `}

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    text-transform: uppercase;

    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.WHITE};
    `}      
`;