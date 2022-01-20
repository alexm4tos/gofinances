<p align="center">
  <a href="" rel="noopener">
 <img width=200px src="https://user-images.githubusercontent.com/25274156/150271484-af067d92-193a-435a-9371-056674d55cba.png" alt="gofinances logo"></a>
</p>

---

## 📝 Lista de conteúdos

- [Sobre](#sobre)
- [Vamos começar](#vamos_comecar)
- [Executando a aplicação](#uso)
- [Tecnologias utilizadas](#tecnologias)
- [Base de conhecimento](#base_de_conhecimento)

## ℹ️ Sobre <a name = "sobre"></a>

O gofinances é uma aplicação simples que permite o controle financeiro de entrada e saídas com relatório em gráfico. O armazenamento dos dados é feito no local storage.

### Capturas de tela

<img width="100%" src="https://user-images.githubusercontent.com/25274156/150270789-2fecbf4b-20ef-4327-96df-566ebc6735b8.png" alt="Capturas de tela - gofinances">

Deseja ver em maior resolução? [Clique aqui](https://user-images.githubusercontent.com/25274156/150270787-e2e91a39-0e83-4fa2-b4f3-2a602817fff1.png)

## 🏁 Vamos começar <a name = "vamos_comecar"></a>

### Pré-requisitos

Você precisará dos seguintes itens instalados em seu ambiente:

- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- Algum editor de texto. Recomendo o [VS Code](https://code.visualstudio.com/) e [WebStorm](https://www.jetbrains.com/webstorm/).

Precisaremos também do [Expo Go](https://expo.io/client) instalado em seu dispositivo móvel ou emulator.

### ⏬ Instalação

Utilizando um terminal, clone este repositório com o seguinte comando:

```
git clone https://github.com/alexm4tos/gofinances.git
```

Logo após, acesse a pasta do projeto:

```
cd gofinances
```

Instale as dependências com seu gerenciador de pacotes.

Se for o NPM, utilize:

```
npm install
```

Caso seja o YARN:

```
yarn install
```

### ⚙️ Configuração

Será necessário criar um arquivo **.env** para armazenar as informações sensíveis. Para isso, utilize o comando:

```
cp .env.example .env
```

Abra o arquivo **.env** recém criado com algum editor de textos e adicione os dados necessário para o funcionamento da aplicação.

#### 🔑 Criando o CLIENT_ID

Acesse a [página de credenciais](https://console.developers.google.com/apis/credentials) no Google Cloud Platform e crie uma nova **ID do cliente do OAuth**.

Em _Tipo de aplicativo_, selecione _Aplicativo da Web_.

Adicione um nome para identificar (ex.: Web)

Em _Origens JavaScript autorizadas_ clique em _ADICIONAR URI_ e, no campo \*URIs\*\*, informe o seguinte endereço:

```
https://auth.expo.io
```

Em _URIs de redirecionamento autorizados_ clique em _ADICIONAR URI_ e, no campo \*URIs\*\*, informe o seguinte endereço:

```
https://auth.expo.io/@<seu-usuario>/gofinances
```

Precisaremos adicionar esse mesmo endereço no **REDIRECT_URI** presente no arquivo **.env**.

Por fim, clique em _CRIAR_.

Acesse a [página de credenciais](https://console.developers.google.com/apis/credentials) novamente e em _IDs do cliente OAuth 2.0_ selecione o ID do cliente que acabamos de criar.

No canto superior direito, selecione o conteúdo de _ID do cliente_ e adicione o valor no **CLIENT_ID** do arquivo **.env**.

No final do processo, o arquivo **.env** deverá ficar similar ao conteúdo abaixo:

```
CLIENT_ID="xxxxxx-yyyyyyy.apps.googleusercontent.com"
REDIRECT_URI="https://auth.expo.io/@<seu-usuario>/gofinances"
```

## 🎈 Executando a aplicação <a name="uso"></a>

Depois de [instalar e configurar o app](#vamos_comecar), é hora de executá-lo. Para isso, utilize o comando:

```
expo start
```

Será aberta uma página no navegador. Acesse-a e faça a leitura do QR Code com seu dispositivo móvel, utilizando o [Expo GO](https://expo.io/client).

## ⛏️ Tecnologias utilizadas <a name="tecnologias"></a>

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Styled Components](https://styled-components.com/)
- [Async Storage](https://react-native-async-storage.github.io/async-storage/)
- [Victory](https://formidable.com/open-source/victory/)

## 🎉 Base de conhecimento <a name = "base_de_conhecimento"></a>

- [Documentação React Native](https://reactnative.dev/)
- [Documentação Expo](https://docs.expo.dev/)
