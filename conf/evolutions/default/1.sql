# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table payee (
  id                        bigint not null,
  name                      varchar(255),
  constraint pk_payee primary key (id))
;

create table payment (
  id                        bigint not null,
  name                      varchar(255),
  amount                    decimal(38),
  paid_date                 timestamp,
  payee_id                  bigint,
  constraint pk_payment primary key (id))
;

create sequence payee_seq;

create sequence payment_seq;

alter table payment add constraint fk_payment_payee_1 foreign key (payee_id) references payee (id);
create index ix_payment_payee_1 on payment (payee_id);



# --- !Downs

drop table if exists payee cascade;

drop table if exists payment cascade;

drop sequence if exists payee_seq;

drop sequence if exists payment_seq;

