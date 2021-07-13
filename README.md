# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastro de um carro com uma placa já existente.

O carro dever ser cadastrado como disponibilidade por parão.
O cadastro do carro só pode ser feito pelo ADM.

# Editar Carros

Não deve ser possível alterar a placa de um carro já cadastrado.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Dece ser possível listar todos os carros disponíveis pela nome da categoria
Dece ser possível listar todos os carros disponíveis pela nome do carro
Dece ser possível listar todos os carros disponíveis pela da marca

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma expecificação para um carro.
Deve ser possívl listar todas as expecificações
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O cadastro do carro só pode ser feito pelo ADM.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível mistar todos os carros.

**RF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma igame para o mesmo carro
O ususário responsável pel cadastro deve ser um usuário adm.

# Aluguel de carro

**RF**
De ser possível cadastrar um aluguel

**RN**

**RN**
O alguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exixta um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exixta um aberto para o mesmo carro.
Ao realizar um aluguel o status do carro deverá ser alterado para indisponível

# Devolução de carro

**RF**
Deve ser oissível realizar a decolução de um carro


**RN**
Se o carro for devolvvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução,o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o tatal do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobraddo multa proporcional aso dias de atraso.
Caso haka multa, deverá ser somando ao total de aluguel.

# Recuperação de senha

**RF**
- Deve ser possível usuário recuperar a senha informando o e-mail
- O usuário deve rceber um email com o passo a passo para a recuperação da senha
- O usuario deve conseguir uma nova senha

**RN**

- O usuario precisa informar uma nova senha
- O link enviado para a recuperação de senha
