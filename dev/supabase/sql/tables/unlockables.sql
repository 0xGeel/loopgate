-- Create and fill a table with unlockables

-- @DEV Only create this extension if it hasn't already been created.
-- create extension 'uuid-ossp' with schema extensions;

CREATE TABLE unlockables (
  id uuid not null default uuid_generate_v4(), 
  name text null,
  description text null,
  owner VARCHAR(42) not null,
  unlisted boolean not null default true,
  content_type_id int not null,
  content_url VARCHAR(200) not null,
  criteria_unlock_amount int not null,
  updated_at timestamp without time zone default not null current_timestamp default current_timestamp,
  created_at timestamp without time zone default not null default now(),
  --
  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES users(eth_address),
  FOREIGN KEY (content_type_id) REFERENCES content_types(content_type_id),
  --
  constraint unlock_amount_nonnegative check (criteria_unlock_amount > -2)
);

-- Unlockable #1: HTML Blog Example
INSERT INTO unlockables (name, description, owner, content_type_id, content_url, criteria_unlock_amount, unlisted) 
VALUES ('Token Gating with NFTs: Unlocking New Ways to Bring Value', 'This exclusive article contains a primer on what Token Gating is, and provides four actionable prompts on how to implement it to bring value to members of your community.', '0x1337cc354aeaf15b0e98a609cd348df171174e14', 1, 'bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m', 1, false);

-- Unlockable #2: MP4 Video Example
INSERT INTO unlockables (name, description, owner, content_type_id, content_url, criteria_unlock_amount, unlisted) 
VALUES ('0x1337cc354aeaf15b0e98a609cd348df171174e14', 1, 'bafybeihx5eacyxeydcpvudwxa242rnjhn67femy46gzas5d2djb24ti5mi', 1, false);

-- Unlockable #3: Web Game Example
INSERT INTO unlockables (name, description, owner, content_type_id, content_url, criteria_unlock_amount, unlisted) 
VALUES ('Flappy Bird: Origins', 'An incredibly exclusive web game built in Godot 3, optimized for browsers. Dodge the obstacles, and fly for your life...', '0x1337cc354aeaf15b0e98a609cd348df171174e14', 1, 'bafybeihhx5v3saq3b7n55ub5q3atuw2udbqc5ictkv2ih7vd3hxptu22nu', 2, false);