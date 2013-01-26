# --- !Ups

alter table reports add column chart_type varchar(15);


# --- !Downs

alter table reports drop column chart_type;