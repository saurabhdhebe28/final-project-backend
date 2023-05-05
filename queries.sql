create database finalProject;
use finalProject;

CREATE TABLE `voucher` (
  `voucher_id` int NOT NULL AUTO_INCREMENT,
  `voucherTitle` varchar(255) NOT NULL,
  `voucherImage` varchar(100) NOT NULL,
  `pointRate` int NOT NULL,
  `merchants` varchar(100) NOT NULL,
  `brands` varchar(100) NOT NULL,
  `denominationStep` int DEFAULT NULL,
  `denominationStart` int DEFAULT NULL,
  `denominationEnd` int DEFAULT NULL,
  `voucherExpiryDate` date DEFAULT NULL,
  `status` enum('Available','Unavailable') DEFAULT 'Available',
  `voucherCode` varchar(10) DEFAULT NULL,
  `termsAndConditions` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`voucher_id`),
  UNIQUE KEY `merchants` (`merchants`),
  UNIQUE KEY `brands` (`brands`)
) 

-- select*from voucher;
-- -- get all the voucher
-- knex.select('*').from('voucher').then(()=>console.log('fetched all data succesfully'))
-- -- grt voucher by code 
-- knex.select('*').from('voucher').where('voucherCode', req.body.offerCode)-- .then(() => console.log('fetched all data succesfully by offerCode'))
-- -- update status
-- knex.select('*').from('offer').where('voucherCode', req.body.voucherCode).update({status: 'unavailable'})


CREATE TABLE `offer` (
  `offer_id` int NOT NULL AUTO_INCREMENT,
  `offerTitle` varchar(255) NOT NULL,
  `offerImage` varchar(100) NOT NULL,
  `offerCode` varchar(100) DEFAULT NULL,
  `merchants` varchar(100) NOT NULL,
  `brands` varchar(100) NOT NULL,
  `minAmount` int NOT NULL,
  `offerType` enum('PIN','Merchant Code') DEFAULT NULL,
  `status` enum('Available','Unavailable') DEFAULT 'Available',
  `amtLimit` int DEFAULT NULL,
  `offerExpiryDate` date DEFAULT NULL,
  `termsAndConditions` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`offer_id`),
  UNIQUE KEY `merchants` (`merchants`),
  UNIQUE KEY `brands` (`brands`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- select*from offer;
-- -- get all offers
-- knex.select('*').from('offer')-- .then(() => console.log('fetched all data succesfully'))
-- -- get offer by code
-- knex.select('*').from('offer').where('offerCode', req.body.offerCode)-- .then(() => console.log('fetched all data succesfully by offerCode'))
-- -- update status
-- knex.select('*').from('offer').where('offerCode', req.body.offerCode).update({status: 'unavailable'})
-- drop table offer;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `emailId` varchar(30) NOT NULL,
  `mobileNumber` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailId` (`emailId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `purchase_voucher` (
  `purchase_voucher_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `voucher_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchase_voucher_id`),
  KEY `user_id` (`user_id`),
  KEY `voucher_id` (`voucher_id`),
  CONSTRAINT `purchase_voucher_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `purchase_voucher_ibfk_2` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`voucher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

