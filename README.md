# Organizador

> **Dê um lugar para cada coisa.**

O **Organizador** é uma interface de gestão pessoal de arquivos criada para acompanhar diferentes rotinas, projetos e contextos em um único espaço. Em vez de assumir um único público ou tipo de documento, o produto permite organizar PDFs, imagens, planilhas, vídeos, áudios, arquivos compactados, códigos e qualquer outro material digital por meio de coleções, etiquetas, busca e regras de classificação.

## O produto

A aplicação foi desenhada para responder a uma pergunta simples: **“onde está o arquivo que eu preciso agora?”**. O fluxo combina uma visão geral de atividade, uma biblioteca pesquisável, coleções flexíveis e um espaço para regras de organização. A experiência não depende de uma taxonomia pronta; cada pessoa pode montar um sistema próprio, desde um arquivo pessoal até um espaço de trabalho compartilhado em uma futura evolução do produto.

### Princípios de experiência

| Princípio | Como aparece na interface |
| --- | --- |
| Generalista por essência | Os arquivos são descritos por nome, formato, coleção e etiquetas, sem referências obrigatórias a escola, aluno ou departamento. |
| Contexto antes de complexidade | A visão geral mostra o que mudou, o que precisa de atenção e qual pode ser a próxima ação. |
| Organização progressiva | A pessoa pode importar primeiro e classificar depois, sem bloquear o fluxo com formulários longos. |
| Linguagem humana | Os textos usam verbos claros como “Adicionar arquivos”, “Criar coleção” e “Revisar agora”. |
| Controle local | Nesta versão, os dados demonstrativos e preferências vivem no navegador; nenhuma conta é necessária para explorar a experiência. |

## Funcionalidades atuais

A versão atual apresenta uma experiência de produto navegável com as seguintes capacidades:

- Painel de visão geral com métricas de arquivos, coleções e itens que precisam de atenção.
- Biblioteca de arquivos com busca por nome, coleção ou etiqueta.
- Filtro por formato, incluindo PDF, DOCX, XLSX, JPG, ZIP e TAR.
- Importação de arquivos pelo seletor nativo do navegador, preservando nome, formato e tamanho para a sessão atual.
- Coleções fixadas para acesso rápido e cartões de coleção com volume e atividade recente.
- Criação de novas coleções por modal acessível e feedback instantâneo.
- Área de regras inteligentes preparada para evoluir de sugestões visuais para automações reais.
- Estados de arquivo: **Organizado**, **Novo** e **Revisar**.
- Layout responsivo com navegação lateral em desktop e barra inferior em telas menores.
- Microinterações, estados vazios, foco visível e suporte a `prefers-reduced-motion`.

> A aplicação é uma experiência front-end. A movimentação física de arquivos no sistema operacional, autenticação, sincronização em nuvem e persistência em banco de dados são pontos de evolução, não estão simulados como se já existissem.

## Direção visual

A identidade segue a abordagem **Arquivo Mineral**: um encontro entre modernismo editorial, sinalética de arquivos e ferramentas profissionais. O fundo marfim e o carvão criam uma base silenciosa e legível; o **laranja argila `#C85A32`** identifica ações, novidades e pontos de decisão. A tipografia combina **Space Grotesk** para títulos e **IBM Plex Sans** para leitura e controles.

O layout evita a aparência de um painel genérico. A composição usa uma barra lateral persistente, uma linha de coordenadas, blocos assimétricos de resumo, uma biblioteca de leitura rápida e pequenos sinais de classificação que lembram etiquetas de fichário.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui e Radix UI
- Lucide React
- Wouter para roteamento
- Sonner para feedbacks rápidos

## Estrutura do projeto

```text
client/
  index.html
  src/
    App.tsx                 # Shell e rotas
    index.css               # Tokens, layout e identidade visual
    main.tsx                # Entrada React
    components/             # Componentes compartilhados e primitives
    contexts/               # Contextos de tema
    pages/
      Home.tsx              # Workspace principal do Organizador
      NotFound.tsx          # Estado de rota inexistente
server/
  index.ts                  # Servidor do template; não é usado para dados do produto
shared/
  const.ts                 # Constantes compartilhadas do template
ideas.md                    # Decisões de direção visual e linguagem
```

## Desenvolvimento local

Instale as dependências com pnpm e inicialize o servidor de desenvolvimento:

```bash
pnpm install
pnpm dev
```

O Vite disponibiliza a aplicação em `http://localhost:3000`.

Para validar tipos e gerar a versão de produção:

```bash
pnpm check
pnpm build
```

A formatação pode ser aplicada com:

```bash
pnpm format
```

## Como usar

Na visão geral, use **Adicionar arquivos** para selecionar um ou mais arquivos do computador. Os itens aparecem no topo da biblioteca como arquivos novos e podem ser encontrados pela busca. Use **Criar coleção** para criar um novo ponto de organização; a ação funciona tanto pelo botão principal quanto pelo botão `+` da seção de coleções.

A busca aceita termos do nome do arquivo, do nome da coleção e das etiquetas. O seletor de formato restringe a lista aos formatos disponíveis. Os itens com status “Revisar” representam materiais que chegaram ao arquivo, mas ainda aguardam uma decisão de classificação.

## Navegação e permissões

A aplicação agora usa uma navegação por abas explícita, sincronizada com a barra lateral. As seções **Visão geral**, **Biblioteca**, **Coleções**, **Regras**, **Atividade**, **Como usar** e **Preferências** alteram o conteúdo sem recarregar a página.

O acesso a recursos sensíveis é sempre iniciado por uma ação clara da pessoa. Em **Preferências**, “Arquivos e pastas” chama o seletor seguro de diretórios do navegador quando disponível, enquanto “Localização” chama a permissão de geolocalização nativa. A importação de arquivos usa o seletor do sistema operacional. O produto não tenta obter esses acessos silenciosamente.

As ações de arquivo ficam protegidas por confirmação contextual: renomear exige confirmação no diálogo do navegador; mover só é oferecido depois que uma pasta foi autorizada; remover atua apenas sobre a lista da sessão e oferece desfazer. Navegadores sem suporte ao acesso seguro de pastas são informados sem bloquear a navegação, a busca ou a leitura da interface.

## Autoria

Concebido e desenvolvido por **Gabriel e Alício**.

## Roadmap recomendado

### Próxima camada: organização real

A próxima evolução deve conectar a interface à File System Access API de forma explícita, com permissões claras e modo de pré-visualização antes da movimentação. O sistema pode gerar um plano de ações, detectar conflitos de nomes, permitir desfazer e registrar cada operação no histórico.

### Persistência e sincronização

Para uso entre dispositivos, recomenda-se adicionar autenticação, banco de dados para metadados, armazenamento de objetos para arquivos e um serviço de sincronização. As entidades principais seriam `FileItem`, `Collection`, `Tag`, `Rule`, `ActivityEvent` e `Workspace`.

### Regras e automações

As regras devem evoluir de sugestões para uma linguagem simples baseada em condições: extensão, nome, tamanho, data de alteração, etiqueta e origem. Cada regra precisa oferecer simulação, prioridade, relatório de conflitos e opção de desfazer.

### Acessibilidade e confiança

A versão seguinte deve manter foco visível, navegação completa por teclado, nomes acessíveis para ícones, contraste auditado e mensagens de erro específicas. Operações destrutivas ou que movimentem arquivos devem sempre exigir confirmação contextual e explicar o resultado esperado.

## Licença

Este projeto pode receber a licença definida pelo responsável pelo repositório. Enquanto ela não estiver registrada, trate o código como material privado e não redistribua os arquivos sem autorização.
