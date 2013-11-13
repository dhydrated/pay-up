# --- !Ups
INSERT INTO groups_users (id, group_id, user_id, admin) VALUES (
 nextval('groups_users_seq'),
 (SELECT id FROM groups WHERE name='Personal'),
 (SELECT id FROM users WHERE name='dhydrated'),
 'true'
);


# --- !Downs
delete from groups_users where 
group_id =  (SELECT id FROM groups WHERE name='Personal')
and user_id = (SELECT id FROM users WHERE name='dhydrated');


