CREATE SCHEMA `pet_h_grupo` ;

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


INSERT INTO usuario (id,nombre_y_apellido,user,email,direccion,password,img,id_rol)
VALUES(DEFAULT,'admin', 'admin', 'elgranadmin@pet.com', 'calle del admin', '$2a$10$6bdCimwGg3yItkbCjRpBaew/TXw3s9/HrDtpZfJV3Jq74T.C1c6jy','user1680142460883.webp','1' );

INSERT INTO usuario (id,nombre_y_apellido,user,email,direccion,password,img,id_rol)
VALUES(DEFAULT,'maria', 'maria', 'maria@pet.com', 'calle de maria', '$2a$10$AdPsJ/kPzUyVwv1d.pj/2OqxMtwcbASupm1IyS6klar3yuWoi.Xme','user1680143028656.jpg','2' );

