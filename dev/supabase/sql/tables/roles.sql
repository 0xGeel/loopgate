-- 🦻 NOTE: Currently not in use

-- Create and fill a table with the available user roles

CREATE TABLE roles (
  role_id SERIAL,
  role_name VARCHAR(20) NOT NULL,
  --
  PRIMARY KEY (role_id)
);

INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('user');