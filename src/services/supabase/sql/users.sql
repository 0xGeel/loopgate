-- Create and fill a table with users

CREATE TABLE users (
  eth_address VARCHAR(42),
  role_id int NOT NULL,
  --
  PRIMARY KEY (eth_address),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

INSERT INTO users (eth_address, role_id) VALUES ('0x1337cc354aeaf15b0e98a609cd348df171174e14', 1);