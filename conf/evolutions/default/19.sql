# --- !Ups
ALTER TABLE payment_templates ADD COLUMN payee_account_number varchar(50);

# --- !Downs
ALTER TABLE payment_templates DROP COLUMN payee_account_number;

