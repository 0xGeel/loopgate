 -- Create the (simplified) table
 CREATE TABLE unlocks (
 id SERIAL PRIMARY KEY,
 cid VARCHAR(59) NOT NULL,
 nftid VARCHAR (66) NOT NULL
 );

-- @DEV: since the unlock criteria will be upgraded in the future, significant refactors
-- will be due. TABLE unlocks would probably have an unlockType VARCHAR (..), and there
-- should be tables for things like NFT_IDs, MINTER_IDs, etcetera.
-- However, for this proof of concept we keep things simple.

 -- Insert some sample data into the table
 INSERT INTO unlocks (cid, nftid) VALUES ('bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m', '0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee');
 INSERT INTO unlocks (cid, nftid) VALUES ('bafybeihx5eacyxeydcpvudwxa242rnjhn67femy46gzas5d2djb24ti5mi', '0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c');
