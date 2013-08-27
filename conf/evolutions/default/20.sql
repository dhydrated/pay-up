# --- !Ups
ALTER TABLE payments ADD COLUMN payee_account_number varchar(50);

# --- !Downs
ALTER TABLE payments DROP COLUMN payee_account_number;

