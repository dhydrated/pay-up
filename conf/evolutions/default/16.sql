# --- !Ups
ALTER TABLE users ADD COLUMN account_number varchar(255);
ALTER TABLE users ADD COLUMN description varchar(255);
ALTER TABLE users ADD COLUMN payee_id bigint;

INSERT INTO users (id, name, email, credential_id, account_number, description, payee_id)  
(
    SELECT nextval('users_seq'), p.name, null, 
    nextval('credentials_seq'),
    p.account_number, p.description, p.id
    FROM payees p
);

INSERT INTO credentials (id, password)
(
    SELECT
    s.credential_id, 'payupnow'
    FROM
    users s
    WHERE payee_id IS NOT NULL
);

alter table payments drop constraint fk_payments_payee_1;

UPDATE payments p SET payee_id=u.id
FROM users u WHERE u.payee_id=p.payee_id;


UPDATE payment_templates p SET payee_id=u.id
FROM users u WHERE u.payee_id=p.payee_id;


alter table payments add constraint fk_payments_payee_1 foreign key (payee_id) references users (id);
alter table payments add constraint fk_payments_payer_1 foreign key (payer_id) references users (id);

# --- !Downs
alter table payments drop constraint fk_payments_payee_1;
alter table payments drop constraint fk_payments_payer_1;

UPDATE payment_templates p SET payee_id=u.payee_id
FROM users u WHERE u.id=p.payee_id;

UPDATE payments p SET payee_id=u.payee_id
FROM users u WHERE u.id=p.payee_id;

DELETE FROM credentials WHERE id IN 
(
   SELECT credential_id FROM users WHERE payee_id IS NOT NULL 
);

DELETE FROM users WHERE payee_id IS NOT NULL;

ALTER TABLE users DROP COLUMN account_number;
ALTER TABLE users DROP COLUMN description;
ALTER TABLE users DROP COLUMN payee_id;

alter table payments add constraint fk_payments_payee_1 foreign key (payee_id) references payees (id);
