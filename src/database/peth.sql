CREATE SCHEMA `pet_h_grupo` ;
USE `pet_h_grupo`;

CREATE TABLE pet_h_grupo.usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_y_apellido VARCHAR(255) NOT NULL,
  user VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  id_rol INT NOT NULL,
  PRIMARY KEY (id));
  
  CREATE TABLE pet_h_grupo.rol (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  PRIMARY KEY (id));
  
  CREATE TABLE pet_h_grupo.factura (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  fecha DATE NOT NULL,
  valor FLOAT NOT NULL,
  PRIMARY KEY (id));
  
  CREATE TABLE pet_h_grupo.producto_factura (
  id INT NOT NULL AUTO_INCREMENT,
  id_factura INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio FLOAT NOT NULL,
  PRIMARY KEY (id));
  
  CREATE TABLE pet_h_grupo.producto (
  id INT NOT NULL AUTO_INCREMENT,
  id_marca INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  precio FLOAT NOT NULL,
  cantidad_descuento FLOAT NOT NULL,
  img VARCHAR(255) NOT NULL,
  descripcion MEDIUMTEXT NOT NULL,
  id_categoria INT NOT NULL,
  PRIMARY KEY (id));
  
  CREATE TABLE pet_h_grupo.marca (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  PRIMARY KEY (id));
  
  CREATE TABLE pet_h_grupo.categoria (
  id INT NOT NULL AUTO_INCREMENT,
  categoria VARCHAR(255) NOT NULL,
  PRIMARY KEY (id));

    ALTER TABLE `pet_h_grupo`.`categoria` 
ADD COLUMN `img` VARCHAR(255) NOT NULL AFTER `categoria`;
  
ALTER TABLE pet_h_grupo.producto 
ADD INDEX id_marca_idx (id_marca ASC),
ADD INDEX id_categoria_idx (id_categoria ASC);
;

ALTER TABLE pet_h_grupo.producto 
ADD CONSTRAINT id_marca
  FOREIGN KEY (id_marca)
  REFERENCES pet_h_grupo.marca (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT id_categoria
  FOREIGN KEY (id_categoria)
  REFERENCES pet_h_grupo.categoria (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  
  ALTER TABLE pet_h_grupo.factura 
ADD INDEX id_usuario_idx (id_usuario ASC);
;
ALTER TABLE pet_h_grupo.factura 
ADD CONSTRAINT id_usuario
  FOREIGN KEY (id_usuario)
  REFERENCES pet_h_grupo.usuario (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  ALTER TABLE pet_h_grupo.producto_factura 
ADD INDEX id_factura_idx (id_factura ASC),
ADD INDEX id_producto_idx (id_producto ASC);
;
ALTER TABLE pet_h_grupo.producto_factura 
ADD CONSTRAINT id_factura
  FOREIGN KEY (id_factura)
  REFERENCES pet_h_grupo.factura (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT id_producto
  FOREIGN KEY (id_producto)
  REFERENCES pet_h_grupo.producto (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;



INSERT INTO rol (id,nombre)
VALUES( DEFAULT, 'Admin');
  
INSERT INTO rol (id,nombre)
VALUES( DEFAULT, 'Cliente');


INSERT INTO categoria (id,categoria)
VALUES( DEFAULT, 'Alimento');

INSERT INTO categoria (id,categoria)
VALUES( DEFAULT, 'Snack');

INSERT INTO categoria (id,categoria)
VALUES( DEFAULT, 'Medicamentos');

INSERT INTO categoria (id,categoria)
VALUES( DEFAULT, 'Juguetes');

INSERT INTO marca (id,nombre)
VALUES( DEFAULT, 'Pedigree');

INSERT INTO marca (id,nombre)
VALUES( DEFAULT, 'Purina');

INSERT INTO marca (id,nombre)
VALUES( DEFAULT, "Hill's");

INSERT INTO marca (id,nombre)
VALUES( DEFAULT, 'Dog Chow');

INSERT INTO marca (id,nombre)
VALUES( DEFAULT, 'Italcol');

INSERT INTO marca (id, nombre)
VALUE (default, 'Equilibrio');

INSERT INTO marca (id, nombre)
VALUE (default, 'Dogourmet');

INSERT INTO marca (id, nombre)
VALUE (default, 'Mirringo');

INSERT INTO marca (id, nombre)
VALUE (default, 'Whiskas');


INSERT INTO usuario (id,nombre_y_apellido,user,email,direccion,password,img,id_rol)
VALUES(DEFAULT,'admin', 'admin', 'elgranadmin@pet.com', 'calle del admin', '$2a$10$6bdCimwGg3yItkbCjRpBaew/TXw3s9/HrDtpZfJV3Jq74T.C1c6jy','user1680142460883.png','1' );

INSERT INTO usuario (id,nombre_y_apellido,user,email,direccion,password,img,id_rol)
VALUES(DEFAULT,'maria', 'maria', 'maria@pet.com', 'calle de maria', '$2a$10$AdPsJ/kPzUyVwv1d.pj/2OqxMtwcbASupm1IyS6klar3yuWoi.Xme','user1680143028656.jpg','2' );


UPDATE categoria SET img = "categoria_alimento-min.png" 
WHERE id= 1;

UPDATE categoria SET img = "categoria_snacks-min.png" 
WHERE id= 2;

CREATE TABLE pet_h_grupo.tipo_mascota (
  id INT NULL AUTO_INCREMENT,
  tipo_mascota VARCHAR(255) NOT NULL,
  PRIMARY KEY (id));

  ALTER TABLE pet_h_grupo.producto 
ADD COLUMN id_tipo_mascota INT NOT NULL AFTER id_categoria;

ALTER TABLE pet_h_grupo.producto 
ADD INDEX id_tipo_mascota_idx (id_tipo_mascota ASC);
;
ALTER TABLE pet_h_grupo.producto 
ADD CONSTRAINT id_tipo_mascota
  FOREIGN KEY (id_tipo_mascota)
  REFERENCES pet_h_grupo.tipo_mascota (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

INSERT INTO tipo_mascota (id, tipo_mascota)
values (default, 'Perros');

INSERT INTO tipo_mascota (id, tipo_mascota)
values (default, 'Gatos');


INSERT INTO producto (id,id_marca,nombre,precio,cantidad_descuento,img,descripcion,id_categoria, id_tipo_mascota)
VALUES(DEFAULT, 1, 'Pedigree adulto', 54000, 10, 'product1674114989165.png','Alimento para perros adultos de razas grandes',1, 1 );

INSERT INTO producto (id,id_marca,nombre,precio,cantidad_descuento,img,descripcion,id_categoria, id_tipo_mascota)
VALUES(DEFAULT, 2, 'Proplan urinary', 60000, 0, 'product1674115037221.png','Alimento para gatos adultos', 1, 2);

INSERT INTO producto (id,id_marca,nombre,precio,cantidad_descuento,img,descripcion,id_categoria, id_tipo_mascota)
VALUES(DEFAULT, 2, 'Proplan adultos', 140000 , 0, 'product1674115117444.png','Alimento para perros adultos de razas pequeño',1 , 1);


INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 6, 'Equilibrio adultos', 58800, 20, 'EQUILIBRIO.png', ' Alimento para perros adultos de razas pequeñas', 1, 1);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 7, 'Dogourmet adultos', 57592, 0, 'dogurmet.png', ' Alimento para perros adultos de carne a la parrilla', 1, 1);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 8, 'Mirringo Pro adultos', 90525, 5, 'Mirringo.png', ' Alimento para gatos adultos cuidado urinario', 1, 2);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 9, 'Whiskas para adultos', 24460, 0, 'wiskas.png', ' Alimento para gatos adultos de carne', 1, 2);

UPDATE categoria
SET img = 'juguete-para-perros.jpg'
WHERE id = 4;

UPDATE categoria
SET img = 'medicamentos.jpg'
WHERE id = 3;

UPDATE usuario SET password = "$2a$10$oHXrad51jYQ9L/AtDH3dSOZ.nhUHGbIFkg15TxSvJNEAS8q3cQIAK" 
WHERE id= 1;

UPDATE usuario SET password = "$2a$10$oHXrad51jYQ9L/AtDH3dSOZ.nhUHGbIFkg15TxSvJNEAS8q3cQIAK" 
WHERE id= 2;

INSERT INTO marca (id,nombre)
VALUES( DEFAULT, 'Holliday');

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 10, 'TOTAL FULL LC GATOS', 170000, 0, 'totalfull.png', ' Antiparasitario interno oral de liberación controlada en comprimidos birranurados palatables.', 3, 2);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 10, 'Cardial B 10 mg x 20 Tabs', 82000, 0, 'cardial.png', ' Indicado para insuficiencia cardíaca en perros, debido a insuficiencia valvular o cardiomiopatía dilatada', 3, 1);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 2, 'Galletas sabor a pollo', 24460, 0, 'galleta Sabor Pollo.png', ' Galletas sabor a pollo para adultos medianos y grandes', 2 , 1);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 2, 'Dentalife', 30000, 10, 'dentaLife.png', ' Daily oral care treats ', 2 , 2);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 2, 'Pelota de goma', 11000, 0, 'pelotaDeGoma.png', ' Pelota de goma antisarro ', 4 , 1);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 1, 'gymCat', 30000, 10, 'gimansio.jpg', ' gimnasio para gatos,proporciona diversion y descanso a tu gatito ', 2 , 2);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 3, 'Lazo para perro', 12000, 0, 'lazoPerro.jpg', ' Lazo Knot para perro ', 4 , 1);

INSERT INTO producto (id, id_marca, nombre, precio, cantidad_descuento, img, descripcion, id_categoria, id_tipo_mascota)
VALUES (DEFAULT, 5, 'Ratón para gatos', 6000, 0, 'ratonParaGato.jpg', ' Ratón para gato ', 4 , 2);
