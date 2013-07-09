# --- !Ups
create table roles (
  id                       bigint not null,
  name                     varchar(255),
  code		               varchar(50),
  constraint pk_roles primary key (id))
;

create table users_roles (
  user_id                  bigint not null,
  role_id                  bigint not null,
  constraint pk_users_roles primary key (user_id, role_id))
;

create sequence roles_seq;

INSERT INTO roles (id, name, code) VALUES (nextval('roles_seq'), 'Administrator', 'administrator');

INSERT INTO users_roles (user_id, role_id) VALUES (
 (SELECT id FROM users WHERE name='dhydrated'),
 (SELECT id FROM roles WHERE name='Administrator')
);

# --- !Downs

drop table if exists users_roles cascade;
drop table if exists roles cascade;

drop sequence if exists roles_seq;
