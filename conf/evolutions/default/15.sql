# --- !Ups

update payments set payer_id=(SELECT id FROM users WHERE name='dhydrated');
update payment_templates set payer_id=(SELECT id FROM users WHERE name='dhydrated');
drop sequence if exists payers_seq;
drop table if exists payers cascade;

# --- !Downs

create table payers (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  constraint pk_payers primary key (id))
;

create sequence payers_seq;

INSERT INTO payers (id, name) VALUES (nextval('payers_seq'), 'Taufek Johar');

update payments set payer_id=(SELECT id FROM payers WHERE name='Taufek Johar');
drop sequence if exists payers_seq;