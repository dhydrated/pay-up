# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table payees (
  id                        bigint not null,
  name                      varchar(255),
  constraint pk_payees primary key (id))
;

create table payments (
  id                        bigint not null,
  name                      varchar(255),
  amount                    decimal(38),
  paid_date                 timestamp,
  payee_id                  bigint,
  constraint pk_payments primary key (id))
;

create table users (
  id                        bigint not null,
  name                      varchar(255),
  email                     varchar(255),
  password                  varchar(255),
  constraint pk_users primary key (id))
;

create sequence payees_seq;

create sequence payments_seq;

create sequence users_seq;

alter table payments add constraint fk_payments_payee_1 foreign key (payee_id) references payees (id);
create index ix_payments_payee_1 on payments (payee_id);



# --- !Downs

drop table if exists payees cascade;

drop table if exists payments cascade;

drop table if exists users cascade;

drop sequence if exists payees_seq;

drop sequence if exists payments_seq;

drop sequence if exists users_seq;

