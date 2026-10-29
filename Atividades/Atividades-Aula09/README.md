# Aula 09 — Projeto React 02

## Sobre o projeto

Aplicação desenvolvida com React para praticar gerenciamento de estado, formulários, efeitos, consumo de API e navegação entre páginas.

## Funcionalidades

- Listagem de usuários consumidos de uma API pública.
- Cadastro de usuários na lista local da aplicação.
- Exibição de detalhes de cada usuário.
- Navegação entre páginas com React Router.
- Estados de carregamento e tratamento de erros.
- Formulário com validação dos campos.

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- CSS
- React Router DOM
- API JSONPlaceholder

## Conceitos praticados

- **useState:** gerenciamento dos estados da aplicação.
- **Formulários:** captura e validação de dados.
- **useEffect:** execução de operações quando o componente é carregado ou o parâmetro da rota muda.
- **Fetch API:** requisições HTTP para buscar usuários.
- **React Router:** navegação entre páginas e uso de parâmetros com `useParams`.
- **Renderização de listas:** uso de `map()` e da propriedade `key`.

## Como executar

1. Instale o Node.js.
2. Clone ou baixe o repositório.
3. Entre na pasta `Atividades-Aula09`.
4. Execute `npm install`.
5. Execute `npm install react-router-dom`.
6. Execute `npm run dev`.
7. Abra no navegador o endereço apresentado no terminal.

## Observação

Os usuários iniciais vêm da API JSONPlaceholder. Os novos usuários cadastrados são adicionados ao estado local e não ficam salvos permanentemente no servidor.