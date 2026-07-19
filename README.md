# Precifica - Sistema de Precificação de Produtos de Hortifruti

Sistema web simples e direto para calcular o preço final de venda de produtos, aplicando uma margem de lucro e arredondando para centavos terminados em 9. Ideal para quem trabalha com hortifruti, feiras livres ou pequenos comércios.

## Funcionalidades

- 📋 Lista de produtos pré-cadastrados (legumes, frutas, ovos e abacaxi)
- ⚖️ Peso padrão editável por produto (kg ou unidade)
- 💰 Campo para inserir o preço da remessa (custo)
- 🧮 Cálculo automático: `(preço / peso) × (1 + margem)` com arredondamento para centavos terminados em 9
- 📈 Margem mestra global aplicada a todos os produtos
- ➕ Adição de novos produtos com escolha de unidade (kg ou un)
- 🗑️ Remoção de produtos da lista
- 📱 Totalmente responsivo e centralizado em dispositivos móveis
- 🎨 Design limpo, minimalista e profissional (tons de branco, azul claro e cinza)

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 
- JavaScript 
- Google Fonts 
- Font Awesome

## Como usar

1. Acesse o link para acesso direto ao sistema: https://precifica-hortifruti.vercel.app/
2. Os produtos já vêm cadastrados com seus pesos padrão.
3. Digite o preço da remessa no campo correspondente e veja o preço final ser calculado instantaneamente.
4. Ajuste a margem mestra no topo para alterar o percentual de todos os produtos.
5. Para adicionar um novo produto, clique em "Adicionar produto", preencha nome, peso e unidade.


## Personalização

- Para alterar a lista inicial de produtos, edite o array `defaultProducts` dentro de `script.js`.
- Para modificar o emoji de um produto, ajuste o `emojiMap` no mesmo arquivo.
- Cores e espaçamentos podem ser ajustados no `style.css`.

## Possíveis melhorias futuras

- Persistência de dados (localStorage ou backend)
- Exportar lista em PDF/Excel
- Histórico de preços
- Múltiplas margens por produto

## Licença

Este projeto é de uso livre para fins pessoais ou comerciais. Sinta-se à vontade para adaptá-lo às suas necessidades.

---

Desenvolvido em uma tarde chuvosa de inverno, com uma bela xícara de ☕ expresso e dedicação.
