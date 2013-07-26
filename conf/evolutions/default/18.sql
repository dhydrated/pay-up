# --- !Ups
ALTER TABLE groups_users ADD COLUMN admin boolean default false;

# --- !Downs
ALTER TABLE groups_users DROP COLUMN admin;

