import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Modal = styled.Modal``;

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;
	background-color: ${({ theme }) => theme.colors.primary};
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 19px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: 18px;
	color: ${({ theme }) => theme.colors.title_light};
`;

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;

export const ThemeList = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: 8px;
	margin-bottom: 16px;
`;

export const Content = styled.View`
	flex: 1;
	padding: 24px;
`;

export const ContentTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: 18px;
	color: ${({ theme }) => theme.colors.title};
`;
