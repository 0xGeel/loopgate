-- Create and fill a table with unlockables

-- @DEV Only create this extension if it hasn't already been created.
-- create extension 'uuid-ossp' with schema extensions;

CREATE TABLE unlockables (
  id uuid default uuid_generate_v4(), 
  name text,
  description text,
  owner VARCHAR(42) NOT NULL,
  content_type_id int NOT NULL,
  content_url VARCHAR(200) NOT NULL,
  criteria_unlock_amount int NOT NULL,
  updated_at timestamp default current_timestamp,
  --
  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES users(eth_address),
  FOREIGN KEY (content_type_id) REFERENCES content_types(content_type_id),
  --
  constraint unlock_amount_nonnegative check (criteria_unlock_amount > 0)
);

-- Unlockable #1: HTML Blog Example
INSERT INTO unlockables (name, description, owner, content_type_id, content_url, criteria_unlock_amount) 
VALUES ('Token Gating with NFTs: Unlocking New Ways to Bring Value', 'This exclusive article contains a primer on what Token Gating is, and provides four actionable prompts on how to implement it to bring value to members of your community.', '0x1337cc354aeaf15b0e98a609cd348df171174e14', 1, 'bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m', 1);

-- Unlockable #2: MP4 Video Example
INSERT INTO unlockables (name, description, owner, content_type_id, content_url, criteria_unlock_amount) 
VALUES ('0x1337cc354aeaf15b0e98a609cd348df171174e14', 1, 'bafybeihx5eacyxeydcpvudwxa242rnjhn67femy46gzas5d2djb24ti5mi', 1);

-- Unlockable #3: Web Game Example
INSERT INTO unlockables (name, description, owner, content_type_id, content_url, criteria_unlock_amount) 
VALUES ('Flappy Bird: Origins', 'An incredibly exclusive web game built in Godot 3, optimized for browsers. Dodge the obstacles, and fly for your life...', '0x1337cc354aeaf15b0e98a609cd348df171174e14', 1, 'bafybeihhx5v3saq3b7n55ub5q3atuw2udbqc5ictkv2ih7vd3hxptu22nu', 2);