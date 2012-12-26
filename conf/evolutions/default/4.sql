# --- !Ups
alter table payments add column start_period timestamp;
alter table payments add column end_period timestamp;
alter table payments drop column year;
alter table payments drop column month;

# --- !Downs
alter table payments drop column start_period;
alter table payments drop column end_period;
alter table payments add column year integer;
alter table payments add column month integer;
