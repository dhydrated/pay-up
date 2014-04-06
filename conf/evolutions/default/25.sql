# --- !Ups
create table countries (
  id                        bigint not null,
  name                      varchar(255),
  constraint pk_countries primary key (id))
;

create table states (
  id                        bigint not null,
  name                      varchar(255),
  constraint pk_states primary key (id))
;

create table addresses (
  id                        bigint not null,
  address1                  varchar(255),
  address2                  varchar(255),
  postcode                  varchar(5),
  state_id                  bigint,
  constraint pk_addresses primary key (id))
;

create table users_addresses (
  id                        bigint not null,
  user_id                  bigint not null,
  address_id                  bigint not null,
  constraint pk_users_addresses primary key (id))
;

create sequence countries_seq;
create sequence states_seq;
create sequence addresses_seq;
create sequence users_addresses_seq;

insert into countries (id,name) values (nextval('countries_seq'),'Malaysia');
insert into states (id,name) values (nextval('states_seq'),'Wilayah Perseketuan');
insert into states (id,name) values (nextval('states_seq'),'Selangor');


# --- !Downs
drop table if exists addresses cascade;
drop table if exists states cascade;
drop table if exists countries cascade;

drop sequence if exists addresses_seq;
drop sequence if exists states_seq;
drop sequence if exists countries_seq;


