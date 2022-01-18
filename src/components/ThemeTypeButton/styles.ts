import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ThemeTypeButtonProps {
	isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ThemeTypeButtonProps>`
	width: 48%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
	border-style: solid;
	border-color: ${({ theme }) => theme.colors.text};
	border-radius: 5px;
	padding: 16px;
	background-color: ${({ theme, isActive }) =>
		isActive ? theme.colors.text : theme.colors.background};
`;

export const Icon = styled(Feather)<ThemeTypeButtonProps>`
	font-size: ${RFValue(24)}px;
	margin-right: 12px;
	color: ${({ theme, isActive }) =>
		isActive ? theme.colors.title_light : theme.colors.title};
`;

export const Title = styled.Text<ThemeTypeButtonProps>`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme, isActive }) =>
		isActive ? theme.colors.title_light : theme.colors.title};
`;
