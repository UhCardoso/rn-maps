# Aplicativo de Mapa de Localização em React Native com Expo

Este documento descreve o processo de configuração do ambiente e execução do aplicativo de mapa de localização utilizando React Native, Expo, Node.js 18 e Java 17. O aplicativo demonstra a localização atual do usuário em um mapa, utilizando o Expo Go para visualização em dispositivos iOS e Android (emuladores e físicos).

## Sumário

1.  [Resumo do Aplicativo](#resumo-do-aplicativo)
2.  [Pré-requisitos](#pré-requisitos)
3.  [Configuração do Ambiente](#configuração-do-ambiente)
4.  [Executando o Aplicativo](#executando-o-aplicativo)
    *   [Android](#android)
        *   [Emulador Android](#emulador-android)
        *   [Dispositivo Físico Android](#dispositivo-físico-android)
    *   [iOS](#ios)
        *   [Emulador iOS](#emulador-ios)
        *   [Dispositivo Físico iOS](#dispositivo-físico-ios)
5.  [Código do Aplicativo](#código-do-aplicativo)

## Resumo do Aplicativo

O aplicativo utiliza o React Native, a biblioteca `react-native-maps` e o Expo Location para exibir a localização atual do usuário em um mapa.  Ele solicita permissão de localização, obtém as coordenadas e as exibe no mapa, centralizando-o na posição do usuário e atualizando-o conforme o usuário se move. Um marcador indica a localização atual.

## Pré-requisitos

Antes de iniciar a configuração, certifique-se de ter os seguintes itens instalados:

*   **Node.js (versão 18 ou superior):**  Responsável pela execução do ambiente JavaScript.  Verifique a versão com `node -v`.
*   **npm (Gerenciador de Pacotes do Node):**  Geralmente instalado com o Node.js. Verifique a versão com `npm -v`.
*   **Java JDK (versão 17 ou superior):** Necessário para o desenvolvimento Android. Verifique a versão com `java -version`.
*   **Expo CLI:** Ferramenta de linha de comando para desenvolvimento com Expo. Instale globalmente com `npm install -g expo-cli`.
*   **Android Studio (Opcional, mas recomendado para desenvolvimento Android):**  Fornece ferramentas para emulação e depuração.
*   **Xcode (Opcional, mas necessário para desenvolvimento iOS):**  Fornece ferramentas para emulação e depuração em iOS.
*   **Emuladores Android e iOS:**  Disponíveis através do Android Studio e Xcode, respectivamente.
*   **Expo Go (Aplicativo):**  Aplicativo para dispositivos móveis que permite executar aplicativos Expo sem a necessidade de compilação nativa. Disponível na App Store (iOS) e Google Play Store (Android).

## Configuração do Ambiente

1.  **Clone o projeto:**

    ```bash
    git clone https://github.com/UhCardoso/rn-maps.git
    cd rn-maps
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

## Executando o Aplicativo

### Android

#### Emulador Android

1.  Abra o emulador Android através do Android Studio ou linha de comando.
2.  No terminal, dentro da pasta do projeto, execute:

    ```bash
    expo start --android
    ```

3.  O Expo Go no emulador Android abrirá automaticamente o aplicativo.

#### Dispositivo Físico Android

1.  Certifique-se de que o dispositivo Android esteja conectado ao computador e em modo de depuração USB.
2.  Abra o aplicativo Expo Go no dispositivo.
3.  No terminal, dentro da pasta do projeto, execute:

    ```bash
    expo start --android
    ```

4.  O Expo Go no dispositivo Android deverá exibir o aplicativo.

### iOS

#### Emulador iOS

1.  Abra o emulador iOS através do Xcode.
2.  No terminal, dentro da pasta do projeto, execute:

    ```bash
    expo start --ios
    ```

3.  O Expo Go no emulador iOS abrirá automaticamente o aplicativo.

#### Dispositivo Físico iOS

1.  Certifique-se de que o dispositivo iOS esteja conectado ao computador.
2.  Abra o aplicativo Expo Go no dispositivo.
3.  No terminal, dentro da pasta do projeto, execute:

    ```bash
    expo start --ios
    ```

4.  O Expo Go no dispositivo iOS deverá exibir o aplicativo.
