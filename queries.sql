create database finalProject;
use finalProject;

create table voucher(
voucher_id int primary key auto_increment,
voucherTitle varchar(255) not null,
voucherImage varchar(100) not null,
pointRate int not null,
merchants varchar(100) unique not null,
brands varchar(100) unique not null,
denominationStep int,
denominationStart int,
denominationEnd int,
voucherExpiryDate date,
voucherCode varchar(10),
termsAndConditions text
);
select*from voucher;
drop table voucher;

create table offer(
offer_id int primary key auto_increment,
offerTitle varchar(255) not null,
offerImage varchar(100) not null,
offerCode varchar(10),
merchants varchar(100) unique not null,
brands varchar(100) unique not null,
minAmount int not null,
offerType enum("PIN","Merchant Code"),
amtLimit int,
offerExpiryDate date,
termsAndConditions text
);
select*from offer;
drop table offer;

