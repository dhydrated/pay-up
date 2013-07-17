# --- !Ups
create table credentials (
  id                       bigint not null,
  password                 varchar(255),
  constraint pk_credentials primary key (id))
;


ALTER TABLE users ADD COLUMN credential_id bigint;
ALTER TABLE users DROP COLUMN password;

create sequence credentials_seq;

INSERT INTO credentials (id, password) VALUES (nextval('credentials_seq'), 'payupnow');

UPDATE users SET credential_id=(SELECT id FROM credentials WHERE password='payupnow')
WHERE name='dhydrated';

# --- !Downs

ALTER TABLE users ADD COLUMN password varchar(255);
ALTER TABLE users DROP COLUMN credential_id;
drop table if exists credentials cascade;
drop sequence if exists credentials_seq;
