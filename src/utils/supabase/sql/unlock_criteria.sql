-- Create and fill a table with unlock criteria

CREATE TABLE unlock_criteria (
  id SERIAL,
  unlockable_id uuid NOT NULL,
  nft_id VARCHAR(66) NOT NULL,
  updated_at timestamp default current_timestamp,
  --
  PRIMARY KEY (id),
  FOREIGN KEY (unlockable_id) REFERENCES unlockables(id),
);

-- Criteria #1: Own '0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee' (GM #1) to unlock.
INSERT INTO unlock_criteria (unlockable_id, nft_id) 
VALUES ('ee3fd6ff-4718-4949-b621-f35ccad89ee4', '0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee');

-- Criteria #2: Own '0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c' (GM #2) to unlock.
INSERT INTO unlock_criteria (unlockable_id, nft_id) 
VALUES ('c9e21ebf-59cc-42dd-9dc4-fd427be153b9', '0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c');

-- Criteria #3: Own '0x3d483...27d9ee' & '0x8aa9d...37e78c' (GM #2) to unlock.
INSERT INTO unlock_criteria (unlockable_id, nft_id) 
VALUES ('3eade688-8839-4fd7-b97a-f7c5f5bfc6ad', '0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee');
INSERT INTO unlock_criteria (unlockable_id, nft_id) 
VALUES ('3eade688-8839-4fd7-b97a-f7c5f5bfc6ad', '0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c');