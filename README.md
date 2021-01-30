<center>
  <!--<img src="./src/utils/kyoudaiLogo.png" alt="Kyoudai_Logo" />-->
  <h1>Kyoudai - BOT</h1>
  
  <a href="" alt="Servidor Kyoudai">
    <img src="https://img.shields.io/discord/759096795258945565?logo=discord" alt="Servidor Kyoudai Discord">
  </a>
  <br>
  <p>Um simples bot com muitas funções desde fun, a moderação ...</p>
</center>

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
Crie um arquivo chamado `.env`, copie e cole os campos que estão dentro do `.env.example` no `.env`.

|       Campo        |Requer|
|:------------------:|:----:|
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
