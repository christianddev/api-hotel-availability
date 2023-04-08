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

INSERT INTO hotels (code, name) VALUES
("HTL-001", "Hotel A"),
("HTL-002", "Hotel B"),
("HTL-003", "Hotel C"),
("HTL-004", "Hotel D"),
("HTL-005", "Hotel E"),
("HTL-006", "Hotel F"),
("HTL-007", "Hotel G"),
("HTL-008", "Hotel H"),
("HTL-009", "Hotel I"),
("HTL-010", "Hotel J");

INSERT INTO rooms (code, name, hotel_id) VALUES
("ROOM-001", "Room 1", 1),
("ROOM-002", "Room 2", 1),
("ROOM-003", "Room 3", 2),
("ROOM-004", "Room 4", 2),
("ROOM-005", "Room 5", 3),
("ROOM-006", "Room 6", 3),
("ROOM-007", "Room 7", 4),
("ROOM-008", "Room 8", 4),
("ROOM-009", "Room 9", 5),
("ROOM-010", "Room 10", 5);

CREATE UNIQUE INDEX rooms_code_hotel_id_uindex ON rooms (code, hotel_id);

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
