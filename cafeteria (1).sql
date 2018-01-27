-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 27, 2018 at 09:55 AM
-- Server version: 5.5.56-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cafeteria`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`mhassan`@`localhost` PROCEDURE `checks`(IN `startDate` DATE, IN `endDate` DATE)
    NO SQL
BEGIN
SELECT users.UID, users.userName, sum(order_contents.number*products.price) as "total_amount"
FROM order_contents, products, orders, users
WHERE orders.OID=order_contents.oc_OID
AND products.PID=order_contents.oc_PID
AND users.UID=orders.o_UID

AND date(orders.date)>=startDate
AND date(orders.date)<=endDate
Group BY users.UID;
END$$

CREATE DEFINER=`mhassan`@`localhost` PROCEDURE `home_orders`()
    NO SQL
BEGIN
SELECT orders.date, users.userName, orders.room, users.extension, sum(order_contents.number*products.price) as "total_amount"
FROM order_contents, products, orders, users
WHERE orders.OID=order_contents.oc_OID
AND products.PID=order_contents.oc_PID
AND users.UID=orders.o_UID
AND orders.status='processing'

Group BY orders.OID;
END$$

CREATE DEFINER=`mhassan`@`localhost` PROCEDURE `my_order`(IN `uid` INT, IN `startdate` DATE, IN `enddate` DATE)
    NO SQL
BEGIN
SELECT orders.OID, orders.date, orders.status, sum(order_contents.number*products.price) as "total_amount"
FROM order_contents, products, orders, users
WHERE orders.OID=order_contents.oc_OID
AND products.PID=order_contents.oc_PID
AND users.UID=orders.o_UID
AND UID=userId
AND date(orders.date)>=startDate
AND date(orders.date)<=endDate
Group BY orders.OID;
END$$

CREATE DEFINER=`mhassan`@`localhost` PROCEDURE `my_orders`(IN `userId` INT, IN `startDate` DATE, IN `endDate` DATE)
    DETERMINISTIC
    SQL SECURITY INVOKER
BEGIN
SELECT orders.OID, orders.date, orders.status, sum(order_contents.number*products.price) as "total_amount"
FROM order_contents, products, orders, users
WHERE orders.OID=order_contents.oc_OID
AND products.PID=order_contents.oc_PID
AND users.UID=orders.o_UID
AND UID=userId
AND date(orders.date)>=startDate
AND date(orders.date)<=endDate
Group BY orders.OID;
end$$

CREATE DEFINER=`mhassan`@`localhost` PROCEDURE `order_expand`(IN `curOID` BIGINT)
    NO SQL
BEGIN
SELECT products.pname, products.price, products.PID, order_contents.number
FROM order_contents, products
WHERE products.PID=order_contents.oc_PID
AND order_contents.oc_OID=curOID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_admins`
--
CREATE TABLE IF NOT EXISTS `all_admins` (
`UID` int(11)
,`userName` varchar(50)
,`email` varchar(40)
,`room` int(50)
,`extension` int(11)
,`password` char(40)
,`picture` varchar(255)
,`admin` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_products`
--
CREATE TABLE IF NOT EXISTS `all_products` (
`PID` int(11)
,`pname` varchar(50)
,`price` float
,`picture` varchar(255)
,`availability` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_users`
--
CREATE TABLE IF NOT EXISTS `all_users` (
`UID` int(11)
,`name` varchar(50)
,`room` int(50)
,`picture` varchar(255)
,`extension` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `CID` int(11) NOT NULL,
  `cname` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CID`, `cname`) VALUES
(1, 'Hot Drinks'),
(2, 'Fresh Juice'),
(3, 'Soda'),
(4, 'hot'),
(5, 'jjjj'),
(6, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `OID` bigint(20) NOT NULL,
  `o_UID` int(11) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `room` varchar(50) NOT NULL DEFAULT 'in place',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('processing','out for delivery','done') NOT NULL DEFAULT 'processing'
) ENGINE=InnoDB AUTO_INCREMENT=1028 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OID`, `o_UID`, `notes`, `room`, `date`, `status`) VALUES
(111, 1, NULL, 'in place', '2018-01-26 13:21:29', 'done'),
(222, 2, NULL, 'in place', '2018-01-19 13:47:29', 'processing'),
(333, 3, NULL, 'in place', '2018-01-19 13:47:29', 'processing'),
(444, 4, NULL, 'in place', '2018-01-19 13:47:29', 'processing'),
(555, 1, NULL, 'in place', '2018-01-26 18:31:49', 'processing'),
(777, 2, NULL, 'in place', '2018-01-19 13:47:56', 'processing'),
(778, 3, NULL, 'in place', '2018-01-19 21:06:40', 'processing'),
(888, 1, NULL, 'in place', '2018-01-26 13:22:59', 'processing'),
(999, 1, NULL, 'in place', '2018-01-26 15:38:46', 'processing'),
(1000, 1, '', '1', '2018-01-27 00:38:17', 'processing'),
(1001, 1, '', '1', '2018-01-27 00:39:25', 'processing'),
(1002, 1, '', '1', '2018-01-27 00:43:43', 'processing'),
(1003, 1, '', '1', '2018-01-27 00:44:22', 'processing'),
(1004, 1, '', '1', '2018-01-27 00:44:40', 'processing'),
(1005, 1, '', '1', '2018-01-27 00:44:42', 'processing'),
(1006, 1, '', '1', '2018-01-27 00:53:20', 'processing'),
(1007, 1, '', '1', '2018-01-27 00:53:44', 'processing'),
(1008, 1, '', '1', '2018-01-27 00:54:08', 'processing'),
(1009, 1, 'more sugar', '1', '2018-01-27 00:57:06', 'processing'),
(1010, 1, 'more sugar', '1', '2018-01-27 00:57:16', 'processing'),
(1011, 1, 'more sugar', '1', '2018-01-27 00:57:29', 'processing'),
(1013, 1, 'more sugar', '1', '2018-01-27 01:00:22', 'processing'),
(1014, 1, 'more sugar', '1', '2018-01-27 01:01:10', 'processing'),
(1015, 1, 'more sugar', '1', '2018-01-27 01:01:34', 'processing'),
(1016, 1, 'more sugar', '1', '2018-01-27 01:01:53', 'processing'),
(1017, 1, 'more sugar', '1', '2018-01-27 01:03:32', 'processing'),
(1018, 1, 'more sugar', '1', '2018-01-27 01:03:34', 'processing'),
(1019, 1, 'more sugar', '1', '2018-01-27 01:17:24', 'processing'),
(1020, 1, 'more sugar', '1', '2018-01-27 01:17:33', 'processing'),
(1021, 1, '', '1', '2018-01-27 01:23:01', 'processing'),
(1022, 1, '', '1', '2018-01-27 01:23:33', 'processing'),
(1023, 1, '', '1', '2018-01-27 01:23:53', 'processing'),
(1024, 1, '', '1', '2018-01-27 01:32:07', 'processing'),
(1025, 1, '', '1', '2018-01-27 01:32:47', 'processing'),
(1026, 1, '', '1', '2018-01-27 01:34:03', 'processing'),
(1027, 1, '', '1', '2018-01-27 01:40:14', 'processing');

-- --------------------------------------------------------

--
-- Table structure for table `order_contents`
--

CREATE TABLE IF NOT EXISTS `order_contents` (
  `oc_OID` bigint(11) NOT NULL,
  `oc_PID` int(11) NOT NULL,
  `number` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_contents`
--

INSERT INTO `order_contents` (`oc_OID`, `oc_PID`, `number`) VALUES
(111, 1, 2),
(555, 1, 2),
(1013, 1, 2),
(1014, 1, 2),
(1015, 1, 2),
(1016, 1, 2),
(1017, 1, 2),
(1018, 1, 2),
(1021, 1, 1),
(1026, 1, 1),
(1027, 1, 1),
(111, 2, 4),
(333, 2, 2),
(444, 2, 3),
(666, 2, 2),
(1012, 2, 1),
(1013, 2, 2),
(1014, 2, 2),
(1015, 2, 2),
(1016, 2, 2),
(1017, 2, 2),
(1018, 2, 2),
(1020, 2, 1),
(1021, 2, 1),
(1022, 2, 1),
(1023, 2, 1),
(1024, 2, 1),
(1026, 2, 1),
(222, 3, 1),
(333, 3, 6),
(444, 3, 1),
(555, 3, 3),
(222, 4, 2),
(555, 4, 1),
(1013, 5, 1),
(1014, 5, 1),
(1015, 5, 1),
(1019, 5, 1),
(1022, 5, 1),
(1023, 5, 1),
(1024, 5, 1),
(1012, 15, 3),
(1013, 15, 1),
(1014, 15, 1),
(1015, 15, 1),
(1019, 15, 1),
(1020, 15, 1),
(1021, 15, 1),
(1023, 15, 3),
(1024, 15, 1),
(1026, 15, 1),
(1027, 15, 1),
(1012, 26, 1),
(1026, 26, 1),
(1027, 26, 1),
(1012, 37, 1),
(1013, 37, 1),
(1014, 37, 1),
(1015, 37, 1),
(1023, 37, 1),
(1025, 37, 1),
(1012, 39, 1),
(1025, 39, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `PID` int(11) NOT NULL,
  `pname` varchar(50) NOT NULL,
  `p_CID` int(11) NOT NULL,
  `price` float NOT NULL,
  `picture` varchar(255) DEFAULT '',
  `availability` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`PID`, `pname`, `p_CID`, `price`, `picture`, `availability`) VALUES
(1, 'tea', 1, 5, '', 1),
(2, 'coffee', 2, 8, '', 1),
(3, 'orange', 2, 12, '', 1),
(4, 'Soda', 3, 6, '', 0),
(5, 'nescafe', 1, 20, '', 1),
(15, '', 1, 4, '', 1),
(26, 'assd', 1, 1, '', 1),
(37, 'dcd', 1, 2, '', 1),
(39, 'jbjb', 1, 1.5, '', 1),
(55, 'wd', 1, 3.5, '', 1),
(60, 'mon', 1, 4, '', 1),
(63, 'ert', 1, 1.5, '', 1),
(64, 'coffeeeee', 1, 1.5, '', 1),
(66, 'aDD', 1, 0.5, '', 1),
(68, 'hyy', 3, 1.5, '', 1),
(69, 'dffffg', 1, 3.5, '/tmp/phph2uxhs', 1),
(70, 'wfwf', 1, 2.5, '', 1),
(71, 'dwd', 1, 1.5, '/tmp/phpULwo8h', 1),
(72, 'efef', 1, 1, '/tmp/phpRpqgf6', 1),
(73, 'efefwd', 1, 1, '/tmp/phpq34WrK', 1),
(74, 'wdwdwd', 1, 2.5, '', 1),
(75, 'wwr', 1, 1.5, '', 1),
(76, 'wdw', 1, 111, '/tmp/phptOsUqw', 1),
(77, 'ww', 1, 1, '/tmp/phpljxHHA', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `UID` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(40) NOT NULL DEFAULT 'sdsd',
  `room` int(50) NOT NULL,
  `extension` int(11) DEFAULT NULL,
  `password` char(40) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `userName`, `email`, `room`, `extension`, `password`, `picture`, `admin`) VALUES
(1, 'omran11', 'sdsd@sdsd.com', 1, 0, '12975910c3e6352b5b2bdee81fa2fc4653a5bd59', '', 0),
(2, 'ahmed@', 'sdsdd', 2005, 12545, '123456', NULL, 0),
(3, 'mina@', 'd', 2006, 15485, '123456789', NULL, 0),
(4, 'omran@', '55', 2008, 124587, '124578', NULL, 0),
(5, 'email', '66', 0, 0, 'password', 'picture', 0),
(8, 'ahmed', '77', 1515, 0, '125', '', 0),
(9, 'mohamed', 'sds55', 1515, 0, '125', '', 0),
(11, 'sds', '4dcd', 0, 0, 'swssd', '', 0),
(13, 'sfv', 'sdsdfvfv ', 0, 0, 'swssd', '', 0),
(17, 'ahmeddcd', 'dvcd', 0, 0, 'swssd', '', 0),
(18, 'gemy', 'sdsddvd', 0, 0, 'swssd', '', 0),
(19, 'omran', 'sdsddc', 0, 0, 'swssd', '', 0),
(20, 'admin', 'admin@admin.com', 2, 3, 'd033e22ae348aeb5660fc2140aec35850c4da997', 'aaa', 1),
(21, 'ad', 'adn@ad.com', 2, 3, 'e9d2c4d7f41e32de0588a042036896d067b31c74', 'aaa', 1),
(22, 'qsq', 'efefe@wdwd', 0, 0, 'efefe@wdwd', '', 0),
(23, 'omran', 'omran@omran.com', 2, 3, 'e9d2c4d7f41e32de0588a042036896d067b31c74', 'aaa', 0),
(24, 'mohamed', 'aaa@aaa.aaa', 12345, 12345, '7c222fb2927d828af22f592134e8932480637c0d', '', 0),
(25, 'mohamed', 'omran@omran.come', 123, 154, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '', 0),
(26, 'ahmed', 'ahmed@ahmed.com', 12, 12, '4cc19aaff82f60ac4097f935ab4a06ad4f0891cc', '/tmp/phpMUMNA7', 0),
(27, 'hassan', 'hassan@hassan.com', 147, 258, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpzqqOfl', 0),
(28, 'hassan', 'hassan@hassan.come', 12345, 14597, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpafPFzO', 0),
(29, 'hassan', 'hassan@hassan.comewq', 12345, 14597, '345120426285ff8b1d43653a4d078170b4761f75', '/tmp/phpLmJTWF', 0),
(30, 'ahmed', 'aaa@aaa.com', 12, 12, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpHoNaMT', 0),
(31, 'ahmed', 'aab@aaa.com', 12, 12, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpb3VOlX', 0),
(32, 'ahmed', 'aaaa@aaa.com', 12, 12, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpSuyKSK', 0),
(33, 'hassan', 'hassan@hassan.comewqw', 12345, 14597, '345120426285ff8b1d43653a4d078170b4761f75', '/tmp/phptUjTqm', 0),
(34, 'ahmed', 'adaaa@aaa.com', 12, 12, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpIi44JV', 0),
(35, 'hassan', 'hassan@hassan.comewqww', 12345, 14597, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpt3Qw3u', 0),
(36, 'ahmed', 'adaada@aaa.com', 12, 12, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpvxka6y', 0),
(37, 'ahmed', 'adaadfa@aaa.com', 12, 12, '4cc19aaff82f60ac4097f935ab4a06ad4f0891cc', '/tmp/phpLc805D', 0),
(38, 'asd', 'aa@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/php5dazKU', 0),
(39, 'asd', 'adda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpcTA3y4', 0),
(40, 'asd', 'adzzzda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpmIEuRU', 0),
(41, 'medo', 'mhassan@sssf.com', 14725836, 1475, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpAj8Ez4', 0),
(42, 'asd', 'adzzzcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpx9pUmu', 0),
(43, 'medoqq', 'mhassan@sssf.com14', 14725836, 1475, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpBIZEQV', 0),
(44, 'asd', 'adzczzcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpjUlXvn', 0),
(45, 'asd', 'adzffczzcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpMPuY6G', 0),
(46, 'medoqq', 'mhassan@sssf.com14w', 14725836, 1475, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpmrz7zG', 0),
(47, 'mohamed', 'admin@admin.com15', 123, 1452, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpDJmQXc', 0),
(48, 'sxscs', 'efeefe@efef.wefwede', 147, 258, 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '/tmp/phpDND4yJ', 0),
(49, 'asd', 'adzffczczcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpFfrocj', 0),
(51, 'asd', 'adccczffczcczcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpUZJQtK', 0),
(52, 'asd', 'adccczffczcczvcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/php5PN29f', 0),
(53, 'asd', 'adcccczffczcczvcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpag2hRP', 0),
(54, 'asd', 'adccvcczffczcczvcda@aa.com', 132, 11, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpf3zJyq', 0),
(55, 'afcsdfc', 'sdafsdf@sdf.csdf', 12, 12, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpM7015V', 0),
(57, 'sdf', 'asd@sdaf.sdf', 12, 23, '7c222fb2927d828af22f592134e8932480637c0d', '/tmp/phpXZp8Ft', 0);

-- --------------------------------------------------------

--
-- Structure for view `all_admins`
--
DROP TABLE IF EXISTS `all_admins`;

CREATE ALGORITHM=UNDEFINED DEFINER=`Otlobly`@`%` SQL SECURITY DEFINER VIEW `all_admins` AS select `users`.`UID` AS `UID`,`users`.`userName` AS `userName`,`users`.`email` AS `email`,`users`.`room` AS `room`,`users`.`extension` AS `extension`,`users`.`password` AS `password`,`users`.`picture` AS `picture`,`users`.`admin` AS `admin` from `users` where (`users`.`admin` = 1);

-- --------------------------------------------------------

--
-- Structure for view `all_products`
--
DROP TABLE IF EXISTS `all_products`;

CREATE ALGORITHM=UNDEFINED DEFINER=`mhassan`@`localhost` SQL SECURITY DEFINER VIEW `all_products` AS select `products`.`PID` AS `PID`,`products`.`pname` AS `pname`,`products`.`price` AS `price`,`products`.`picture` AS `picture`,`products`.`availability` AS `availability` from `products` WITH CASCADED CHECK OPTION;

-- --------------------------------------------------------

--
-- Structure for view `all_users`
--
DROP TABLE IF EXISTS `all_users`;

CREATE ALGORITHM=UNDEFINED DEFINER=`mhassan`@`localhost` SQL SECURITY DEFINER VIEW `all_users` AS select `users`.`UID` AS `UID`,`users`.`userName` AS `name`,`users`.`room` AS `room`,`users`.`picture` AS `picture`,`users`.`extension` AS `extension` from `users` WITH CASCADED CHECK OPTION;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CID`),
  ADD UNIQUE KEY `CID` (`CID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OID`),
  ADD KEY `o_UID` (`o_UID`);

--
-- Indexes for table `order_contents`
--
ALTER TABLE `order_contents`
  ADD PRIMARY KEY (`oc_PID`,`oc_OID`),
  ADD KEY `oc_OID` (`oc_OID`,`oc_PID`),
  ADD KEY `oc_OID_2` (`oc_OID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`PID`) USING BTREE,
  ADD UNIQUE KEY `pname` (`pname`),
  ADD KEY `category` (`p_CID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OID` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1028;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `PID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=58;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`o_UID`) REFERENCES `users` (`UID`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category` FOREIGN KEY (`p_CID`) REFERENCES `categories` (`CID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
