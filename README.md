# Cozinha Solidária "Pão Nosso" — MVP

MVP tecnológico desenvolvido para otimizar a triagem de beneficiários e o controle de estoque de alimentos perecíveis da **Cozinha Solidária "Pão Nosso"**, que atende cerca de 200 famílias em situação de insegurança alimentar.

Este projeto está alinhado ao **ODS 2 (Fome Zero e Agricultura Sustentável — Meta 2.1)**, atuando na redução de filas, eliminação de entregas duplicadas e combate ao desperdício de insumos por meio do controle de validade.

---

## 🎯 Funcionalidades Principais (Escopo do MVP)

* **RF01 — Busca Rápida e Check-in:** Localização textual ágil de beneficiários ativos e verificação de elegibilidade em menos de 3 segundos.
* **RF02 — Bloqueio de Duplicidade Mensal:** Validação automática do histórico de retiradas (`Registro_Entrega`), impedindo que uma mesma família receba mais de uma cesta básica no mesmo mês civil.
* **RF03 — Controle de Estoque FIFO (*First-In, First-Out*):** Ordenação automática de doações por data de validade ascendente, com alertas visuais para priorização dos lotes mais antigos.
* **RF04 — Resiliência *Offline-First* (Desejável):** Operação contínua via PWA (*Progressive Web App*) com cache local em *IndexedDB* para suportar oscilações de rede 3G/4G em campo.

---

## 🛠️ Arquitetura e Pilha Tecnológica

* **Arquitetura:** Monolito MVC (*Model-View-Controller*).
* **Front-end:** Angular 17+, `@angular/pwa` e Angular Material (*mobile-first*).
* **Back-end e Banco de Dados:** Supabase (PostgreSQL) com armazenamento local sincronizado via *IndexedDB*.
* **Testes:** Jasmine.
* **Hospedagem:** Nuvem estática (Vercel / Firebase Hosting) e DBaaS (Supabase).

---

## 🔒 Segurança e Acessibilidade

* **Autenticação (RNF01):** Acesso restrito a coordenadores e voluntários autorizados via tokens JWT, transmissão criptografada (HTTPS/TLS) e armazenamento de senhas com hash unidirecional **Bcrypt**.
* **Diretrizes OWASP Top 10 (RNF02):** Consultas parametrizadas (prevenção contra SQL Injection), escape automático de templates no Angular (prevenção contra XSS), validação em duas camadas (cliente e servidor), políticas *Row Level Security* (RLS) no PostgreSQL e mensagens de erro genéricas sem exposição de *stack traces*.
* **Acessibilidade Ergonômica (RNF04):** Áreas de toque mínimas de `44x44px`, razão de contraste mínima de `4.5:1` e sinalização mista de alertas críticos combinando **texto, símbolo e cor**.

---

## 📱 Fluxo de Telas do Protótipo

1. **Tela 1 — Entrada Principal (Login):** Autenticação segura dos voluntários para início do turno de atendimento.
2. **Tela 2 — Execução Central (Busca e Check-in):** Pesquisa rápida de famílias ativas e registro de entrega da cesta básica.
3. **Tela 3 — Alertas e Resultados:** Confirmação visual do check-in, avisos de bloqueio por duplicidade e alertas FIFO de proximidade de vencimento no estoque.
