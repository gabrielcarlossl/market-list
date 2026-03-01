# Como gerar um APK para instalar no celular

Existem duas formas de gerar o APK: **localmente** (sem internet, usando Android Studio) ou via **EAS Build** (na nuvem, usando os servidores da Expo).

---

## Opção 1 — Build local (recomendado)

Gera o APK direto na sua máquina, sem precisar de conta na Expo.

### Pré-requisitos

- Android Studio instalado com:
  - SDK Platform (Android 13+)
  - Build Tools
  - NDK (opcional, mas recomendado)
- Java 17+ instalado
- `ANDROID_HOME` configurado (já feito no seu caso)

### Passo a passo

**1. Instale o EAS CLI (caso ainda não tenha):**
```bash
npm install -g eas-cli
```

**2. Faça login na sua conta Expo (crie uma se não tiver em [expo.dev](https://expo.dev)):**
```bash
eas login
```

**3. Gere o APK localmente:**
```bash
eas build --platform android --profile preview --local
```

> O arquivo `.apk` será gerado na raiz do projeto ao final do processo.

**4. Transfira o APK para o celular:**
- Conecte o celular via USB e copie o arquivo, **ou**
- Suba o `.apk` para o Google Drive / WhatsApp e baixe no celular

**5. No celular, ative "Instalar de fontes desconhecidas":**
- Configurações → Segurança → Fontes desconhecidas (ou "Instalar apps desconhecidos")
- Abra o arquivo `.apk` e instale

---

## Opção 2 — EAS Build na nuvem

Gera o APK nos servidores da Expo. Não precisa ter Android Studio configurado.

### Passo a passo

**1. Instale o EAS CLI:**
```bash
npm install -g eas-cli
```

**2. Faça login:**
```bash
eas login
```

**3. Configure o projeto (só precisa fazer uma vez):**
```bash
eas build:configure
```

**4. Inicie o build:**
```bash
eas build --platform android --profile preview
```

> O build acontece na nuvem. Ao final, você recebe um link para baixar o `.apk` direto no celular.

**5. Instale no celular:**
- Acesse o link gerado no navegador do celular
- Baixe e instale o `.apk`
- Ative "Instalar de fontes desconhecidas" se solicitado

---

## Perfis disponíveis no eas.json

| Perfil | Descrição |
|---|---|
| `development` | Build de desenvolvimento com Expo Dev Client |
| `preview` | **APK para testes** — ideal para instalar no celular |
| `production` | Build de produção (AAB para a Play Store) |

Para gerar um APK de preview (o mais indicado para teste no celular), use sempre `--profile preview`.

---

## Dica: verificar se o build funcionou

Após instalar, o app aparecerá como **"Lista de Compras"** na gaveta de aplicativos do Android.
