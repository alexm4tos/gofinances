import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
	type: 'in' | 'out';
}

interface ContainerProps {
	isActive: boolean;
	type: 'in' | 'out';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
	width: 48%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
	border-style: solid;
	border-color: ${({ theme }) => theme.colors.text};
	border-radius: 5px;
	padding: 16px;
	${({ isActive, type }) =>
		isActive &&
		type === 'in' &&
		css`
			background-color: ${({ theme }) => theme.colors.success_light};
		`};
	${({ isActive, type }) =>
		isActive &&
		type === 'out' &&
		css`
			background-color: ${({ theme }) => theme.colors.attention_light};
		`};
`;

export const Icon = styled(Feather)<IconProps>`
	font-size: ${RFValue(24)}px;
	margin-right: 12px;
	color: ${({ type, theme }) =>
		type === 'in' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.title};
`;
