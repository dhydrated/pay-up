# --- !Ups

ALTER TABLE payments ADD COLUMN year integer;
ALTER TABLE payments ADD COLUMN month integer;

insert into users (id,name,email,password) values (nextval('users_seq'),'dhydrated','dhydrated@gmail.com','payupnow');

# --- !Downs


ALTER TABLE payments DROP COLUMN year integer;
ALTER TABLE payments DROP COLUMN month integer;

delete from users;