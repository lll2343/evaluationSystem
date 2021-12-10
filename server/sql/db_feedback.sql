drop table if exists feedback;
create table feedback(
    id integer primary key AUTOINCREMENT,
    mail char(30) not null,
    content varchar(60)
);
