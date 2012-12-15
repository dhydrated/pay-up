# --- !Ups

insert into users (id,name,email,password) values (nextval('users_seq'),'dhydrated','dhydrated@gmail.com','payupnow');

# --- !Downs

delete from users;