-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 25, 2018 at 06:14 PM
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
SELECT users.userName, sum(order_contents.number*products.price) as "total amount"
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
SELECT orders.date, users.userName, orders.room, users.extension, sum(order_contents.number*products.price) as "total amount"
FROM order_contents, products, orders, users
WHERE orders.OID=order_contents.oc_OID
AND products.PID=order_contents.oc_PID
AND users.UID=orders.o_UID
AND orders.status='processing'

Group BY orders.OID;
END$$

CREATE DEFINER=`mhassan`@`localhost` PROCEDURE `my_orders`(IN `userId` INT, IN `startDate` DATE, IN `endDate` DATE)
BEGIN
SELECT orders.date, orders.status, sum(order_contents.number*products.price) as "total amount"
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
SELECT products.pname, products.price, products.picture, order_contents.number
FROM order_contents, products
WHERE products.PID=order_contents.oc_PID
AND order_contents.oc_OID=curOID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_products`
--
CREATE TABLE IF NOT EXISTS `all_products` (
`pname` varchar(50)
,`price` tinyint(4)
,`picture` varchar(255)
,`availability` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_users`
--
CREATE TABLE IF NOT EXISTS `all_users` (
`name` varchar(50)
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
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('processing','out for delivery','done') NOT NULL DEFAULT 'processing',
  `room` varchar(50) NOT NULL DEFAULT 'in place',
  `notes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=784 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OID`, `o_UID`, `date`, `status`, `room`, `notes`) VALUES
(111, 1, '2018-01-19 13:47:29', 'processing', 'in place', NULL),
(222, 2, '2018-01-19 13:47:29', 'processing', 'in place', NULL),
(333, 3, '2018-01-19 13:47:29', 'processing', 'in place', NULL),
(444, 4, '2018-01-19 13:47:29', 'processing', 'in place', NULL),
(555, 1, '2018-01-19 13:47:29', 'processing', 'in place', NULL),
(666, 1, '2018-01-19 13:47:56', 'processing', 'in place', NULL),
(777, 2, '2018-01-19 13:47:56', 'processing', 'in place', NULL),
(778, 3, '2018-01-19 21:06:40', 'processing', 'in place', NULL);

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
(111, 2, 4),
(333, 2, 2),
(444, 2, 3),
(666, 2, 2),
(222, 3, 1),
(333, 3, 6),
(444, 3, 1),
(555, 3, 3),
(222, 4, 2),
(555, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `PID` int(11) NOT NULL,
  `pname` varchar(50) NOT NULL,
  `p_CID` int(11) NOT NULL,
  `price` tinyint(4) NOT NULL,
  `picture` varchar(255) NOT NULL DEFAULT '',
  `availability` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`PID`, `pname`, `p_CID`, `price`, `picture`, `availability`) VALUES
(1, 'tea', 1, 5, '', 1),
(2, 'coffee', 2, 8, '', 1),
(3, 'orange', 2, 12, '', 1),
(4, 'Soda', 3, 6, '', 1),
(5, 'nescafe', 1, 20, '', 1),
(11, 'l', 2, 2, 'a', 1),
(12, 'a', 1, 1, 'a', 1),
(13, 'a', 1, 1, 'a', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `UID` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `room` int(50) NOT NULL,
  `extension` int(11) DEFAULT NULL,
  `password` char(40) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `userName`, `room`, `extension`, `password`, `picture`, `admin`) VALUES
(1, 'omran11', 0, 0, 'swssd', '', 0),
(2, 'ahmed@', 2005, 12545, '123456', NULL, 0),
(3, 'mina@', 2006, 15485, '123456789', NULL, 0),
(4, 'omran@', 2008, 124587, '124578', NULL, 0),
(5, 'email', 0, 0, 'password', 'picture', 0),
(8, 'ahmed', 1515, 0, '125', '', 0),
(9, 'mohamed', 1515, 0, '125', '', 0),
(11, 'sds', 0, 0, 'swssd', '', 0),
(13, 'sfv', 0, 0, 'swssd', '', 0),
(17, 'ahmeddcd', 0, 0, 'swssd', '', 0),
(18, 'gemy', 0, 0, 'swssd', '', 0),
(19, 'omran', 0, 0, 'swssd', '', 0);

-- --------------------------------------------------------

--
-- Structure for view `all_products`
--
DROP TABLE IF EXISTS `all_products`;

CREATE ALGORITHM=UNDEFINED DEFINER=`mhassan`@`localhost` SQL SECURITY DEFINER VIEW `all_products` AS select `products`.`pname` AS `pname`,`products`.`price` AS `price`,`products`.`picture` AS `picture`,`products`.`availability` AS `availability` from `products` WITH CASCADED CHECK OPTION;

-- --------------------------------------------------------

--
-- Structure for view `all_users`
--
DROP TABLE IF EXISTS `all_users`;

CREATE ALGORITHM=UNDEFINED DEFINER=`mhassan`@`localhost` SQL SECURITY DEFINER VIEW `all_users` AS select `users`.`userName` AS `name`,`users`.`room` AS `room`,`users`.`picture` AS `picture`,`users`.`extension` AS `extension` from `users` WITH CASCADED CHECK OPTION;

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
  ADD KEY `category` (`p_CID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `Email` (`userName`),
  ADD KEY `userName` (`userName`);

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
  MODIFY `OID` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=784;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `PID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`o_UID`) REFERENCES `users` (`UID`);

--
-- Constraints for table `order_contents`
--
ALTER TABLE `order_contents`
  ADD CONSTRAINT `order_contents_ibfk_1` FOREIGN KEY (`oc_OID`) REFERENCES `orders` (`OID`),
  ADD CONSTRAINT `order_contents_ibfk_2` FOREIGN KEY (`oc_PID`) REFERENCES `products` (`PID`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category` FOREIGN KEY (`p_CID`) REFERENCES `categories` (`CID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
