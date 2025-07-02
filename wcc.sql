-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02/07/2025 às 14:53
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `wcc`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `musica`
--

CREATE TABLE `musica` (
  `musica_id` varchar(100) NOT NULL,
  `times_played` int(11) DEFAULT NULL,
  `volume_1` decimal(5,2) DEFAULT NULL,
  `volume_2` decimal(5,2) DEFAULT NULL,
  `volume_3` decimal(5,2) DEFAULT NULL,
  `volume_4` decimal(5,2) DEFAULT NULL,
  `volume_5` decimal(5,2) DEFAULT NULL,
  `volume_6` decimal(5,2) DEFAULT NULL,
  `ranking_1` int(11) DEFAULT NULL,
  `ranking_2` int(11) DEFAULT NULL,
  `ranking_3` int(11) DEFAULT NULL,
  `ranking_4` int(11) DEFAULT NULL,
  `ranking_5` int(11) DEFAULT NULL,
  `ranking_6` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `musica`
--

INSERT INTO `musica` (`musica_id`, `times_played`, `volume_1`, `volume_2`, `volume_3`, `volume_4`, `volume_5`, `volume_6`, `ranking_1`, `ranking_2`, `ranking_3`, `ranking_4`, `ranking_5`, `ranking_6`) VALUES
('0WKYRFtH6KKbaNWjsxqm70', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 82.22, 4, 4, 5, 5, 5, 5),
('0ydgtGSPfVNtsLVUTqvOZU', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 49.50, 28, 29, 28, 21, 18, 17),
('1dF5Y2dd7Wm4wZKvVjWBpr', 5, 50.00, 50.00, 50.00, 89.00, 51.50, 27.78, 34, 34, 34, 30, 29, 28),
('1ei4Cg4zYN2y17CAvjETSM', 3, 50.00, 50.00, 50.00, 38.00, 65.51, 81.00, 29, 31, 21, 6, 6, 6),
('1kFyVRbMT4JJynQgTFWKZj', 5, 50.00, 50.00, 79.55, 80.00, 71.00, 40.00, 11, 11, 11, 10, 24, 23),
('1lNcMbhjMZe0GGHYqjSQib', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 50.00, 24, 27, 24, 18, 17, 16),
('1pOIpxfrQ8AszXZdKR3aH3', 5, 50.00, 50.00, 50.00, 90.00, 80.00, 38.00, 9, 9, 9, 26, 25, 24),
('1rS31P08Cn64Rn7pnMh5S5', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 70.56, 19, 19, 18, 11, 11, 10),
('1SOwE0CzTDELRCNbAsknzD', 2, 50.00, 50.00, 50.00, 50.00, 88.00, 77.78, 17, 17, 16, 8, 9, 8),
('21NA5Zggba7pyACm25h6k4', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 27.00, 35, 35, 35, 31, 30, 29),
('287tdUcso07UAu5jxXB2BQ', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 48.42, 29, 30, 29, 22, 19, 18),
('2gXI6TBLhmCNy09NioMHdI', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 50.00, 27, 28, 27, 20, 15, 15),
('2Ih217RCGAmyQR68Nn7Cqo', 5, 50.00, 50.00, 92.50, 80.00, 70.00, 96.00, 5, 5, 5, 12, 2, 2),
('2ImuQo1g14CTR9hZAZD3aQ', 2, 50.00, 50.00, 50.00, 50.00, 18.00, 41.88, 32, 33, 32, 25, 23, 22),
('2rwmKpWW6o6anOhvcyiJOw', 3, 50.00, 50.00, 50.00, 51.15, 80.00, 26.00, 14, 14, 14, 32, 31, 30),
('2Vpj5colB0MPy3Zg5SITEC', 2, 50.00, 50.00, 50.00, 50.00, 50.00, 44.12, 31, 32, 31, 24, 22, 21),
('377UbxXV2YEA28V4Go9aDw', 2, 50.00, 50.00, 50.00, 50.00, 50.00, 60.00, 22, 23, 22, 14, 13, 12),
('3ia3dJETSOllPsv3LJkE35', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 99.70, 1, 1, 1, 1, 1, 1),
('3ssX20QT5c3nA9wk78V1LQ', 11, 85.86, 50.00, 79.89, 35.00, 78.00, 4.00, 15, 15, 33, 28, 8, 36),
('4ixD6bSwnSlzuBrd2c80vI', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 95.38, 2, 2, 3, 3, 3, 3),
('4LwU4Vp6od3Sb08CsP99GC', 5, 50.00, 50.00, 38.50, 80.00, 26.00, 31.00, 6, 6, 6, 33, 28, 27),
('4RY96Asd9IefaL3X4LOLZ8', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 45.29, 30, 31, 30, 23, 21, 20),
('503OTo2dSqe7qk76rgsbep', 7, 50.00, 50.00, 80.00, 99.00, 11.00, 10.00, 7, 7, 2, 2, 36, 35),
('58l9AZTnBa7sEo54oPLy4I', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 66.67, 20, 20, 19, 13, 12, 11),
('5UQOmTylBEdsIfSn37v3DO', 5, 50.00, 28.00, 38.33, 80.00, 52.00, 16.00, 8, 8, 8, 16, 34, 33),
('5xEm63lXBhJKZgjRDMWH3H', 3, 50.00, 50.00, 50.00, 61.79, 62.51, 36.00, 21, 21, 22, 27, 26, 25),
('5YGLiu7ebWcnqoghFBk3yy', 3, 50.00, 50.00, 50.00, 35.88, 80.00, 2.00, 10, 10, 10, 37, 37, 37),
('5YzDr5BIEDHfmY0XfGiTXn', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 78.00, 16, 16, 15, 7, 7, 7),
('623SXRZfjnTnvCAM0CT1CP', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 92.11, 3, 3, 4, 4, 4, 4),
('63BokRfXSQhEU6Qi2dSJpZ', 3, 50.00, 50.00, 50.00, 100.00, 80.00, 20.00, 12, 12, 12, 35, 33, 32),
('679RG1vQ3m1liChyglObX9', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 77.06, 18, 18, 17, 9, 10, 9),
('6S1oHrwjeF66VRUl1b76P6', 5, 50.00, 50.00, 94.29, 80.00, 51.00, 48.00, 13, 13, 13, 17, 20, 19),
('76Ceb3pvgGsZb40pSIrSMH', 2, 50.00, 50.00, 50.00, 50.00, 90.00, 23.53, 36, 36, 36, 34, 32, 31),
('79hH8RuVS9af6ixS97wREx', 3, 50.00, 50.00, 50.00, 26.67, 50.00, 32.00, 35, 25, 25, 29, 27, 26),
('7biNtleYMSu76rXoujFM43', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 12.00, 37, 37, 37, 36, 35, 34),
('7jIujRjK5JKNrMCcAvYUTN', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 50.00, 26, 26, 25, 19, 16, 14),
('7y9yjpRtZajYzVpXHRjwGz', 1, 50.00, 50.00, 50.00, 50.00, 50.00, 52.14, 23, 24, 23, 15, 14, 13);

-- --------------------------------------------------------

--
-- Estrutura para tabela `musica_reproducao`
--

CREATE TABLE `musica_reproducao` (
  `reproducao_id` int(11) NOT NULL,
  `musica_id` varchar(100) DEFAULT NULL,
  `volume` decimal(5,2) DEFAULT NULL,
  `data_execucao` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `musica_reproducao`
--

INSERT INTO `musica_reproducao` (`reproducao_id`, `musica_id`, `volume`, `data_execucao`) VALUES
(51, '3ssX20QT5c3nA9wk78V1LQ', 31.00, '2025-04-28'),
(52, '2Vpj5colB0MPy3Zg5SITEC', 72.00, '2025-04-28'),
(53, '2gXI6TBLhmCNy09NioMHdI', 68.00, '2025-04-28'),
(54, '7jIujRjK5JKNrMCcAvYUTN', 58.00, '2025-04-28'),
(55, '377UbxXV2YEA28V4Go9aDw', 35.00, '2025-04-28'),
(56, '1dF5Y2dd7Wm4wZKvVjWBpr', 47.00, '2025-04-28'),
(57, '1pOIpxfrQ8AszXZdKR3aH3', 21.00, '2025-04-28'),
(58, '1lNcMbhjMZe0GGHYqjSQib', 65.00, '2025-04-28'),
(138, '3ssX20QT5c3nA9wk78V1LQ', 10.00, '2025-04-30'),
(139, '503OTo2dSqe7qk76rgsbep', 6.00, '2025-04-30'),
(140, '4LwU4Vp6od3Sb08CsP99GC', 18.00, '2025-04-30'),
(141, '2Ih217RCGAmyQR68Nn7Cqo', 23.00, '2025-04-30'),
(142, '1kFyVRbMT4JJynQgTFWKZj', 94.00, '2025-04-30'),
(143, '6S1oHrwjeF66VRUl1b76P6', 31.00, '2025-04-30'),
(144, '3ssX20QT5c3nA9wk78V1LQ', 40.00, '2025-04-30'),
(145, '503OTo2dSqe7qk76rgsbep', 81.00, '2025-04-30');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `musica`
--
ALTER TABLE `musica`
  ADD PRIMARY KEY (`musica_id`);

--
-- Índices de tabela `musica_reproducao`
--
ALTER TABLE `musica_reproducao`
  ADD PRIMARY KEY (`reproducao_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `musica_reproducao`
--
ALTER TABLE `musica_reproducao`
  MODIFY `reproducao_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
