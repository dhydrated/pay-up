# --- !Ups
INSERT INTO roles (id, name, code) VALUES (nextval('roles_seq'), 'Group Administrator', 'group_administrator');

# --- !Downs
DELETE FROM roles where code='group_administrator';

