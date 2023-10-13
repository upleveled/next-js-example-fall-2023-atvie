-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(30)
);

-- Insert some animals (C in CRUD - Create)
INSERT INTO animals
 (first_name, type, accessory)
VALUES
  ('lucia',  'Lion', 'Car'),
  ('macca',  'Dog', 'Comb'),
  ('jojo',  'Dodo', 'Dojo'),
  ('flo',  'Parrot', 'carrot'),
  ('bili',  'Capybara', 'Pen');

-- Read some animals (R in CRUD - Read)
SELECT * FROM animals;



CREATE DATABASE fall_2023;
CREATE USER fall_2023 WITH ENCRYPTED PASSWORD 'fall_2023';
GRANT ALL PRIVILEGES ON DATABASE fall_2023 TO fall_2023;
\connect fall_2023;
CREATE SCHEMA fall_2023 AUTHORIZATION fall_2023;