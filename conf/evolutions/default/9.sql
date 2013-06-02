# --- !Ups
create table payment_artifacts (
  id              bigint not null,
  name            varchar(255),
  type            varchar(255),
  data            bytea,
  payment_id        bigint,
  constraint pk_payment_artifacts primary key (id))
;

create sequence payment_artifacts_seq;

# --- !Downs
drop table if exists payment_artifacts cascade;

drop sequence if exists payment_artifacts_seq;