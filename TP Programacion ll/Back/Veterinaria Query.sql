CREATE DATABASE VETERINARIA_TP
GO
USE VETERINARIA_TP
GO

CREATE TABLE Tipos(
id_tipo int identity(1,1),
nombre varchar(80)
CONSTRAINT pk_tipo primary key(id_tipo)
)

GO

CREATE TABLE Clientes(
id_cliente int identity(1,1),
nombre varchar(80),
sexo varchar(10),
codigo int
CONSTRAINT pk_cliente primary key(id_cliente)
)

GO

CREATE TABLE Mascotas(
id_mascota int identity(1,1),
id_tipo int,
id_cliente int,
nombre varchar(80),
edad int
CONSTRAINT pk_mascota primary key(id_mascota)
CONSTRAINT fk_tipo foreign key (id_tipo) REFERENCES Tipos(id_tipo),
CONSTRAINT fk_cliente foreign key(id_cliente) REFERENCES Clientes(id_cliente)
)

GO

CREATE TABLE Atencion(
id_atencion int identity(1,1),
id_mascota int,
fecha datetime,
descripcion varchar(100),
importe float
CONSTRAINT pk_atencion primary key(id_atencion)
CONSTRAINT fk_mascota foreign key(id_mascota) REFERENCES Mascotas(id_mascota)
)
GO

CREATE TABLE Usuarios(
id_usuario int identity (1,1),
NUsuario varchar(40),
contraseña varchar(40)

CONSTRAINT pk_id_usuario primary key (id_usuario)
)
go

												--INSERTS--
-- Inserts en Tipos
INSERT INTO Tipos (nombre) VALUES 
('Perro'), 
('Gato'), 
('Ave');
GO
-- Inserts en Clientes
INSERT INTO Clientes (nombre, sexo, codigo) VALUES 
('Juan Perez', 'Masculino', 101),
('Maria Gomez', 'Femenino', 102),
('Carlos Lopez', 'Masculino', 103),
('Mariana Juarez','No Binario',104);
GO
-- Inserts en Mascotas
INSERT INTO Mascotas (id_tipo, id_cliente, nombre, edad) VALUES 
(1, 1, 'Rex', 5), 
(2, 2, 'Michi', 3), 
(3, 3, 'Paco', 2);
GO
-- Inserts en Atencion
INSERT INTO Atencion (id_mascota, fecha, descripcion, importe) VALUES 
(1, '2024-11-02 10:00', 'Consulta general', 300.50),
(2, '2024-11-02 11:00', 'Vacunacion', 150.00),
(3, '2024-11-02 12:00', 'Chequeo anual', 250.75);

INSERT INTO Usuarios (NUsuario, contraseña) VALUES 
('Admin','contra123')