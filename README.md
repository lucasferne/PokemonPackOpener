TCG Pack Opener
Este projeto é um simulador interativo de abertura de pacotes de cartas colecionáveis de Pokémon, desenvolvido com React e Vite. A aplicação consome dados reais de coleções oficiais através da API TCGdex, permitindo que o usuário selecione diferentes expansões e experimente a mecânica de revelação de cartas com alta fidelidade visual.

Funcionalidades Técnicas
O projeto foca na experiência do usuário e em animações de estado complexas. A principal característica é o uso do Framer Motion para implementar o conceito de Layout Compartilhado. Quando uma carta é revelada no deck principal, ela não apenas aparece no inventário, mas realiza uma transição fluida de movimento e escala entre os dois containers, mantendo sua identidade visual através da propriedade layoutId.

A mecânica de revelação utiliza transformações 3D via CSS, empregando propriedades como preserve-3d e backface-visibility para garantir que a transição entre a frente e o verso da carta ocorra de forma realista. Além disso, o sistema de sombras dinâmicas no deck principal simula a profundidade de um pacote físico, diminuindo visualmente conforme as cartas são removidas da pilha.

Arquitetura e Fluxo
A aplicação é dividida em componentes modulares. O componente CardButton é versátil, operando em dois modos distintos: interativo com suporte a rotação para o momento da abertura, e estático para exibição otimizada no grid de resultados. O estado global controla o carregamento das coleções, a fila de cartas restantes no pacote atual e a galeria de cartas já visualizadas.

Um modal de alta definição também foi implementado para permitir a inspeção detalhada de cada carta após a revelação, utilizando AnimatePresence para gerenciar as transições de entrada e saída do overlay no DOM.

Tecnologias Utilizadas
O desenvolvimento foi realizado com React e TypeScript, utilizando Vite como ferramenta de build para garantir performance e recarregamento rápido durante o desenvolvimento. A biblioteca Framer Motion foi a escolha para todas as interações animadas, enquanto o gerenciamento de deploy é feito automaticamente para o GitHub Pages através do pacote gh-pages, garantindo a integração contínua do projeto.

Instruções de Instalação
Para executar o projeto localmente, clone o repositório e utilize o comando npm install para baixar as dependências necessárias. O comando npm run dev inicia o servidor de desenvolvimento. Para gerar a versão de produção e realizar o deploy no ambiente de hospedagem, utilize npm run deploy.
