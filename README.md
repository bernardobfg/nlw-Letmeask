# :rocket: Letmeask

<p align="center">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-Projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-uso">Uso</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#clone">Clone</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#funcionalidades-add">Funcionalidades Adicionais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

![letmeask](https://user-images.githubusercontent.com/64651224/123522383-4d477f80-d693-11eb-8916-8f8ef9d97903.PNG)
:parachute:Projeto
Projeto realizado durante a Next Level Week 6, com a ideia de criar uma sala de perguntas e respostas em tempo real

####	:link: [Link do projeto](https://letmeask-e633a.web.app/)



## :comet:  [Tecnologias](#tecnologias)
* React JS
* Typescript
* Firebase
* Sass

## :dart: Uso
* Caso queria criar uma sala de perguntas e resposta, selecione a opção de Criar sala, faça o login com sua conta do Google, escolha um nome de sua preferência e compartilhe o código da sala com seus amigos.
* Caso queria entrar em uma sala, solicite o código da sala ao administrador e insira na opção correspondente na pagina inicial. Se quiser fazer ou curtir uma pergunta, faça seu login com sua conta Google.

## :video_game: Crie sua própria versão
* Faça o download do [Node](https://nodejs.org/en/)
* Clone o projeto
```bash
git clone https://github.com/bernardobfg/nlw-Letmeask/
```
* Entre na pasta do projeto
```bash
cd nlw-Letmeask
```
* Instale as dependências do projeto
```bash
npm install
```
* Crie um projeto no firebase com <strong>Autenticação</strong> e <strong>Realtime Database</strong>
* Adicione em um arquivo <strong>.env </strong> as credenciais do seu projeto firebase
* Inicie a aplicação
``` bash
npm start
```


## :artificial_satellite: Funcionalidades
* Autenticação do usuário
* Criar salas
* Entrar em salas já criadas
* O admnistrador pode:
* * Dar Highlight a pergunta
* * Marcar a pergunta como respondida
* * Excluir a pergunta
* * Encerrar a sala
* O usuário pode
* * Enviar perguntas
* * Curtir outras perguntas

## :flying_saucer: Funcionalidades Adicionais
* Ordenar as perguntas com a seguinte prioridade
* * As com HighLight
* * As com maior número de curtidas
* * As já respondidas
* Responsividades
* Validação se o usuário é o dono da sala para entrar na parte de admin
* Opção de Dark Mode
