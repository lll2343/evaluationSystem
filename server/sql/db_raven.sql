drop table if exists raven;
-- 邮箱*
-- sex 性别
-- age 年龄
-- save 保存进度
-- testList 最后的所有做题记录
-- time 所用时间
-- rightCount 做对的题数

create table raven(
    mail varchar(30) primary key not null,
    sex char(2),
    age integer,
    save integer default 0,
    testList char(80),
    time integer default 0,
    rightCount integer
);
