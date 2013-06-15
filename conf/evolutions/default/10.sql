# --- !Ups
alter table payments alter column amount type numeric(38,2);
alter table payment_templates alter column amount type numeric(38,2);

# --- !Downs
alter table payments alter column amount type numeric(38,0);
alter table payment_templates alter column amount type numeric(38,0);