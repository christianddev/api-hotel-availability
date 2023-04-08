CREATE DATABASE hotel_availability;

USE hotel_availability;

CREATE TABLE hotels (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(150) NOT NULL,
  name VARCHAR(150) NOT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX hotels_code_uindex ON hotels (code);

CREATE TABLE rooms (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(150) NOT NULL,
  name VARCHAR(150) NOT NULL,
  hotel_id INT UNSIGNED NOT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT rooms_hotel_id_fk FOREIGN KEY (hotel_id) REFERENCES hotels (id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX rooms_code_hotel_id_uindex ON rooms (code, hotel_id);

INSERT INTO hotels (code, name) VALUES ('H001', 'Hotel Casa Blanca');
INSERT INTO hotels (code, name) VALUES ('H002', 'Hotel El Dorado');
INSERT INTO hotels (code, name) VALUES ('H003', 'Hotel Las Palmas');
INSERT INTO hotels (code, name) VALUES ('H004', 'Hotel Playa Azul');
INSERT INTO hotels (code, name) VALUES ('H005', 'Hotel San Rafael');
INSERT INTO hotels (code, name) VALUES ('H006', 'Hotel Santa Maria');
INSERT INTO hotels (code, name) VALUES ('H007', 'Hotel Sol y Mar');
INSERT INTO hotels (code, name) VALUES ('H008', 'Hotel Villa Blanca');
INSERT INTO hotels (code, name) VALUES ('H009', 'Hotel Vista Hermosa');
INSERT INTO hotels (code, name) VALUES ('H010', 'Hotel Los Cocos');

INSERT INTO rooms (code, name, hotel_id) VALUES ('R001', 'Habitación Deluxe', 1);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R002', 'Habitación Estándar', 1);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R003', 'Habitación Ejecutiva', 2);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R004', 'Habitación Premium', 2);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R005', 'Habitación Junior Suite', 3);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R006', 'Habitación Suite Presidencial', 3);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R007', 'Habitación Superior', 4);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R008', 'Habitación Clásica', 5);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R009', 'Habitación Standard Plus', 6);
INSERT INTO rooms (code, name, hotel_id) VALUES ('R010', 'Habitación Grand Suite', 7);

CREATE TABLE rates (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(150) NOT NULL,
  name VARCHAR(150) NOT NULL,
  room_id INT UNSIGNED NOT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT rates_room_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX rates_code_uindex ON rates (code);

CREATE TABLE inventories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  rate_id INT UNSIGNED NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  availability INT UNSIGNED NOT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT inventories_rate_id_fk FOREIGN KEY (rate_id) REFERENCES rates (id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX inventories_date_rate_id_uindex ON inventories (date, rate_id);
