drop table if exists users;

create table users(
    mail varchar(30) primary key not null,
    iv varchar(60) not null,
    content varchar(60) not null,
    username varchar(10) default ''
);