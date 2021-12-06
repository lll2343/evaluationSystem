drop table if exists records;

-- 第一个测评，记数字，成功次数（可以推出最大长度）
-- 第二个测评，hanio 

-- hanoiSteps 用的步数
-- hanoiSeconds 用的时间

-- 第三个测评，逻辑推理题

create table records(
    mail varchar(30) primary key not null,
    remNum int,
    hanoiSteps int,
    hanoiSeconds int,
    mathQue char(20)
);