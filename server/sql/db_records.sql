drop table if exists records;

-- 第一个测评，记数字
-- 用一系列的01进行记录

-- 第二个测评，
create table records(
    mail varchar(30) primary key not null,
    remNum char(20),
    
    foreign key users(mail)
);