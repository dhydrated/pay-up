# --- !Ups
alter table payees drop column amount;

# --- !Downs
alter table payees add column amount decimal(38);
