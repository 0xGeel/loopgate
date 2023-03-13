-- Create and fill a table with the available content types

CREATE TABLE content_types (
  content_id SERIAL,
  content_name VARCHAR(20) NOT NULL,
  --
  PRIMARY KEY (content_id)
);

INSERT INTO content_types (content_name) VALUES ('IPFS');