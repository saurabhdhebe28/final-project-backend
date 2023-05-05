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



