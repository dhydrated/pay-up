# --- !Ups
create table groups (
  id                       bigint not null,
  name                     varchar(255),
  constraint pk_groups primary key (id))
;

create table groups_users (
  group_id                  bigint not null,
  user_id                  bigint not null,
  constraint pk_groups_users primary key (group_id, user_id))
;

create sequence groups_seq;

INSERT INTO groups (id, name) VALUES (nextval('groups_seq'), 'Personal');

INSERT INTO groups_users (group_id, user_id) VALUES (
 (SELECT id FROM groups WHERE name='Personal'),
 (SELECT id FROM users WHERE name='dhydrated')
);

# --- !Downs

drop table if exists groups_users cascade;
drop table if exists groups cascade;

drop sequence if exists groups_seq;
