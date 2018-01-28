-- MySQL dump 10.14  Distrib 5.5.56-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: cafeteria
-- ------------------------------------------------------
-- Server version	5.5.56-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `cafeteria`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cafeteria` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cafeteria`;

--
-- Temporary table structure for view `all_admins`
--

DROP TABLE IF EXISTS `all_admins`;
/*!50001 DROP VIEW IF EXISTS `all_admins`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `all_admins` (
  `UID` tinyint NOT NULL,
  `userName` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `room` tinyint NOT NULL,
  `extension` tinyint NOT NULL,
  `password` tinyint NOT NULL,
  `picture` tinyint NOT NULL,
  `admin` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `all_products`
--

DROP TABLE IF EXISTS `all_products`;
/*!50001 DROP VIEW IF EXISTS `all_products`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `all_products` (
  `PID` tinyint NOT NULL,
  `pname` tinyint NOT NULL,
  `price` tinyint NOT NULL,
  `picture` tinyint NOT NULL,
  `availability` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `all_users`
--

DROP TABLE IF EXISTS `all_users`;
/*!50001 DROP VIEW IF EXISTS `all_users`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `all_users` (
  `UID` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `room` tinyint NOT NULL,
  `picture` tinyint NOT NULL,
  `extension` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `CID` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) NOT NULL,
  PRIMARY KEY (`CID`),
  UNIQUE KEY `CID` (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Hot Drinks'),(2,'Fresh Juice'),(3,'Soda'),(4,'hot'),(5,'jjjj'),(6,'test');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_contents`
--

DROP TABLE IF EXISTS `order_contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_contents` (
  `oc_OID` bigint(11) NOT NULL,
  `oc_PID` int(11) NOT NULL,
  `number` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`oc_PID`,`oc_OID`),
  KEY `oc_OID` (`oc_OID`,`oc_PID`),
  KEY `oc_OID_2` (`oc_OID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_contents`
--

LOCK TABLES `order_contents` WRITE;
/*!40000 ALTER TABLE `order_contents` DISABLE KEYS */;
INSERT INTO `order_contents` VALUES (111,1,2),(555,1,2),(1013,1,2),(1014,1,2),(1015,1,2),(1016,1,2),(1017,1,2),(1018,1,2),(1021,1,1),(1026,1,1),(1027,1,1),(111,2,4),(333,2,2),(444,2,3),(666,2,2),(1012,2,1),(1013,2,2),(1014,2,2),(1015,2,2),(1016,2,2),(1017,2,2),(1018,2,2),(1020,2,1),(1021,2,1),(1022,2,1),(1023,2,1),(1024,2,1),(1026,2,1),(222,3,1),(333,3,6),(444,3,1),(555,3,3),(222,4,2),(555,4,1),(1013,5,1),(1014,5,1),(1015,5,1),(1019,5,1),(1022,5,1),(1023,5,1),(1024,5,1),(1012,15,3),(1013,15,1),(1014,15,1),(1015,15,1),(1019,15,1),(1020,15,1),(1021,15,1),(1023,15,3),(1024,15,1),(1026,15,1),(1027,15,1),(1012,26,1),(1026,26,1),(1027,26,1),(1012,37,1),(1013,37,1),(1014,37,1),(1015,37,1),(1023,37,1),(1025,37,1),(1012,39,1),(1025,39,1);
/*!40000 ALTER TABLE `order_contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `OID` bigint(20) NOT NULL AUTO_INCREMENT,
  `o_UID` int(11) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `room` varchar(50) NOT NULL DEFAULT 'in place',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('processing','out for delivery','done') NOT NULL DEFAULT 'processing',
  PRIMARY KEY (`OID`),
  KEY `o_UID` (`o_UID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`o_UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=1028 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (111,1,NULL,'in place','2018-01-26 13:21:29','out for delivery'),(222,2,NULL,'in place','2018-01-19 13:47:29','out for delivery'),(333,3,NULL,'in place','2018-01-19 13:47:29','out for delivery'),(444,4,NULL,'in place','2018-01-19 13:47:29','out for delivery'),(555,1,NULL,'in place','2018-01-26 18:31:49','out for delivery'),(777,2,NULL,'in place','2018-01-19 13:47:56','processing'),(778,3,NULL,'in place','2018-01-19 21:06:40','processing'),(888,1,NULL,'in place','2018-01-26 13:22:59','processing'),(999,1,NULL,'in place','2018-01-26 15:38:46','processing'),(1000,1,'','1','2018-01-27 00:38:17','processing'),(1001,1,'','1','2018-01-27 00:39:25','processing'),(1002,1,'','1','2018-01-27 00:43:43','processing'),(1003,1,'','1','2018-01-27 00:44:22','processing'),(1004,1,'','1','2018-01-27 00:44:40','processing'),(1005,1,'','1','2018-01-27 00:44:42','processing'),(1006,1,'','1','2018-01-27 00:53:20','processing'),(1007,1,'','1','2018-01-27 00:53:44','processing'),(1008,1,'','1','2018-01-27 00:54:08','processing'),(1009,1,'more sugar','1','2018-01-27 00:57:06','processing'),(1010,1,'more sugar','1','2018-01-27 00:57:16','processing'),(1011,1,'more sugar','1','2018-01-27 00:57:29','processing'),(1013,1,'more sugar','1','2018-01-27 01:00:22','out for delivery'),(1014,1,'more sugar','1','2018-01-27 01:01:10','processing'),(1015,1,'more sugar','1','2018-01-27 01:01:34','processing'),(1016,1,'more sugar','1','2018-01-27 01:01:53','processing'),(1017,1,'more sugar','1','2018-01-27 01:03:32','processing'),(1018,1,'more sugar','1','2018-01-27 01:03:34','processing'),(1019,1,'more sugar','1','2018-01-27 01:17:24','processing'),(1020,1,'more sugar','1','2018-01-27 01:17:33','processing'),(1021,1,'','1','2018-01-27 01:23:01','processing'),(1022,1,'','1','2018-01-27 01:23:33','processing'),(1023,1,'','1','2018-01-27 01:23:53','processing'),(1024,1,'','1','2018-01-27 01:32:07','processing'),(1025,1,'','1','2018-01-27 01:32:47','processing'),(1026,1,'','1','2018-01-27 01:34:03','processing'),(1027,1,'','1','2018-01-27 01:40:14','processing');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `pname` varchar(50) NOT NULL,
  `p_CID` int(11) NOT NULL,
  `price` float NOT NULL,
  `picture` varchar(255) DEFAULT '',
  `availability` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`PID`) USING BTREE,
  UNIQUE KEY `pname` (`pname`),
  KEY `category` (`p_CID`),
  CONSTRAINT `category` FOREIGN KEY (`p_CID`) REFERENCES `categories` (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'tea',1,5,'',1),(2,'coffee',2,8,'',1),(3,'orange',2,12,'',1),(4,'Soda',3,6,'',0),(5,'nescafe',1,20,'',1),(15,'',1,4,'',1),(26,'assd',1,1,'',1),(37,'dcd',1,2,'',1),(39,'jbjb',1,1.5,'',1),(55,'wd',1,3.5,'',1),(60,'mon',1,4,'',1),(63,'ert',1,1.5,'',1),(64,'coffeeeee',1,1.5,'',1),(66,'aDD',1,0.5,'',1),(68,'hyy',3,1.5,'',1),(69,'dffffg',1,3.5,'/tmp/phph2uxhs',1),(70,'wfwf',1,2.5,'',1),(71,'dwd',1,1.5,'/tmp/phpULwo8h',1),(72,'efef',1,1,'/tmp/phpRpqgf6',1),(73,'efefwd',1,1,'/tmp/phpq34WrK',1),(74,'wdwdwd',1,2.5,'',1),(75,'wwr',1,1.5,'',1),(76,'wdw',1,111,'/tmp/phptOsUqw',1),(77,'ww',1,1,'/tmp/phpljxHHA',1),(78,'fefo',6,3.5,'/tmp/phpRSaeSW',1),(79,'edee',2,3,'/tmp/php8Qkomm',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `email` varchar(40) NOT NULL DEFAULT 'sdsd',
  `room` int(50) NOT NULL,
  `extension` int(11) DEFAULT NULL,
  `password` char(40) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`UID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'omran11','sdsd@sdsd.com',1,0,'12975910c3e6352b5b2bdee81fa2fc4653a5bd59','',0),(2,'ahmed@','sdsdd',2005,12545,'123456',NULL,0),(3,'mina@','d',2006,15485,'123456789',NULL,0),(4,'omran@','55',2008,124587,'124578',NULL,0),(5,'email','66',0,0,'password','picture',0),(8,'ahmed','77',1515,0,'125','',0),(9,'mohamed','sds55',1515,0,'125','',0),(11,'sds','4dcd',0,0,'swssd','',0),(13,'sfv','sdsdfvfv ',0,0,'swssd','',0),(17,'ahmeddcd','dvcd',0,0,'swssd','',0),(18,'gemy','sdsddvd',0,0,'swssd','',0),(19,'omran','sdsddc',0,0,'swssd','',0),(20,'admin','admin@admin.com',2,3,'d033e22ae348aeb5660fc2140aec35850c4da997','aaa',1),(21,'ad','adn@ad.com',2,3,'e9d2c4d7f41e32de0588a042036896d067b31c74','aaa',1),(22,'qsq','efefe@wdwd',0,0,'efefe@wdwd','',0),(23,'omran','omran@omran.com',2,3,'e9d2c4d7f41e32de0588a042036896d067b31c74','aaa',0),(24,'mohamed','aaa@aaa.aaa',12345,12345,'7c222fb2927d828af22f592134e8932480637c0d','',0),(25,'mohamed','omran@omran.come',123,154,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','',0),(26,'ahmed','ahmed@ahmed.com',12,12,'4cc19aaff82f60ac4097f935ab4a06ad4f0891cc','/tmp/phpMUMNA7',0),(27,'hassan','hassan@hassan.com',147,258,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpzqqOfl',0),(28,'hassan','hassan@hassan.come',12345,14597,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpafPFzO',0),(29,'hassan','hassan@hassan.comewq',12345,14597,'345120426285ff8b1d43653a4d078170b4761f75','/tmp/phpLmJTWF',0),(30,'ahmed','aaa@aaa.com',12,12,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpHoNaMT',0),(31,'ahmed','aab@aaa.com',12,12,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpb3VOlX',0),(32,'ahmed','aaaa@aaa.com',12,12,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpSuyKSK',0),(33,'hassan','hassan@hassan.comewqw',12345,14597,'345120426285ff8b1d43653a4d078170b4761f75','/tmp/phptUjTqm',0),(34,'ahmed','adaaa@aaa.com',12,12,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpIi44JV',0),(35,'hassan','hassan@hassan.comewqww',12345,14597,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpt3Qw3u',0),(36,'ahmed','adaada@aaa.com',12,12,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpvxka6y',0),(37,'ahmed','adaadfa@aaa.com',12,12,'4cc19aaff82f60ac4097f935ab4a06ad4f0891cc','/tmp/phpLc805D',0),(38,'asd','aa@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/php5dazKU',0),(39,'asd','adda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpcTA3y4',0),(40,'asd','adzzzda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpmIEuRU',0),(41,'medo','mhassan@sssf.com',14725836,1475,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpAj8Ez4',0),(42,'asd','adzzzcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpx9pUmu',0),(43,'medoqq','mhassan@sssf.com14',14725836,1475,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpBIZEQV',0),(44,'asd','adzczzcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpjUlXvn',0),(45,'asd','adzffczzcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpMPuY6G',0),(46,'medoqq','mhassan@sssf.com14w',14725836,1475,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpmrz7zG',0),(47,'mohamed','admin@admin.com15',123,1452,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpDJmQXc',0),(48,'sxscs','efeefe@efef.wefwede',147,258,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpDND4yJ',0),(49,'asd','adzffczczcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpFfrocj',0),(51,'asd','adccczffczcczcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpUZJQtK',0),(52,'asd','adccczffczcczvcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/php5PN29f',0),(53,'asd','adcccczffczcczvcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpag2hRP',0),(54,'asd','adccvcczffczcczvcda@aa.com',132,11,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpf3zJyq',0),(55,'afcsdfc','sdafsdf@sdf.csdf',12,12,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpM7015V',0),(57,'sdf','asd@sdaf.sdf',12,23,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpXZp8Ft',0),(58,'Mohamed Abdelmeged','mohamed@mohamd.com',123,123,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpNAy4Df',0),(59,'Mohamed Abdelmeged','m@m.m',123,123,'7c222fb2927d828af22f592134e8932480637c0d','/tmp/phpMGBd8E',0),(60,'wfwfefew','wefwef@wefwef.wefew',147,258,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpY8Yz0I',0),(61,'mohamedhassan','aaaaaaaa@aaaaaaa.asdas',123,456,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpT6IXC2',0),(62,'mohamedhassan','mmmm@mmmmm.mmmmmm',123,456,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpdDuzxW',0),(63,'mohamedhassan','mmmm@mmmmm.mmm',123,456,'d396f232a5ca1f7a0ad8f1b59975515123780553','/tmp/phpxox75R',0),(64,'mohamedhassan','mmmm@mmm.mmm',123,456,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','',0),(65,'mohamedhassan','nnn@nnn.com',123,456,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpqxvIyJ',0),(66,'wdcswcd','mmm@nnn.ccc',147,258,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpvScMzS',0),(67,'wdcswcd','mmm@nnn.sss',147,258,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpUqwBwQ',0),(68,'wdwew','hhh@hhh.ddd',123,456,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpX1rrfu',0),(69,'wdwew','hhh@hhh.dddws',123,456,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpux8oYR',0),(70,'eefefef','wdwdwd@efef.wdw',0,0,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','',0),(71,'asasdsd','amm@mmm.mmm',0,0,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpgi0kAy',0),(72,'sefsfesf','esfef@efwsef.ada',0,0,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/php2sn1Xz',0),(73,'qwdqwd','srfgs@efef.afe',0,0,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phpGNO8A6',0),(74,'wddedef','wdwddw@wefsef.adae',0,0,'f7c3bc1d808e04732adf679965ccc34ca7ae3441','/tmp/phptTac62',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `cafeteria`
--

USE `cafeteria`;

--
-- Final view structure for view `all_admins`
--

/*!50001 DROP TABLE IF EXISTS `all_admins`*/;
/*!50001 DROP VIEW IF EXISTS `all_admins`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`Otlobly`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `all_admins` AS select `users`.`UID` AS `UID`,`users`.`userName` AS `userName`,`users`.`email` AS `email`,`users`.`room` AS `room`,`users`.`extension` AS `extension`,`users`.`password` AS `password`,`users`.`picture` AS `picture`,`users`.`admin` AS `admin` from `users` where (`users`.`admin` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_products`
--

/*!50001 DROP TABLE IF EXISTS `all_products`*/;
/*!50001 DROP VIEW IF EXISTS `all_products`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`mhassan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_products` AS select `products`.`PID` AS `PID`,`products`.`pname` AS `pname`,`products`.`price` AS `price`,`products`.`picture` AS `picture`,`products`.`availability` AS `availability` from `products` */
/*!50002 WITH CASCADED CHECK OPTION */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_users`
--

/*!50001 DROP TABLE IF EXISTS `all_users`*/;
/*!50001 DROP VIEW IF EXISTS `all_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`mhassan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_users` AS select `users`.`UID` AS `UID`,`users`.`userName` AS `name`,`users`.`room` AS `room`,`users`.`picture` AS `picture`,`users`.`extension` AS `extension` from `users` */
/*!50002 WITH CASCADED CHECK OPTION */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-28 13:27:33
