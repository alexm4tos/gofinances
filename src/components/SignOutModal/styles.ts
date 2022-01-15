import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps {
	type: string;
}

export const Modal = styled.Modal.attrs({
	animationType: 'fade',
	transparent: true,
	statusBarTranslucent: true,
})``;

export const Overlay = styled.View`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.6);
`;

export const Container = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	height: ${RFValue(150)}px;
	background-color: ${({ theme }) => theme.colors.primary};
`;

export const Header = styled.View`
	align-items: center;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.shape};
`;

export const Alt = styled.Text`
	color: ${({ theme }) => theme.colors.secondary};
`;

export const ButtonList = styled.View`
	margin-top: 27px;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	padding: 0 24px;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
	width: 48%;
	height: 48px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme, type }) =>
		type === 'yes' ? theme.colors.attention : theme.colors.primary};
	border: 1px solid
		${({ theme, type }) =>
			type === 'yes' ? theme.colors.attention : theme.colors.shape};
`;

export const ButtonTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.shape};
`;
