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

CREATE TABLE rates (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(150) NOT NULL,
  name VARCHAR(150) NOT NULL,
  room_id INT UNSIGNED NOT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT 0,
  check_in DATETIME NOT NULL,
  check_out DATETIME NOT NULL,
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

INSERT INTO hotels (code, name) VALUES
  ('AAA123', 'Hotel ABC'),
  ('BBB456', 'Hotel XYZ'),
  ('CCC789', 'Grand Hotel'),
  ('DDD321', 'Beach Resort'),
  ('EEE654', 'Riverside Lodge'),
  ('FFF987', 'Mountain View'),
  ('GGG012', 'The Plaza'),
  ('HHH345', 'Luxury Suites'),
  ('III678', 'Historic Inn'),
  ('JJJ910', 'City Center Hotel');

  INSERT INTO rooms (code, name, hotel_id) VALUES
  ('RM101', 'Standard Room', 1),
  ('RM102', 'Deluxe Room', 1),
  ('RM103', 'Suite', 1),
  ('RM201', 'Single Room', 2),
  ('RM202', 'Double Room', 2),
  ('RM203', 'Executive Suite', 2),
  ('RM301', 'Ocean View Room', 3),
  ('RM302', 'Beach Front Villa', 3),
  ('RM303', 'Luxury Suite', 3),
  ('RM401', 'River View Room', 4),
  ('RM402', 'Riverside Cottage', 4),
  ('RM403', 'Waterfront Suite', 4),
  ('RM501', 'Mountain View Room', 5),
  ('RM502', 'Cabin', 5),
  ('RM503', 'Treehouse', 5),
  ('RM601', 'Standard Room', 6),
  ('RM602', 'Deluxe Room', 6),
  ('RM603', 'Suite', 6),
  ('RM701', 'Junior Suite', 7),
  ('RM702', 'Executive Suite', 7),
  ('RM703', 'Presidential Suite', 7),
  ('RM801', 'Luxury Suite', 8),
  ('RM802', 'Premium Suite', 8),
  ('RM803', 'Royal Suite', 8),
  ('RM901', 'Historic Room', 9),
  ('RM902', 'Antique Suite', 9),
  ('RM903', 'Vintage Room', 9),
  ('RM1001', 'Standard Room', 10),
  ('RM1002', 'Deluxe Room', 10),
  ('RM1003', 'Suite', 10);


INSERT INTO rates (code, name, room_id, check_in, check_out)
VALUES
  ('R001', 'Standard Rate', 1, '2023-04-08 14:00:00', '2023-04-09 12:00:00'),
  ('R002', 'Premium Rate', 1, '2023-04-10 14:00:00', '2023-04-11 12:00:00'),
  ('R003', 'Business Rate', 2, '2023-04-12 14:00:00', '2023-04-13 12:00:00'),
  ('R004', 'Family Rate', 2, '2023-04-14 14:00:00', '2023-04-15 12:00:00'),
  ('R005', 'Holiday Rate', 3, '2023-04-16 14:00:00', '2023-04-17 12:00:00'),
  ('R006', 'Weekend Rate', 3, '2023-04-18 14:00:00', '2023-04-19 12:00:00'),
  ('R007', 'Extended Stay Rate', 4, '2023-04-20 14:00:00', '2023-04-21 12:00:00'),
  ('R008', 'Last Minute Rate', 4, '2023-04-22 14:00:00', '2023-04-23 12:00:00'),
  ('R009', 'Corporate Rate', 5, '2023-04-24 14:00:00', '2023-04-25 12:00:00'),
  ('R010', 'Senior Rate', 5, '2023-04-26 14:00:00', '2023-04-27 12:00:00');


INSERT INTO inventories (date, rate_id, price, availability) VALUES
  ('2023-04-08', 1, 100.00, 10),
  ('2023-04-09', 1, 100.00, 8),
  ('2023-04-10', 1, 120.00, 5),
  ('2023-04-11', 2, 150.00, 2),
  ('2023-04-12', 2, 150.00, 3),
  ('2023-04-13', 3, 200.00, 1),
  ('2023-04-14', 3, 200.00, 4),
  ('2023-04-15', 4, 250.00, 2),
  ('2023-04-16', 5, 300.00, 2),
  ('2023-04-17', 5, 300.00, 1);
