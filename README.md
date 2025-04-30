# teste-tecnico-luiza-labs

## Índice

* [Disclaimer](#disclaimer)
* [System Design](#system-design)
* [Stack](#stack)
* [Run](#run)

## Disclaimer <a name="disclaimer"></a>

**Pontos principais:**

- **Transactions**: As operações de adicionar e remover item não foram feitas como Transactions - **realizá-las rapidamente pode causar bugs**
- **Bocker:** Eu o configurei nesse projeto
- **Git Issues:** Crie para futuras melhorias ou features.
- **Class Based API**

[Voltar ao Índice](#índice).

[Ir para System Design](#system-design) | [Ir para Stack](#stack) | [Ir para Run](#run)

---

## System Design <a name="system-design"></a>

- Requisitos: 

![image](https://github.com/user-attachments/assets/2834e49e-6ff7-49ae-aa14-fa20895f366b)

- Modelo de dados:

![image](https://github.com/user-attachments/assets/1cdb0e58-b21a-4285-9388-94154809189c)

- Descrição da API:

![image](https://github.com/user-attachments/assets/3998aab0-0eac-4058-b60d-4684d43f793e)

- Ideia de design:
  - O microsserviço não foi feito - a idea era um "Write-Through Cache"

![image](https://github.com/user-attachments/assets/4cd00aca-8d59-4c08-b16f-f8c2e67c6698)

- Ideia do monolito:
  - NotificationService não foi feito
  - Na prática o Front conectou diretamente com a FAKE API

![image](https://github.com/user-attachments/assets/1b5aa15f-b9e6-43da-babd-d05b218205d8)

[Voltar ao Índice](#índice) | [Voltar ao Disclaimer](#disclaimer)

---

## Stack <a name="stack"></a>

Nesta seção, liste as tecnologias, linguagens de programação, frameworks e bibliotecas utilizadas no seu projeto.

* Linguagem de Programação: TypeScript
* Framework: Express - NodeJS
* Banco de Dados: PostgreSQL
* Outras Tecnologias: Docker, 

[Voltar ao Índice](#índice) | [Voltar ao Disclaimer](#disclaimer) | [Voltar ao System Design](#system-design)

---

## Run <a name="run"></a>

**Pré-requisitos:**

* npm, Docker

**Instalação:**

1.  Clone o repositório:
    ```bash
    git clone https://github.com/LeandroOliveiraDeQueiroz/ecommerce-backend.git
    cd ecommerce-backend
    ```
2.  Configure as variáveis de ambiente em modo de desenvolvimento:
    ```
    # Exemplo de arquivo .env
    # copiar keys de .env.example
    ```

**Execução:**

* Para executar o projeto em modo de desenvolvimento:
    ```bash
    npm run docker-up
    ```

[Voltar ao Índice](#índice) | [Voltar ao Disclaimer](#disclaimer) | [Voltar ao System Design](#system-design) | [Voltar ao Stack](#stack)
