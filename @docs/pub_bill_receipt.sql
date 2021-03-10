-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 29, 2019 at 11:21 AM
-- Server version: 5.7.23-0ubuntu0.16.04.1-log
-- PHP Version: 5.6.37-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `isabuybilling`
--

-- --------------------------------------------------------

--
-- Table structure for table `pub_bill_receipt`
--

CREATE TABLE `pub_bill_receipt` (
  `id` int(10) UNSIGNED NOT NULL,
  `BillNo` varchar(80) NOT NULL,
  `BillDate` date NOT NULL,
  `BillDue` date NOT NULL,
  `BillStatus` float(2,1) NOT NULL DEFAULT '1.0',
  `BillErrorStatus` varchar(200) NOT NULL DEFAULT '',
  `VID` int(11) NOT NULL,
  `VName` varchar(250) NOT NULL DEFAULT '',
  `VLogo` varchar(250) NOT NULL DEFAULT '',
  `VAddr` varchar(250) NOT NULL DEFAULT '',
  `DiscountType` varchar(40) NOT NULL,
  `DiscountValue` double(15,2) NOT NULL DEFAULT '0.00',
  `AgentCode` varchar(40) NOT NULL DEFAULT '',
  `AgentCommission` double(15,2) NOT NULL DEFAULT '0.00',
  `AgentName` varchar(80) NOT NULL DEFAULT '',
  `AgentMobile` varchar(40) NOT NULL DEFAULT '',
  `TrackingNo` varchar(200) NOT NULL DEFAULT '',
  `Data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pub_bill_receipt`
--
ALTER TABLE `pub_bill_receipt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `by_billno` (`BillNo`),
  ADD KEY `by_vid` (`VID`,`BillDate`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pub_bill_receipt`
--
ALTER TABLE `pub_bill_receipt`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
