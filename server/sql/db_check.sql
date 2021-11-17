drop table if exists ver;
create table ver(
    id integer primary key AUTOINCREMENT,
    mail char(30) not null,
    code char(6),
    time integer
);
