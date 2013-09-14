# --- !Ups
ALTER TABLE users DROP COLUMN payee_id;
DROP TABLE payees;

# --- !Downs
ALTER TABLE users ADD COLUMN payee_id bigint;

