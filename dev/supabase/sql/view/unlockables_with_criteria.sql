----- Code to create the view
-- CREATE VIEW unlockables_with_criteria_v2 AS
--     SELECT u.id, u.name, u.description, u.unlisted, u.owner, u.content_url, u.criteria_unlock_amount, u.updated_at, STRING_AGG(c.nft_id, ', ') AS nft_ids
--     FROM unlockables u
--     LEFT JOIN unlock_criteria c ON u.id = c.unlockable_id
--     GROUP BY u.id, u.name, u.description, u.owner, u.content_url, u.criteria_unlock_amount, u.updated_at

----- Test if it works
-- select * from unlockables_with_criteria_v2 

-- ALTER VIEW unlockables_with_criteria RENAME TO unlockables_with_criteria_backup
-- ALTER VIEW unlockables_with_criteria_v2 RENAME TO unlockables_with_criteria

----- Delete a previous one
-- DROP VIEW IF EXISTS unlockables_with_criteria_v2