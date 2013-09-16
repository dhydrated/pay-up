# --- !Ups
create table credentials_backup as table credentials;
delete from credentials where id not in (select credential_id from users u join credentials c on u.credential_id = c.id);
update credentials set password =  md5(password);


# --- !Downs
drop table credentials;
create table credentials as table credentials_backup;
drop table credentials_backup;


