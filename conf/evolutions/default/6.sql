# --- !Ups

create table payment_templates (
  id                        bigint not null,
  payee_id                  bigint,
  payment_type_id           bigint,
  amount                    decimal(38),
  constraint pk_payment_templates primary key (id))
;

create sequence payment_templates_seq;


# --- !Downs

drop table if exists payment_templates cascade;

drop sequence if exists payment_templates_seq;