# --- !Ups
DROP TABLE groups_users;

create table groups_users (
  id                  bigint not null,
  group_id                  bigint not null,
  user_id                  bigint not null,
  constraint pk_groups_users primary key (id))
;

create sequence groups_users_seq;

# --- !Downs

DROP TABLE groups_users;

create table groups_users (
  group_id                  bigint not null,
  user_id                  bigint not null,
  constraint pk_groups_users primary key (group_id, user_id))
;