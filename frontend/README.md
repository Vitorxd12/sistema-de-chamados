# 🎫 Sistema de Gestão de Chamados (Help Desk)

![Java](https://img.shields.io/badge/Java-17-red)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> 📌 **Projeto Fullstack de portfólio** focado em arquitetura limpa, modelagem relacional e integração eficiente entre backend e frontend.

---

## 📖 Visão Geral

Este repositório contém uma solução **Fullstack** para gerenciamento de chamados de suporte (Help Desk).  
O projeto foi desenvolvido com foco em:

- ✔️ **Boa modelagem de dados relacional**
- ✔️ **Regras de negócio bem definidas**
- ✔️ **Separação clara de responsabilidades**
- ✔️ **Comunicação fluida via API REST**

A aplicação integra um **backend em Spring Boot** com um **frontend moderno em Next.js**, simulando um sistema real de suporte técnico corporativo.

---

## ⚠️ Nota de Arquitetura (Importante)

> [!IMPORTANT]  
> Este projeto foi desenvolvido **exclusivamente para fins de demonstração técnica**.  
> Para simplificar os testes e a navegação:
>
> - ❌ Não há autenticação (Login/JWT)
> - ✅ A identidade do usuário é **simulada via parâmetros**
>
> Isso permite alternar rapidamente entre perfis (Cliente, Técnico e Administrador) e validar todas as regras de negócio.

---

## 🛠️ Stack Tecnológica

### 🔹 Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

### 🔹 Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Lombok

### 🔹 Banco de Dados
- PostgreSQL (produção)
- H2 (in-memory para testes)

### 🔹 Ferramentas
- Maven
- Postman / Insomnia

---

## 📋 Funcionalidades

### 👤 Cliente (Usuário Comum)
- **RF01:** Abertura de chamados com título, descrição, categoria e prioridade
- **RF02:** Visualização apenas dos próprios chamados
- **RF03:** Acompanhamento de status (`Aberto`, `Em Atendimento`, `Concluído`)
- **RF04:** Comentários em chamados ativos
- **RF05:** Cancelamento de chamados (somente enquanto estiverem **Abertos**)

---

### 🧑‍🔧 Técnico (Atendente)
- **RF06:** Visualização da fila global de chamados
- **RF07:** Assumir chamados disponíveis
- **RF08:** Atualização de status ao longo do atendimento
- **RF09:** Registro obrigatório de **Parecer Técnico** ao concluir
- **RF10:** Acesso ao histórico completo do chamado

---

### 🧑‍💼 Administrador (Gestor)
- **RF11:** Criação e desativação de usuários
- **RF12:** Dashboard com métricas operacionais
    - Total de chamados
    - Tempo médio de resolução
    - Volume por categoria
- **RF13:** Gerenciamento dinâmico de categorias

---

## ⚙️ Simulação de Sessão (Mock de Usuário)

Como não há autenticação real, o sistema funciona da seguinte forma:

- 🔑 **Identificação por ID:**  
  O frontend envia o `userId` nas requisições HTTP.

- 🛡️ **Validação de Perfil:**  
  O backend valida se o usuário possui o **perfil correto** para executar cada ação  
  (ex: apenas um **TÉCNICO** pode concluir um chamado).

Essa abordagem garante **segurança lógica** mesmo sem autenticação formal.

---

## 🗄️ Modelagem de Dados

O sistema é baseado nas seguintes entidades principais:

- **Usuarios** → nome e perfil (`CLIENTE`, `TECNICO`, `ADMIN`)
- **Chamados** → entidade central, ligada a cliente e técnico
- **Categorias** → classificação dos problemas
- **Comentarios** → comunicação entre usuário e técnico
- **Historico_Status** → auditoria e métricas de tempo

---

## 📂 Estrutura do Repositório Backend

```bash

└── backend
    ├── src/main/java/com/projeto
    │   ├── models       # Entidades JPA
    │   ├── repository   # Persistência
    │   ├── services     # Regras de negócio
    │   └── controllers # Endpoints REST
    └── src/main/resources
        └── application.properties
