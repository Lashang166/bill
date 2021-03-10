-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 07, 2019 at 08:37 PM
-- Server version: 10.0.38-MariaDB-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bkgjewelry_billonline`
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
  `AgentPercent` double(15,2) NOT NULL DEFAULT '0.00',
  `AgentName` varchar(80) NOT NULL DEFAULT '',
  `AgentUrl` varchar(80) NOT NULL DEFAULT '',
  `AgentMobile` varchar(40) NOT NULL DEFAULT '',
  `TrackingNo` varchar(200) NOT NULL DEFAULT '',
  `Datachannel` varchar(200) NOT NULL DEFAULT '',
  `Data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pub_bill_receipt`
--

INSERT INTO `pub_bill_receipt` (`id`, `BillNo`, `BillDate`, `BillDue`, `BillStatus`, `BillErrorStatus`, `VID`, `VName`, `VLogo`, `VAddr`, `DiscountType`, `DiscountValue`, `AgentCode`, `AgentCommission`, `AgentPercent`, `AgentName`, `AgentUrl`, `AgentMobile`, `TrackingNo`, `Datachannel`, `Data`) VALUES
(1, '20190402032420', '2019-03-29', '2019-04-07', 2.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 100.00, 'AGENT-01', 0.00, 0.00, 'Agent Name 01', '', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":30,\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":100,\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"SKU\":\"SKU1\",\"Description\":\"Item description 1\",\"UnitName\":\"unit\",\"PricePerUnit\":\"15\",\"Amount\":\"1\",\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"},{\"SKU\":\"SKU2\",\"Description\":\"Item description 2\",\"UnitName\":\"unit\",\"PricePerUnit\":100,\"Amount\":\"1\",\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"}],\"SelectedShipType\":2,\"Payment\":{\"image\":\"uploads/20190402032420.png?t=1565056668\",\"BankAccount\":{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}},\"ShippingAddress\":{\"Name\":\"aaa bbb\",\"Address\":\"123/1 m99\",\"SubDistrict\":\"นาเกษม\",\"District\":\"ทุ่งศรีอุดม\",\"Province\":\"อุบลราชธานี\",\"Postcode\":\"34160\",\"Mobile\":\"099-12345678\"},\"note\":\"abcd\"}'),
(2, '20190402033552', '2019-03-29', '2019-04-07', 5.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 20.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":\"50\",\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":\"100\",\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"SKU\":\"SKU2\",\"Description\":\"Item description 2\",\"UnitName\":\"unit\",\"PricePerUnit\":\"100\",\"Amount\":\"3\",\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"},{\"Amount\":1,\"Description\":\"ครีมแต้มสิว (ขนาด 10x3x2 ซ.ม.) (น้ำหนัก 19 กรัม)\",\"PricePerUnit\":\"550.00\",\"SKU\":\"cream acne 001\",\"UnitName\":\"\",\"total\":\"550.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/75/80-i-1.jpg\"},{\"Amount\":1,\"Description\":\"สินค้าใหม่ 2019\",\"PricePerUnit\":\"999.00\",\"SKU\":\"ทดสอบไทยล้วน\",\"UnitName\":\"\",\"total\":\"999.00\",\"image\":\"https://www.i-sabuy.com/img/noimg.jpg\"}],\"note\":\"HelloWorld\",\"SelectedShipType\":2}'),
(3, '20190410122151', '2019-03-29', '2019-04-07', 4.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 10.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":30,\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":100,\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"Amount\":\"\",\"PricePerUnit\":\"99\",\"SKU\":\"SHIRT สีแดง 01\",\"UnitName\":\"\",\"total\":\"5000.00\",\"image\":\"https://www.i-sabuy.com/img/noimg.jpg\"},{\"Amount\":1,\"PricePerUnit\":\"88\",\"SKU\":\"SHIRT สีแดง 01\",\"UnitName\":\"\",\"total\":\"5000.00\",\"image\":\"https://www.i-sabuy.com/img/noimg.jpg\"},{\"Amount\":1,\"PricePerUnit\":\"350.00\",\"SKU\":\"white shirt xl 001\",\"UnitName\":\"\",\"total\":\"350.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/74/79-i-1.jpg\"}],\"SelectedShipType\":2,\"Payment\":{\"BankAccount\":{\"type\":\"COD\"}},\"ShippingAddress\":{\"Name\":\"13132\",\"Address\":\"131\",\"SubDistrict\":\"บางกรวย\",\"District\":\"บางกรวย\",\"Province\":\"นนทบุรี\",\"Postcode\":\"11130\",\"Mobile\":\"132132\"},\"note\":\"3333\"}'),
(4, '20190426034322', '2019-03-29', '2019-04-07', 2.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'VALUE', 90.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":30,\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":100,\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"Amount\":\"10\",\"PricePerUnit\":\"100.00\",\"SKU\":\"RB000018\",\"UnitName\":\"\",\"total\":\"100.00\",\"image\":\"https://www.i-sabuy.com/img/noimg.jpg\"},{\"Amount\":1,\"PricePerUnit\":\"350.00\",\"SKU\":\"white shirt xl 001\",\"UnitName\":\"\",\"total\":\"350.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/74/79-i-1.jpg\"},{\"Amount\":1,\"PricePerUnit\":\"350.00\",\"SKU\":\"white shirt xl 001\",\"UnitName\":\"\",\"total\":\"350.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/74/79-i-1.jpg\"}],\"Payment\":{\"BankAccount\":{\"type\":\"COD\"}},\"ShippingAddress\":{\"Name\":\"543\",\"Address\":\"345\",\"SubDistrict\":\"บางกรวย\",\"District\":\"บางกรวย\",\"Province\":\"นนทบุรี\",\"Postcode\":\"11130\",\"Mobile\":\"34\"},\"SelectedShipType\":2}'),
(5, '20190613153654', '2019-03-29', '2019-04-07', 1.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 20.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":\"50\",\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":\"0\",\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"Amount\":1,\"PricePerUnit\":\"100.00\",\"SKU\":\"RB000018\",\"UnitName\":\"\",\"total\":\"100.00\",\"image\":\"https://www.i-sabuy.com/img/noimg.jpg\"},{\"Amount\":\"2\",\"PricePerUnit\":\"200\",\"SKU\":\"Genius-105\",\"UnitName\":\"\",\"total\":\"10.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/5912/5913-i-1.jpg\"}],\"SelectedShipType\":1,\"Payment\":{}}'),
(6, '20190613153922', '2019-03-29', '2019-04-07', 1.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 10.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":30,\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":100,\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"\\u0e0a\\u0e37\\u0e48\\u0e2d\\u0e40\\u0e08\\u0e49\\u0e32\\u0e02\\u0e2d\\u0e07\\u0e1a\\u0e31\\u0e0d\\u0e0a\\u0e35\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"SKU\":\"SKU1\",\"Description\":\"Item description 1\",\"UnitName\":\"unit\",\"PricePerUnit\":120,\"Amount\":2,\"image\":\"https:\\/\\/www.designevo.com\\/res\\/templates\\/thumb_small\\/blue-square-and-virtual-world.png\"},{\"SKU\":\"SKU2\",\"Description\":\"Item description 2\",\"UnitName\":\"unit\",\"PricePerUnit\":100,\"Amount\":1,\"image\":\"https:\\/\\/www.designevo.com\\/res\\/templates\\/thumb_small\\/blue-square-and-virtual-world.png\"}]}'),
(7, '20190613161630', '2019-03-29', '2019-04-07', 1.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 10.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":30,\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":100,\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"SKU\":\"SKU1\",\"Description\":\"Item description 1\",\"UnitName\":\"unit\",\"PricePerUnit\":120,\"Amount\":2,\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"},{\"SKU\":\"SKU2\",\"Description\":\"Item description 2\",\"UnitName\":\"unit\",\"PricePerUnit\":100,\"Amount\":1,\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"}],\"SelectedShipType\":1,\"Payment\":{}}'),
(8, '20190802110831', '2019-03-29', '2019-04-07', 1.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 10.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":\"0\",\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":\"0\",\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"SKU\":\"SKU1\",\"Description\":\"Item description 1\",\"UnitName\":\"unit\",\"PricePerUnit\":120,\"Amount\":2,\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"},{\"SKU\":\"SKU2\",\"Description\":\"Item description 2\",\"UnitName\":\"unit\",\"PricePerUnit\":100,\"Amount\":1,\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"},{\"Amount\":1,\"PricePerUnit\":\"10.00\",\"SKU\":\"Genius-129-2018\",\"UnitName\":\"\",\"total\":\"10.00\",\"image\":\"https://www.i-sabuy.com/img/noimg.jpg\"},{\"Amount\":1,\"PricePerUnit\":\"550.00\",\"SKU\":\"cream acne 001\",\"UnitName\":\"\",\"total\":\"550.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/75/80-i-1.jpg\"}],\"SelectedShipType\":1}'),
(9, '20190802111644', '2019-03-29', '2019-04-07', 1.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'VALUE', 10.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":\"\",\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":\"N\",\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"Amount\":1,\"PricePerUnit\":\"550.00\",\"SKU\":\"cream acne 001\",\"UnitName\":\"\",\"total\":\"550.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/75/80-i-1.jpg\"},{\"Amount\":1,\"PricePerUnit\":\"10.00\",\"SKU\":\"Genius-105\",\"UnitName\":\"\",\"total\":\"10.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/5912/5913-i-1.jpg\"}],\"SelectedShipType\":1,\"Payment\":{}}'),
(10, '20190804162027', '2019-03-29', '2019-04-07', 1.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'VALUE', 0.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":30,\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":100,\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"SKU\":\"SKU1\",\"Description\":\"Item description 1\",\"UnitName\":\"unit\",\"PricePerUnit\":120,\"Amount\":2,\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"},{\"SKU\":\"SKU2\",\"Description\":\"Item description 2\",\"UnitName\":\"unit\",\"PricePerUnit\":100,\"Amount\":1,\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"}]}'),
(11, '20190804163640', '2019-03-29', '2019-04-07', 3.0, '', 49, 'Vendor Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png', 'Vendor Address 01', 'PERCENTAGE', 0.00, 'AGENT-01', 10.00, 10.00, 'Agent Name 01', 'https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-worl', '09xxxxxxxx', '', '', '{\"ShipTypes\":[{\"description\":\"EMS\",\"rate\":30,\"id\":1},{\"description\":\"LALAMOVE\",\"rate\":\"250\",\"id\":2}],\"BankAccounts\":[{\"type\":\"COD\"},{\"BankName\":\"Bangkok Bank\",\"abbr\":\"bbl\",\"BankOwner\":\"ชื่อเจ้าของบัญชี\",\"BankAccNo\":\"123-45678-90\"}],\"items\":[{\"SKU\":\"SKU1\",\"Description\":\"Item description 1\",\"UnitName\":\"unit\",\"PricePerUnit\":\"300\",\"Amount\":\"1\",\"image\":\"https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png\"},{\"Amount\":\"2\",\"Description\":\"ครีมแต้มสิว (ขนาด 10x3x2 ซ.ม.) (น้ำหนัก 19 กรัม)\",\"PricePerUnit\":\"550.00\",\"SKU\":\"cream acne 001\",\"UnitName\":\"\",\"total\":\"550.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/75/80-i-1.jpg\"},{\"Amount\":\"3\",\"Description\":\"เสื้อเชิตสีขาว Xl (ขนาด  30x25x3 ซ.ม.) (น้ำหนัก 400 กรัม)\",\"PricePerUnit\":\"350.00\",\"SKU\":\"white shirt xl 001\",\"UnitName\":\"\",\"total\":\"350.00\",\"image\":\"https://www.i-sabuy.com/img/sc_prod/74/79-i-1.jpg\"}],\"Payment\":{\"BankAccount\":{\"type\":\"COD\"}},\"SelectedShipType\":2,\"ShippingAddress\":{\"Name\":\"หฟ\",\"Address\":\"กหฟ\",\"SubDistrict\":\"บางขนุน\",\"District\":\"บางกรวย\",\"Province\":\"นนทบุรี\",\"Postcode\":\"11130\",\"Mobile\":\"ดหฟ\"}}');

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
