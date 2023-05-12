use finalProject;
create table users(
id int not null primary key auto_increment,
firstName varchar(30) not null,
lastName varchar(30) not null,
emailId varchar(30) not null unique,
mobileNumber varchar(10) not null,
password varchar(200) not null,
craetedAt datetime default current_timestamp,
updatedAT datetime default current_timestamp on update current_timestamp
);
insert into users (firstName,lastName,emailID,mobileNumber,password)values('Keval','Vadher','keval67@gmail.com','9890987656','Kewl12!');



create table offer(
offer_id int primary key auto_increment not null,
offerTitle varchar(255) not null,
offerImage varchar(255) not null,
offerCode varchar(200) not null unique,
merchants varchar(255) not null,
brands varchar(255) not null,
offerType enum('Pin','Merchant Code') not null,
minAmount int not null,
amtLimit int not null,
offerExpiryDate date not null,
termsAndConditions text,
createdAt datetime default current_timestamp,
updatedAt datetime default current_timestamp on update current_timestamp
);
insert into offer (offerTitle,offerImage,offerCode,merchants,brands,offerType,minAmount,amtLimit,offerExpiryDate,termsAndConditions)values('Diwali','img','dil200','flipkart','Nike','pin','100','1000',20-05-2022,'Only for new Users');

insert into offer (offerTitle,offerImage,offerCode,merchants,brands,offerType,minAmount,amtLimit,offerExpiryDate,termsAndCondition)values('holiOffer','img','holi10','flipkart','Nike','pin','100','1000',21/05/2022,'Only for new Users');

create table purchase_offer(
purchase_offer_id int primary key auto_increment not null,
user_id int not null,
offer_id int not null,
status enum('Available','Unavailable') not null,
createdAt datetime default current_timestamp,
updatedAt datetime default current_timestamp on update current_timestamp,
foreign key (user_id) references users(id),
foreign key (offer_id) references offer(offer_id)
);
insert into purchase_offer(user_id,offer_id,status) values(1,1,'Available');
insert into purchase_offer(user_id,offer_id,status) values(2,1,'Unavailable');



create table voucher(
voucher_id int primary key auto_increment not null,
voucherTitle varchar(255) not null,
voucherImage varchar(255) not null,
pointRate int not null,
merchants varchar(255) not null,
brands varchar(255) not null,
voucherCode varchar(200) not null unique,
denominationStep int not null,
denominationStart int not null,
denominationEnd int not null,
voucherExpiryDate date not null,
termsAndConditions text,
createdAt datetime default current_timestamp,
updatedAt datetime default current_timestamp on update current_timestamp
);
insert into voucher (voucherTitle,voucherImage,pointRate,merchants,brands,voucherCode,denominationStep,denominationStart,denominationEnd,voucherExpiryDate,termsAndCondition)values('Off10','img','100','flipkart','Nike','10','100','1000','2000',20/05/2022,'Only for new Users')

insert into voucher (voucherTitle,voucherImage,pointRate,merchants,brands,voucherCode,denominationStep,denominationStart,denominationEnd,voucherExpiryDate,termsAndCondition)values('SALE60','img','100','amazon','Nike','10','100','1000','2000',21/05/2022,'Only for new Users')



create table purchase_voucher(
purchase_voucher_id int primary key auto_increment not null,
user_id int not null,
voucher_id int not null,
status enum('Available','Unavailable') not null,
createdAt datetime default current_timestamp,
updatedAt datetime default current_timestamp on update current_timestamp,
foreign key (user_id) references users(id),
foreign key (voucher_id) references voucher(voucher_id)
);
insert into purchase_voucher(user_id,voucher_id,status) values(1,1,'Available');
insert into purchase_offer(user_id,offer_id,status) values(2,1,'Unavailable');


CREATE TABLE `orcData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requestedBy` varchar(30) NOT NULL,
  `totalCounter` varchar(255) NOT NULL,
  `sdcTime` datetime NOT NULL,
  `tin` varchar(255) NOT NULL,
  `locationName` varchar(255) NOT NULL,
  `totalAmount` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `transactionTypeCounter` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `signedBy` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `user_id`  int NOT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


insert into orcData(requestedBy,signedBy,totalCounter,sdcTime,tin,locationName,totalAmount,address,city,transactionTypeCounter,location,user_id)values('P6KCQBWA','P6KCQBWA','53315','2023-04-18 15:54:30','103882837','1005596-Zara Galerija','2.800,00','БУЛ��ВАР ВУДРОА ВИЛСОНА 12','49015','/public/orcUploads/ocr.html','1s')
