import React from 'react';
import { ModalProps } from 'react-native';

import { Button } from '../../components/Form/Button';
import { ThemeTypeButton } from '../../components/ThemeTypeButton';

import {
	Modal,
	Container,
	Header,
	Title,
	Content,
	ContentTitle,
	ThemeList,
	Footer,
} from './styles';

import { useThemeSwitch } from '../../hooks/theme';

type Props = ModalProps & {
	closeModal: () => void;
};

export function Settings({ closeModal, ...rest }: Props) {
	const { theme, toggleTheme } = useThemeSwitch();

	function handleToggleTheme(newTheme: string) {
		toggleTheme(newTheme);
	}

	return (
		<Modal {...rest}>
			<Container>
				<Header>
					<Title>Configurações</Title>
				</Header>

				<Content>
					<ContentTitle>Tema</ContentTitle>
					<ThemeList>
						<ThemeTypeButton
							icon="sun"
							title="Claro"
							onPress={() => handleToggleTheme('light')}
							isActive={theme === 'light'}
						/>
						<ThemeTypeButton
							icon="moon"
							title="Escuro"
							onPress={() => handleToggleTheme('dark')}
							isActive={theme === 'dark'}
						/>
					</ThemeList>
				</Content>

				<Footer>
					<Button title="Salvar" onPress={closeModal} />
				</Footer>
			</Container>
		</Modal>
	);
}
