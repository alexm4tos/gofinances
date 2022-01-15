import React from 'react';
import { ModalProps, TouchableWithoutFeedback } from 'react-native';

import {
	Modal,
	Overlay,
	Container,
	Header,
	Title,
	Alt,
	ButtonList,
	Button,
	ButtonTitle,
} from './styles';

type Props = ModalProps & {
	buttonNo: () => void;
	buttonYes: () => void;
};

export function SignOutModal({ buttonNo, buttonYes, ...rest }: Props) {
	return (
		<Modal {...rest}>
			<TouchableWithoutFeedback onPress={buttonNo}>
				<Overlay>
					<Container>
						<Header>
							<Title>
								Desejar sair do <Alt>gofinances</Alt>?
							</Title>
						</Header>

						<ButtonList>
							<Button onPress={buttonNo} type="no">
								<ButtonTitle>Não</ButtonTitle>
							</Button>

							<Button onPress={buttonYes} type="yes">
								<ButtonTitle>Sim</ButtonTitle>
							</Button>
						</ButtonList>
					</Container>
				</Overlay>
			</TouchableWithoutFeedback>
		</Modal>
	);
}
