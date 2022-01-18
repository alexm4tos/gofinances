import React from 'react';
import { ModalProps, TouchableWithoutFeedback } from 'react-native';

import {
	Modal,
	Overlay,
	Container,
	Header,
	Title,
	Content,
	ContentText,
	Footer,
	Button,
	ButtonTitle,
} from './styles';

type Props = ModalProps & {
	title: string;
	text?: string;
	button: () => void;
	buttonText?: string;
};

export function AlertModal({
	title,
	text,
	button,
	buttonText,
	...rest
}: Props) {
	return (
		<Modal animationType="fade" transparent statusBarTranslucent {...rest}>
			<TouchableWithoutFeedback onPress={button}>
				<Overlay>
					<Container>
						<Header>
							<Title>{title}</Title>
						</Header>

						{text && (
							<Content>
								<ContentText>{text}</ContentText>
							</Content>
						)}

						<Footer>
							<Button onPress={button}>
								<ButtonTitle>{buttonText || 'Ok'}</ButtonTitle>
							</Button>
						</Footer>
					</Container>
				</Overlay>
			</TouchableWithoutFeedback>
		</Modal>
	);
}
