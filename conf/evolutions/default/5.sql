# --- !Ups
create table reports (
  id                        bigint not null,
  name                      varchar(255),
  query                     varchar(4000),
  constraint pk_reports primary key (id))
;

create sequence reports_seq;


# --- !Downs

drop table if exists reports cascade;
drop sequence if exists reports_seq;