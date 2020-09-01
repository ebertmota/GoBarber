Mapeamento de Funcionalidades

# Recuperação de senha

**RF (Requisitos Funcionais)**

- O usuário deve poder recuperar sua senha senha informando seu email;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder redefinir sua senha;

**RNF (Requisitos Não Funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


**RN (Regras de Negocio)**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a sua nova senha para reseta-la;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu perfil, seu nome usuario e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser amazenadas no MongoDB;
- As notificações de prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida.

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;


**RN**

- Cada agendamento deve durar exatamente 1hr;
- Os agendamentos devem estar disponíveis entre 8h as 18h (Primeiro as 8h, ultimo as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
