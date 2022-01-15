import React, { useState } from 'react';
import { Alert, Platform, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
	Container,
	Header,
	TitleWrapper,
	Title,
	SignInTitle,
	Footer,
	FooterWrapper,
} from './styles';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

export function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const { signInWithGoogle, signInWithApple } = useAuth();
	const theme = useTheme();

	async function handleSignInWithGoogle() {
		try {
			setIsLoading(true);
			return await signInWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Erro', 'Não foi possível conectar a conta Google');
			setIsLoading(false);
		}
	}

	async function handleSignInWithApple() {
		try {
			setIsLoading(true);
			return await signInWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Erro', 'Não foi possível conectar a conta Apple');
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<Header>
				<TitleWrapper>
					<LogoSvg width={RFValue(120)} height={RFValue(68)} />

					<Title>
						Controle suas{'\n'}finanças de forma{'\n'}muito simples
					</Title>
				</TitleWrapper>

				<SignInTitle>Faça seu login com{'\n'}uma das contas abaixo</SignInTitle>
			</Header>

			<Footer>
				<FooterWrapper>
					<SignInSocialButton
						onPress={handleSignInWithGoogle}
						title="Entrar com Google"
						svg={GoogleSvg}
					/>

					{Platform.OS === 'ios' && (
						<SignInSocialButton
							onPress={handleSignInWithApple}
							title="Entrar com Apple"
							svg={AppleSvg}
						/>
					)}
				</FooterWrapper>

				{isLoading && (
					<ActivityIndicator
						color={theme.colors.shape}
						size="large"
						style={{ marginTop: 18 }}
					/>
				)}
			</Footer>
		</Container>
	);
}
