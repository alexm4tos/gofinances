import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface Props extends TouchableOpacityProps {
	icon: string;
	title: string;
	isActive: boolean;
}

export function ThemeTypeButton({ icon, title, isActive, ...rest }: Props) {
	return (
		<Container isActive={isActive} {...rest}>
			<Icon name={icon} isActive={isActive} />
			<Title isActive={isActive}>{title}</Title>
		</Container>
	);
}
