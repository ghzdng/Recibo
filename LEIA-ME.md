# Recibo — app instalável (Android)

Esta pasta é a app completa. Não depende do Claude: abre no Chrome do telemóvel, instala-se como uma app normal, funciona sem rede e sincroniza diretamente com a tua Google Sheet.

Ficheiros: `index.html` (a app), `sw.js` (modo offline), `manifest.webmanifest` + `icon-*.png` (instalação e ícone), `config.js` (definições).

## 1. Pôr a app online (GitHub Pages, grátis)
1. Cria conta em github.com e entra.
2. Em **+ › New repository**: nome `recibo`, **Public**, **Create repository**.
3. Clica em **uploading an existing file** e carrega todos os ficheiros desta pasta (extrai o zip primeiro). **Commit changes**.
4. **Settings › Pages**: Source = *Deploy from a branch*, Branch = `main` / `(root)` › **Save**.
5. Ao fim de ~1 minuto a app está em `https://O_TEU_UTILIZADOR.github.io/recibo/`.

## 2. Criar o acesso Google (uma só vez)
1. Abre console.cloud.google.com com a conta Google que tem a folha. **Novo projeto** › nome `Recibo`.
2. **APIs e serviços › Biblioteca** › procura **Google Sheets API** › **Ativar**.
3. **Google Auth Platform** (ecrã de consentimento OAuth) › **Começar**: nome `Recibo`, o teu email, público **Externo**.
4. Em **Acesso a dados**: adiciona o âmbito `.../auth/spreadsheets`.
5. Em **Público-alvo**: adiciona o teu email como utilizador de teste. (Para não teres de voltar a autorizar de 7 em 7 dias, carrega em **Publicar aplicação**; a Google mostra apenas um aviso de “app não verificada”, normal numa app só tua.)
6. **Clientes › Criar cliente › Aplicação Web**, nome `Recibo web`. Em **Origens JavaScript autorizadas** coloca `https://O_TEU_UTILIZADOR.github.io` (sem `/recibo` no fim). **Criar**.
7. Copia o **ID do cliente** (termina em `.apps.googleusercontent.com`).

## 3. Instalar e ligar no telemóvel
1. No Chrome abre o endereço da app › menu ⋮ › **Instalar aplicação**. Fica com ícone no ecrã.
2. Abre o Recibo › **Sincronizar agora** › cola o ID do cliente › escolhe a conta › (“A Google não verificou esta app” › Avançadas › Aceder a Recibo) › Permitir.
3. Pronto: os valores da folha são importados como “Ajuste da folha” e tudo o que registares passa para a folha.

## Notas
- Os registos ficam guardados no telemóvel; sem rede continuas a registar e sincroniza depois.
- A sessão Google dura cerca de 1 hora: se a app disser que precisa de ligação, toca em **Sincronizar agora**.
- Para mudar de folha/ano edita `config.js` (`spreadsheetId`, `tab`, `year`) e volta a carregar o ficheiro no GitHub.
