# --- !Ups
alter table users add column nick_name varchar(50);
update users set nick_name = replace(name, ' ', '');


# --- !Downs
alter table users drop column nick_name;


