Sistema de Veículos – Backend

API REST para gerenciar veículos, autenticação e visualização de dados, construída com NestJS e JWT via cookies.

🛠 Tecnologias

NestJS
 – framework Node.js

TypeScript

JWT
 – autenticação via token

cookie-parser

MySQL
class-validator / class-transformer
 – validação de DTOs

⚡ Funcionalidades

Cadastro e login de usuários (com rotas públicas)

Autenticação via JWT armazenado em cookies

CRUD de veículos:

Adicionar, editar, excluir veículos

Listar todos os veículos

Importar imagem do veículo

Visualizar detalhes de um veículo

Refresh token para renovação de sessão

Proteção de rotas privadas com middleware/guard
