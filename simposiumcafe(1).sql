-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2019 at 05:20 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simposiumcafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `kasir`
--

CREATE TABLE `kasir` (
  `id_kasir` varchar(3) NOT NULL,
  `nama_kasir` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kasir`
--

INSERT INTO `kasir` (`id_kasir`, `nama_kasir`) VALUES
('1', 'Rahadian'),
('2', 'Bagas'),
('3', 'Ravan');

-- --------------------------------------------------------

--
-- Table structure for table `koki`
--

CREATE TABLE `koki` (
  `id_koki` varchar(3) NOT NULL,
  `nama_koki` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `koki`
--

INSERT INTO `koki` (`id_koki`, `nama_koki`) VALUES
('1', 'Rifaul'),
('2', 'Hilal');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `Id_menu` varchar(255) NOT NULL,
  `nama_menu` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`Id_menu`, `nama_menu`, `harga`) VALUES
('1', 'Spaghetti', 15000),
('2', 'Arabica Coffe', 6000),
('3', 'Strawwberry Milkshake', 10000),
('4', 'Cheese Omelete', 13000),
('5', 'French Fries', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` varchar(255) NOT NULL,
  `nama_pelanggan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama_pelanggan`) VALUES
('1', 'Cisong'),
('2', 'Gary');

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pesanan` varchar(255) NOT NULL,
  `nama_pelanggan` varchar(25) NOT NULL,
  `id_menu` varchar(3) NOT NULL,
  `id_pelanggan` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pemesanan`
--

INSERT INTO `pemesanan` (`id_pesanan`, `nama_pelanggan`, `id_menu`, `id_pelanggan`) VALUES
('1', 'Cisong', '1', '1'),
('2', 'Gary', '4', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kasir`
--
ALTER TABLE `kasir`
  ADD PRIMARY KEY (`id_kasir`);

--
-- Indexes for table `koki`
--
ALTER TABLE `koki`
  ADD PRIMARY KEY (`id_koki`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`Id_menu`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indexes for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_pelanggan` (`id_pelanggan`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD CONSTRAINT `pemesanan_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`Id_menu`),
  ADD CONSTRAINT `pemesanan_ibfk_2` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
