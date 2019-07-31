alter table user_role drop constraint FKfpm8swft53ulq2hl11yplpr5;
drop table if exists car cascade;
drop table if exists user_role cascade;
drop table if exists usr cascade;
drop sequence if exists hibernate_sequence;
create sequence hibernate_sequence start 1 increment 1;
create table car (
  id int8 not null,
  client_address varchar(255),
  about_car varchar(300),
  master_name varchar(255),
  mileage int4 not null,
  car_model varchar(255),
  owner varchar(255),
  client_phone varchar(255),
  year_of_issue timestamp, primary key (id)
);
create table user_role (user_id int8 not null, roles varchar(255));
create table usr (id int8 not null, active boolean not null, password varchar(255), username varchar(255), primary key (id));
alter table user_role add constraint FKfpm8swft53ulq2hl11yplpr5 foreign key (user_id) references usr;