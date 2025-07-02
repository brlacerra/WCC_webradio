# WWC Radio – Web Player com Inteligência de Recomendação

WWC Radio é um player web que utiliza a **API do Spotify** para reproduzir músicas de playlists selecionadas, armazenar dados sobre o comportamento de reprodução e gerar rankings automáticos com base no volume médio diário de cada música. O sistema conta com backend em Node.js, banco de dados MySQL e autenticação via Spotify.

---

## Funcionalidades

- Reproduz músicas diretamente do Spotify (via Web Playback SDK)
- Armazena dados de volume médio por música e dia
- Calcula e atualiza automaticamente o ranking das músicas com base em popularidade e volume
- Histórico de comportamento musical por 6 dias anteriores
- Autenticação com Spotify (OAuth2)
- Estrutura preparada para gráficos e análise futura
- Backend com atualização automática via cron job

---

# WWC Radio – Web Player with Recommendation Intelligence

WWC Radio is a web player that uses the **Spotify API** to play music from selected playlists, store playback behavior data, and automatically generate rankings based on each track’s daily average volume. The system includes a Node.js backend, MySQL database, and Spotify authentication.

---

##  Features

- Plays music directly from Spotify (via Web Playback SDK)
- Stores average volume data per track and per day
- Automatically calculates and updates music rankings based on popularity and volume
- Keeps historical playback behavior for the past 6 days
- Authenticates with Spotify (OAuth2)
- Structure ready for future graphing and analytics
- Backend includes automatic updates via cron job

## Tecnologies

- Node.js + Express
- MySQL (via MySQL Workbench)
- Spotify Web API
- JavaScript (Frontend + Backend)
- HTML + CSS
- Node-cron
- Axios / Fetch
- dotenv

## How to use
- cd backend
- npm install

- npm start
ou
- npx nodemon src/server.js

## DEV

| [<img src="https://avatars.githubusercontent.com/u/69050146?v=4" width=250><br><sub>Bruno L. (@brlacerra)</sub>](https://github.com/futoibrunao) | 
| :---: |

## V2 Coming soon...



