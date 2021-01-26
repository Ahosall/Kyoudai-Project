# Kyoudai - BOT

Um simples bot com muitas funções desde fun, a moderação ...

## Tecnologias

|Tecnologia|Versão|
|---------:|:-----|
| Node.JS  | v8.0^|
| MongoDB  | v3.x^|

## Instalação

```bash
$ npm install
```

## Ativação

Primeiramente você terá que adicionar algumas coisas antes de ativar. 
Crie um arquivo chamado `.env`, copie e cole os campos que estão dentro do `.env.example` no `.env.example`,

|       Campo        |Requer|
|-------------------:|:-----|
| AUTH_TOKEN=        |  Sim |
| WEB_CLIENT_ID=     |  Sim |
| WEB_CLIENT_SECRET= |  Sim |
| WEB_CALLBACK=      |  Sim |
| MONGO_URI=         |  Sim |

### Produção

```bash
$ npm start
```

### Test

```bash
$ npm test # Em desenvolvimento
```