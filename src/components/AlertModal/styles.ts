import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Modal = styled.Modal``;

export const Overlay = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.View`
	padding: 14px;
	width: 80%;
	height: auto;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 10px;
`;

export const Header = styled.View`
	align-items: center;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.title_light};
`;

export const Content = styled.View`
	margin: 12px 0;
`;

export const ContentText = styled.Text`
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.title_light};
	text-align: center;
`;

export const Footer = styled.View`
	align-items: center;
`;

export const Button = styled.TouchableOpacity.attrs({
	activeOpacity: 0.8,
})`
	width: 25%;
	height: 48px;
	margin-top: 12px;
	align-items: center;
	border-radius: 8px;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ButtonTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.title_light};
`;
