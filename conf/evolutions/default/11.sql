# --- !Ups
create table payers (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  constraint pk_payers primary key (id))
;

create sequence payers_seq;

INSERT INTO payers (id, name) VALUES (nextval('payers_seq'), 'Taufek Johar');

ALTER TABLE payment_templates ADD COLUMN payer_id bigint;

UPDATE payment_templates SET payer_id = (SELECT id FROM payers WHERE name = 'Taufek Johar');

ALTER TABLE payments ADD COLUMN payer_id bigint;

UPDATE payments SET payer_id = (SELECT id FROM payers WHERE name = 'Taufek Johar');

# --- !Downs

drop table if exists payers cascade;

drop sequence if exists payers_seq;

ALTER TABLE payment_templates DROP COLUMN payee_id;

ALTER TABLE payments DROP COLUMN payee_id;
