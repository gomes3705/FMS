# Plano de correção

- [x] Corrigir a navegação entre Visão geral, Biblioteca, Coleções, Regras, Atividade e Preferências.
- [x] Criar abas funcionais para a biblioteca, coleções, regras, atividade e guia Como usar.
- [x] Adicionar central de permissões explícitas para arquivos e localização.
- [x] Integrar seletor de arquivos e diretório com feedback de permissão e estado.
- [x] Implementar operações seguras de renomear, mover para coleção e excluir da lista, sempre com confirmação.
- [x] Adicionar seção Como usar no site com passos claros e aviso sobre limitações do navegador.
- [x] Exibir autoria de forma discreta: feito por Gabriel e Alício.
- [x] Validar TypeScript, build, interações principais e responsividade desktop/mobile.

## Iteração de simplificação

- [x] Corrigir a sobreposição visual dos nomes nas coleções da Visão geral.
- [x] Reduzir a densidade visual e simplificar os blocos da tela inicial.
- [x] Adicionar ícone acessível para ativar e desativar o modo escuro.
- [x] Persistir a preferência de tema no navegador.
- [x] Ajustar o fluxo de permissões para solicitar somente após ação clara, funcionando em HTTPS no Vercel.
- [x] Atualizar a documentação com notas de hospedagem estática e permissões do navegador.
- [x] Testar tema claro/escuro, coleções, desktop, mobile e build de produção.

## Deploy no Vercel

- [x] Inspecionar scripts de build e a configuração atual do Vercel.
- [x] Publicar apenas o diretório estático gerado pelo Vite.
- [x] Adicionar fallback de rotas para o aplicativo React.
- [x] Atualizar o README com instruções corretas de deploy no Vercel.
- [x] Validar build de produção e a saída publicada.

## Correção do deploy visual

- [x] Substituir referências de imagem que só funcionam no ambiente Manus.
- [x] Garantir fallback visual caso uma imagem externa falhe.
- [x] Remover o limite que cria espaço vazio em monitores largos.
- [x] Validar a página com a largura aproximada do navegador do usuário.
