CREATE VIEW unlockables_with_criteria AS
    SELECT u.id, u.name, u.description, u.owner, u.content_url, u.criteria_unlock_amount, u.updated_at, c.nft_id
    FROM unlockables u
    LEFT JOIN unlock_criteria c ON u.id = c.unlockable_id
