# --- !Ups
alter table payments add column payment_type_id bigint;

# --- !Downs
alter table payments drop column payment_type_id;
