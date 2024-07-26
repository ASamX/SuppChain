-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2024 at 03:22 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supplychainmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `parent_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 'Furniture', 'This is a fake discrption for the Main categories card', 'CategoryImages/M7CkeDaX4UlJrHHA54xQi6PjrxK7ZklHn8gRT1vq.jpg', NULL, '2024-06-01 10:01:09', '2024-06-07 13:32:30', NULL),
(6, 'Electronics', 'This is a fake discrption for the Main categories card', 'CategoryImages/CwzMf3EXJEfJgfKJybGsMpdn8eBLKPimqG8tRp1U.jpg', NULL, '2024-06-01 10:02:00', '2024-06-01 10:02:00', NULL),
(7, 'Accessories', 'This is a fake discrption for the Main categories card', 'CategoryImages/U5kSWebZ0dnTqViSOOtp7tRVWxUaZOujANYavMHb.jpg', NULL, '2024-06-01 10:02:44', '2024-06-01 10:02:44', NULL),
(8, 'Beds', 'This is a fake discrption for the Child categories card', 'CategoryImages/oBggYGjO8U997WHzu0tHT1EiQBNi9QlAeVGUaVb4.jpg', 5, '2024-06-01 10:03:35', '2024-06-07 13:32:47', NULL),
(9, 'Chairs', 'This is a fake discrption for the Child categories card', 'CategoryImages/FzQhr7SfjIb8eHFKF8icV17LSAQP0LJpXfdcu9FS.jpg', 5, '2024-06-01 10:06:18', '2024-06-01 10:06:18', NULL),
(10, 'Tables', 'This is a fake discrption for the Child categories card', 'CategoryImages/Efetg0HuuJB54m5kkYMPcIdFBLpVqCMbUdOrncm5.jpg', 5, '2024-06-01 10:07:40', '2024-06-01 10:07:40', NULL),
(11, 'Labtops', 'This is a fake discrption for the Child categories card', 'CategoryImages/LOs3w3UA4oAwF4Hl3uqqDsR6m0RBitWGNURpyb4n.jpg', 6, '2024-06-01 10:13:55', '2024-06-01 10:13:55', NULL),
(12, 'Phones', 'This is a fake discrption for the Child categories card', 'CategoryImages/WgUht5pG1DOvMSJQUWMgyn0pedDmqbO8M7F6lGkI.jpg', 6, '2024-06-01 10:14:18', '2024-06-01 10:15:51', NULL),
(13, 'Watches', 'This is a fake discrption for the Child categories card', 'CategoryImages/jNzDBlg5PeN5T9DwKcxFsPdxgMGN2bZiO4xQKXtP.jpg', 6, '2024-06-01 10:16:44', '2024-06-01 10:16:44', NULL),
(14, 'Necklaces', 'This is a fake discrption for the Child categories card', 'CategoryImages/2RgUcG8ROlG3u6CNMMr3hKo1tfpFbEvJ9rJdW9rn.jpg', 7, '2024-06-01 10:24:06', '2024-06-01 10:25:16', NULL),
(15, 'Bracelets', 'This is a fake discrption for the Child categories card', 'CategoryImages/3LtgCVOLIOkMH1N9aV53QaE7yQyQexZifDx4pQBn.jpg', 7, '2024-06-01 10:26:10', '2024-06-01 10:26:10', NULL),
(16, 'Rings', 'This is a fake discrption for the Child categories card', 'CategoryImages/17ujosKHGMPcu8dHTkWl6OLleqATe1f8cJTLbI1b.jpg', 7, '2024-06-01 10:26:34', '2024-06-01 10:26:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `derivers`
--

CREATE TABLE `derivers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `car_number` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `derivers`
--

INSERT INTO `derivers` (`id`, `name`, `car_number`, `phone`, `image`, `created_at`, `updated_at`) VALUES
(1, 'adasdsadsdd', 'dasdsds', '01118111118', NULL, '2024-05-30 01:44:29', '2024-05-30 01:44:29');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_11_09_124903_create_suppliers_table', 1),
(6, '2023_11_09_135226_create_raw_materials_table', 1),
(7, '2023_11_09_135939_create_schedulings_table', 1),
(8, '2023_11_18_122322_create_categories_table', 1),
(9, '2023_11_18_122514_create_products_table', 1),
(10, '2023_11_18_122537_create_orders_table', 1),
(11, '2023_11_18_122547_create_order_items_table', 1),
(12, '2023_11_21_074304_create_product_colors_table', 1),
(13, '2023_11_21_074312_create_product_sizes_table', 1),
(14, '2023_11_21_115429_create_product_images_table', 1),
(15, '2023_12_21_113946_create_comments_table', 1),
(16, '2023_12_21_143544_create_ratings_table', 1),
(17, '2024_01_25_125023_create_order_histories_table', 1),
(18, '2024_01_25_134744_create_shop_information_table', 1),
(19, '2024_01_25_134834_create_sales_table', 1),
(20, '2024_03_19_144240_create_retrievals_table', 1),
(21, '2024_03_19_150743_create_derivers_table', 1),
(22, '2024_05_27_085909_create_schedules_table', 1),
(23, '2024_05_29_185430_create_shippings_table', 1),
(24, '2024_05_29_185532_create_shipping_products_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `shipping_method` varchar(255) NOT NULL,
  `shipping_amount` decimal(8,2) DEFAULT NULL,
  `tax_amount` decimal(8,2) DEFAULT NULL,
  `total` decimal(8,2) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'pending',
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `name`, `email`, `phone`, `address`, `city`, `state`, `zipCode`, `country`, `shipping_method`, `shipping_amount`, `tax_amount`, `total`, `payment_method`, `payment_status`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, NULL, 'name', 'morazaamsa@email.com', '01090104118', 'morazama', 'morazama@email.com', 'wood', 'morazama', 'morazama', 'wood', '10.20', '60.30', '1500.00', 'morazama', 'pending', 'pending', 'wood', '2024-05-30 02:23:40', '2024-05-30 02:23:40');

-- --------------------------------------------------------

--
-- Table structure for table `order_histories`
--

CREATE TABLE `order_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `subtotal` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `discount_price` decimal(8,2) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `raw_material_name` varchar(255) NOT NULL,
  `raw_material_quantity_kg` decimal(8,3) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount_price`, `category_id`, `quantity`, `active`, `raw_material_name`, `raw_material_quantity_kg`, `created_at`, `updated_at`) VALUES
(5, 'Woven bed', 'This is a fake discrption for the Products card', '200.00', '10.00', 8, 8, 1, 'wood', '5.000', '2024-06-01 12:03:16', '2024-06-07 22:02:39'),
(8, 'Storage bed', 'This is a fake discrption for the Products card', '350.00', '50.00', 8, 2, 1, 'Metal', '100.000', '2024-06-01 13:45:17', '2024-06-07 22:18:43'),
(9, 'Bunk bed', 'This is a fake discrption for the Products card', '280.00', '30.00', 8, 2, 1, 'wood', '78.000', '2024-06-01 13:47:11', '2024-06-07 22:03:48'),
(12, 'Deck Chairs', 'This is a fake discrption for the Products card', '60.00', '5.00', 9, 1, 0, 'wood', '5.000', '2024-06-01 14:12:35', '2024-06-02 18:58:51'),
(14, 'Dining chair', 'This is a fake discrption for the Products card', '80.00', '10.00', 9, 0, 0, 'wood', '10.000', '2024-06-01 14:15:00', '2024-06-01 14:15:00'),
(15, 'Wingback Chair', 'This is a fake discrption for the Products card', '120.00', '15.00', 9, 0, 0, 'wood', '30.000', '2024-06-01 14:15:52', '2024-06-01 14:15:52'),
(16, 'BedSide tables', 'This is a fake discrption for the Products card', '75.00', '5.00', 10, 0, 0, 'wood', '25.000', '2024-06-01 14:16:55', '2024-06-01 14:16:55'),
(17, 'Dining tables', 'This is a fake discrption for the Products card', '150.00', '10.00', 10, 2, 0, 'wood', '30.000', '2024-06-01 14:17:56', '2024-06-07 14:39:57'),
(18, 'Coffe tables', 'This is a fake discrption for the Products card', '90.00', '5.00', 10, 0, 0, 'wood', '20.000', '2024-06-01 14:19:25', '2024-06-01 14:19:25'),
(19, 'Mackbook pro', 'This is a fake discrption for the Products card', '1500.00', '10.00', 11, 0, 1, 'Metal', '0.000', '2024-06-01 14:38:02', '2024-06-01 14:38:02'),
(20, 'HP labtop', 'This is a fake discrption for the Products card', '500.00', '50.00', 11, 0, 0, 'Metal', '5.000', '2024-06-01 14:38:47', '2024-06-01 14:38:47'),
(21, 'Dell labtop', 'This is a fake discrption for the Products card', '300.00', '25.00', 11, 1, 1, 'Metal', '3.000', '2024-06-01 14:39:32', '2024-06-07 16:46:33'),
(22, 'I phone 15 pro max', 'This is a fake discrption for the Products card', '1200.00', '30.00', 12, 1, 0, 'Metal', '1.000', '2024-06-01 14:40:58', '2024-06-02 19:02:47'),
(23, 'Samsung s24 Ultra', 'This is a fake discrption for the Products card', '1200.00', '100.00', 12, 1, 0, 'Metal', '1.000', '2024-06-01 14:41:42', '2024-06-07 16:06:52'),
(24, 'Xaomi 14 Ultra', 'This is a fake discrption for the Products card', '800.00', '30.00', 12, 1, 1, 'Metal', '1.000', '2024-06-01 14:42:31', '2024-06-07 16:48:29'),
(25, 'Tissot-PRX-40', 'This is a fake discrption for the Products card', '250.00', '10.00', 13, 0, 0, 'Metal', '1.000', '2024-06-01 14:43:20', '2024-06-01 14:43:20'),
(26, 'Casio watch', 'This is a fake discrption for the Products card', '150.00', '5.00', 13, 0, 0, 'Metal', '1.000', '2024-06-01 14:44:40', '2024-06-01 14:44:40'),
(27, 'Classic watch', 'This is a fake discrption for the Products card', '80.00', '0.00', 13, 1, 0, 'Metal', '1.000', '2024-06-01 14:45:33', '2024-06-07 16:14:30'),
(29, 'Yldiz Necklace', 'This is a fake discrption for the Products card', '60.00', '5.00', 14, 0, 0, 'Metal', '1.000', '2024-06-01 14:52:51', '2024-06-01 14:52:51'),
(30, 'Triple Stone Heart Necklace', 'This is a fake discrption for the Products card', '85.00', '5.00', 14, 0, 0, 'Metal', '1.000', '2024-06-01 14:53:33', '2024-06-01 14:53:33'),
(31, 'White gold', 'This is a fake discrption for the Products card', '500.00', '100.00', 14, 2, 0, 'Metal', '1.000', '2024-06-01 14:54:12', '2024-06-07 10:11:34'),
(32, 'Link Bracelet', 'This is a fake discrption for the Products card', '65.00', '15.00', 15, 2, 0, 'Metal', '1.000', '2024-06-01 14:55:05', '2024-06-07 15:04:23'),
(33, 'Heart Silver Bracelet', 'This is a fake discrption for the Products card', '55.00', '5.00', 15, 0, 0, 'Metal', '1.000', '2024-06-01 14:55:50', '2024-06-01 14:55:50'),
(34, 'Exquisite Fashion Bracelet', 'This is a fake discrption for the Products card', '80.00', '10.00', 15, 0, 0, 'Metal', '1.000', '2024-06-01 14:56:33', '2024-06-01 14:56:33'),
(37, 'The Alma Ring', 'This is a fake discrption for the Products card', '160.00', '60.00', 16, 0, 0, 'Metal', '1.000', '2024-06-01 14:58:19', '2024-06-01 14:58:19'),
(40, 'Venise Stackable Ring Set', 'This is a fake discrption for the Products card', '60.00', '5.00', 16, 0, 0, 'Metal', '1.000', '2024-06-02 15:38:23', '2024-06-02 15:38:23'),
(41, 'Sparkling Crown Solitaire Ring', 'This is a fake discrption for the Products card', '150.00', '10.00', 16, 0, 0, 'Metal', '1.000', '2024-06-02 15:39:07', '2024-06-02 15:41:26');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `color` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(6, 8, 'productImages/vQCfRzvNBlCba3BeP4MPR8wJ8MzERclnYLd4XyKy.jpg', '2024-06-01 13:45:18', '2024-06-01 13:45:18'),
(7, 9, 'productImages/PRPz93tqezEZtsFIfRlU40ypZ9pxYITIsgTR2Y0Q.jpg', '2024-06-01 13:47:11', '2024-06-01 13:47:11'),
(10, 12, 'productImages/wO7YJRSqGzPjmeBEpY9irkj6bIdaW4bFkU333l5e.jpg', '2024-06-01 14:12:35', '2024-06-01 14:12:35'),
(11, 14, 'productImages/is6BYmqlU5H1GpK1hc5lMdPwabGpxl1oc6H54Ovm.jpg', '2024-06-01 14:15:00', '2024-06-01 14:15:00'),
(12, 15, 'productImages/IHFg4uyo44BkA2Od6uIhxWypORf92lxM1zliW86f.jpg', '2024-06-01 14:15:52', '2024-06-01 14:15:52'),
(13, 16, 'productImages/HNncTyhZjekhg4TcJs7j9q17nngeOtDVc2w898rj.jpg', '2024-06-01 14:16:56', '2024-06-01 14:16:56'),
(14, 17, 'productImages/gVW9EiwdEHdE4iI7ayAQxVjnd1NFuKOg7ZZcpKos.jpg', '2024-06-01 14:17:56', '2024-06-01 14:17:56'),
(15, 18, 'productImages/s3DZqNVNNaMRItTNLWU2nfSim33DIhOmMGN1dWAB.jpg', '2024-06-01 14:19:26', '2024-06-01 14:19:26'),
(16, 19, 'productImages/CsWeJZWTLkWdVl7NQVoJ4CMEZ9PCLhmiuCTWEEsF.jpg', '2024-06-01 14:38:03', '2024-06-01 14:38:03'),
(17, 20, 'productImages/QR35Yyz4ohtbtpTiJlsbI9NMUL5swAiEV7tbnLoo.jpg', '2024-06-01 14:38:48', '2024-06-01 14:38:48'),
(18, 21, 'productImages/XjxXwnKoSHk9GU9q9D4vtjqXOkwNgFDNJWQ1Inbk.jpg', '2024-06-01 14:39:32', '2024-06-01 14:39:32'),
(19, 22, 'productImages/cBk8pYBrKaC8ThcQjjXbFtN0lhvDUFcKAXDDIjIr.jpg', '2024-06-01 14:40:59', '2024-06-01 14:40:59'),
(20, 23, 'productImages/o23dQxWqeaHY8P1INdFBYvLdu9g4ylIMggLlEW7i.jpg', '2024-06-01 14:41:42', '2024-06-01 14:41:42'),
(21, 24, 'productImages/XpDWaDutZhUInThQ1GDs3PR5c79J0i2XjU8nEbAz.jpg', '2024-06-01 14:42:32', '2024-06-01 14:42:32'),
(22, 25, 'productImages/HD4OGOoq956eo18Ob9NiN1Ra5iAnCw8VPhq3Q33K.jpg', '2024-06-01 14:43:20', '2024-06-01 14:43:20'),
(23, 26, 'productImages/TyHUuqqP9zjAvqUwDwX2PSJ0YWnaYijKksm5mS2c.jpg', '2024-06-01 14:44:41', '2024-06-01 14:44:41'),
(24, 27, 'productImages/moPTud7Qd8z9xlarwmcSlBlKwVo2jVAFNMW6Q4Ej.jpg', '2024-06-01 14:45:33', '2024-06-01 14:45:33'),
(26, 29, 'productImages/8atoBrLQSaUddI3qL0yeq0Hq9KIY2MJDF0mdQ4Se.jpg', '2024-06-01 14:52:52', '2024-06-01 14:52:52'),
(27, 30, 'productImages/dgZHxkKb3vP4JFqpBrYcsNPcJkKs9KNlpI8anHvl.jpg', '2024-06-01 14:53:33', '2024-06-01 14:53:33'),
(28, 31, 'productImages/z6LtZuIns9UXtcqsDLvhNddFGEn3U2lhjVV58cBy.jpg', '2024-06-01 14:54:12', '2024-06-01 14:54:12'),
(29, 32, 'productImages/qi1AdyEomsvdfZiUBrJkXByK18cP2Q4Ge6hO0Dt7.jpg', '2024-06-01 14:55:05', '2024-06-01 14:55:05'),
(30, 33, 'productImages/aS7IYolRSplJW7INkKEusj3iG0e6GuXmLLoL4L7j.webp', '2024-06-01 14:55:51', '2024-06-01 14:55:51'),
(31, 34, 'productImages/zRv6ntWnvLxY3uciDndaOhRbyksQJRryufzZ7gst.jpg', '2024-06-01 14:56:33', '2024-06-01 14:56:33'),
(34, 37, 'productImages/ZOrsw7fSfHwetmCfKchHNA04vKXWHLKON0fQBUP6.jpg', '2024-06-01 14:58:20', '2024-06-01 14:58:20'),
(43, 5, 'productImages/jAmZftEa4DmJBhsSMbl9QtAyMsFGQiGFZvZGUKsD.jpg', '2024-06-01 19:22:03', '2024-06-01 19:22:03'),
(45, 40, 'productImages/eEZoFDH6TURbX6tsnivw3PE6pSvjtEgvF74hJrJS.jpg', '2024-06-02 15:38:24', '2024-06-02 15:38:24'),
(51, 41, 'productImages/IzOh10dIZDPsjE4c3aMh8BflZp8ghEkjLI6FD40N.jpg', '2024-06-02 15:41:26', '2024-06-02 15:41:26');

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `length` decimal(8,2) NOT NULL,
  `width` decimal(8,2) NOT NULL,
  `height` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `raw_materials`
--

CREATE TABLE `raw_materials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity_kg` varchar(255) NOT NULL DEFAULT '0',
  `supplier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `raw_materials`
--

INSERT INTO `raw_materials` (`id`, `name`, `quantity_kg`, `supplier_id`, `created_at`, `updated_at`) VALUES
(1, 'Wood', '6032', 3, '2024-05-31 16:32:39', '2024-06-07 22:08:21'),
(2, 'Metal', '773', 3, '2024-05-31 16:32:54', '2024-06-07 22:18:43'),
(9, 'Plastic', '1000', 3, '2024-05-31 16:34:03', '2024-05-31 16:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `retrievals`
--

CREATE TABLE `retrievals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `shop_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `quantity`, `shop_id`, `product_id`, `created_at`, `updated_at`) VALUES
(6, 5, 7, 5, '2024-06-03 15:14:15', '2024-06-01 15:14:15'),
(7, 5, 6, 5, '2024-06-04 15:31:36', '2024-06-01 15:31:36'),
(8, 3, 8, 8, '2024-06-05 15:42:12', '2024-06-01 15:42:12'),
(9, 6, 11, 9, '2024-06-05 15:42:20', '2024-06-01 15:42:20'),
(36, 2, 10, 19, '2024-06-06 16:14:54', '2024-06-01 16:14:54'),
(42, 1, 7, 5, '2024-06-07 16:50:55', '2024-06-02 18:50:55'),
(50, 1, 8, 5, '2024-06-07 22:02:39', '2024-06-07 22:02:39'),
(51, 1, 8, 5, '2024-06-07 22:02:39', '2024-06-07 22:02:39');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `quantity`, `status`, `product_id`, `created_at`, `updated_at`) VALUES
(16, 1, 'Accept', 22, '2024-06-02 17:57:54', '2024-06-02 19:02:47'),
(17, 3, 'Accept', 5, '2024-06-02 18:28:32', '2024-06-06 19:09:30'),
(18, 3, 'Pending', 8, '2024-06-02 18:31:55', '2024-06-02 18:31:55'),
(19, 3, 'Accept', 5, '2024-06-06 13:53:30', '2024-06-07 16:51:32'),
(20, 10, 'Accept', 24, '2024-06-06 13:54:38', '2024-06-07 15:09:22'),
(21, 2, 'Accept', 31, '2024-06-07 10:11:05', '2024-06-07 10:11:34'),
(22, 2, 'Accept', 17, '2024-06-07 14:39:31', '2024-06-07 14:39:57'),
(23, 2, 'Accept', 32, '2024-06-07 15:03:09', '2024-06-07 15:04:23'),
(24, 1, 'Accept', 23, '2024-06-07 15:12:50', '2024-06-07 15:13:06'),
(25, 1, 'Accept', 23, '2024-06-07 15:15:44', '2024-06-07 15:15:58'),
(26, 1, 'Accept', 23, '2024-06-07 15:22:32', '2024-06-07 15:23:32'),
(27, 1, 'Accept', 23, '2024-06-07 15:22:44', '2024-06-07 16:05:03'),
(28, 1, 'Accept', 23, '2024-06-07 15:22:44', '2024-06-07 16:06:52'),
(29, 1, 'Accept', 27, '2024-06-07 16:08:22', '2024-06-07 16:09:22'),
(30, 1, 'Accept', 27, '2024-06-07 16:08:30', '2024-06-07 16:11:46'),
(31, 1, 'Accept', 27, '2024-06-07 16:08:39', '2024-06-07 16:14:30'),
(32, 1, 'Accept', 21, '2024-06-07 16:45:55', '2024-06-07 16:46:33'),
(33, 1, 'Accept', 24, '2024-06-07 16:47:52', '2024-06-07 16:48:29'),
(34, 1, 'Accept', 9, '2024-06-07 22:01:21', '2024-06-07 22:03:48'),
(35, 1, 'Accept', 8, '2024-06-07 22:16:46', '2024-06-07 22:17:27'),
(36, 1, 'Accept', 8, '2024-06-07 22:18:18', '2024-06-07 22:18:43');

-- --------------------------------------------------------

--
-- Table structure for table `scheduling`
--

CREATE TABLE `scheduling` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shippings`
--

CREATE TABLE `shippings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `destination` varchar(255) NOT NULL,
  `deriver_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shippings`
--

INSERT INTO `shippings` (`id`, `destination`, `deriver_id`, `created_at`, `updated_at`) VALUES
(1, 'adasdsadsdd', 1, '2024-05-30 01:47:48', '2024-05-30 01:47:48'),
(2, 'sadsads', 1, '2024-05-30 01:47:55', '2024-05-30 01:48:14');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_products`
--

CREATE TABLE `shipping_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `shipping_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shop_information`
--

CREATE TABLE `shop_information` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_name` varchar(255) NOT NULL,
  `shopAdmin_id` bigint(20) UNSIGNED DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop_information`
--

INSERT INTO `shop_information` (`id`, `shop_name`, `shopAdmin_id`, `address`, `image`, `created_at`, `updated_at`) VALUES
(6, 'Helwan', 3, 'This is a fake address for all the warhouses as a primary test', 'shop_info/A8Yn6JxexOg7GJpVWPYRORg07xTSHHivwPInxAXO.jpg', '2024-06-01 09:31:19', '2024-06-07 13:56:42'),
(7, 'Alexndria', 4, 'This is a fake address for all the warhouses as a primary test', 'shop_info/e6YhqT5Drl8WW7wg5FwxNoajjU9ePWmKfqTx8iTA.jpg', '2024-06-01 09:37:09', '2024-06-01 09:58:07'),
(8, '6th of october', 5, 'This is a fake address for all the warhouses as a primary test', 'shop_info/bsgKmMTZxgqmGfzT15jtNJyJlyngpgFJsHpijc3N.webp', '2024-06-01 09:38:28', '2024-06-01 09:58:17'),
(9, 'Hurghada', 6, 'This is a fake address for all the warhouses as a primary test', 'shop_info/0EJVvkP0EXliM1vyI6YYVYZLhiiP0y7Hy6l6sIJw.jpg', '2024-06-01 09:39:50', '2024-06-01 09:54:01'),
(10, '5th settlement', 7, 'This is a fake address for all the warhouses as a primary test', 'shop_info/qe7rdzva7jMdfp42tq8B7hgz5GM5mlUOLuxVbfCl.jpg', '2024-06-01 09:52:52', '2024-06-01 09:52:52'),
(11, 'Nasr city', 8, 'This is a fake address for all the warhouses as a primary test', 'shop_info/UJnTaZMShKXgVdVRmpt5ztAc5kvgzKK6BElp8iY7.webp', '2024-06-01 09:58:49', '2024-06-01 09:58:49');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `supplier_email` varchar(255) NOT NULL,
  `raw_materials` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `supplier_name`, `supplier_email`, `raw_materials`, `phone`, `image`, `created_at`, `updated_at`) VALUES
(3, 'Wood Supplier', 'WoodSupplier@email.com', 'Wood', '0102021516', 'supplier/MyeJXi3SnCQeAIjFJGyLzHFqjh8ipCIyIuwzbmVi.jpg', '2024-05-31 14:56:17', '2024-06-07 22:14:26'),
(6, 'Plastic Supplier', 'PlasticSupplier@gmail.com', 'Plastic', '121211212', 'supplier/EnI8JE0dKnab50Nkylk0nbcF2Qq0db6k52IiYAMx.png', '2024-06-01 19:49:45', '2024-06-07 22:15:02'),
(7, 'Metal supplier', 'Metalsupplier@sfdasfsdf', 'Metal', '11212121212', 'supplier/6T4MwSJCmSxUJNETfAbXjHoznAEa1h8gdboXdE80.jpg', '2024-06-01 19:49:59', '2024-06-07 22:15:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `image`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', NULL, '$2y$12$eT0dhIe6Y62zbDqNXIGr4eBDxiz/tOzChmhilLcldrNxANUYvwnf2', 1, 'usersImage/4s54Z79jZAHn7aQccojWgddaaInNgwJurut5t1KJ.png', NULL, '2024-05-30 01:37:12', '2024-06-07 21:40:35'),
(2, 'FactoryAdmin', 'FactoryAdmin@gmail.com', NULL, '$2y$12$if4QY/jkItoU2ja5T0/yYe7XN3tUiv2txQdQ/Ptr5.fumzcabgAyi', 2, 'usersImage/dJxGsak0PPDHQ8g5wbPaeg7EVhE3VO07Dy3ixkfD.png', NULL, '2024-05-30 01:38:02', '2024-06-02 12:58:01'),
(3, 'ShopAdmin', 'ShopAdmin@gmail.com', NULL, '$2y$12$XDUio9s1FFGq52naNoR/NOUF6YcOuirT0TV1zZkau6KCcJbhQw.nC', 3, 'usersImage/ycVlvHoZPfKQ0wMPQCQ9iE6d85YnJfkRTdjqwkMu.jpg', NULL, '2024-05-30 01:38:17', '2024-06-02 12:57:43'),
(4, 'ShopAdmin2', 'ShopAdmin2@gmail.com', NULL, '$2y$12$/yVPC5K152A.IaajxSe0JOvcnThz/ZOwnXyP81wqEl9u7Di09yIIi', 3, 'usersImage/oDP8GqWVamjBvOQv9LBq7XvsKQGgdbfdsByLQuXz.jpg', NULL, '2024-06-02 15:51:35', '2024-06-02 15:51:35'),
(5, 'ShopAdmin3', 'ShopAdmin3@gmail.com', NULL, '$2y$12$GF7dHuFecY8LkQy4AowUrO/IYYctp1IjQHsE/qILrEopXCx6E01XW', 3, 'usersImage/17AJ6SmCqgYINY0RvGStZ1HFLXDqb5INF7bUrIU7.jpg', NULL, '2024-06-02 15:52:10', '2024-06-02 15:52:11'),
(6, 'ShopAdmin4', 'ShopAdmin4@gmail.com', NULL, '$2y$12$w8MBMYVUfSy43REH4HP0zOoZzjrbEVOLE3QFV7h2QGyrbwgEVhv.e', 3, 'usersImage/v7oO2aJOOcGIXi6QO0IsknVeii49New0CP9OL3L5.jpg', NULL, '2024-06-02 15:52:42', '2024-06-02 15:52:43'),
(7, 'ShopAdmin5', 'ShopAdmin5@gmail.com', NULL, '$2y$12$.jyEoQpxoxij6UO9JZIL6eu3Rc47jI7x3fy7Y/FRXt7LP853JsCJG', 3, 'usersImage/1Dm1yJxYWWm1vl1i30gRoscgepXXuBVmLByG2RuT.jpg', NULL, '2024-06-02 15:53:21', '2024-06-02 15:53:22'),
(8, 'ShopAdmin6', 'ShopAdmin6@gmail.com', NULL, '$2y$12$lkpwSve9.DFOE/g/SlF5KuSrho1v18izYtvN2wffEK0XXxRBzK9uq', 3, 'usersImage/MWtYWwRptc4fAjnzzaz2B223sFpCgFJoZ476E8Px.jpg', NULL, '2024-06-02 15:54:08', '2024-06-02 15:54:09'),
(9, 'User1', 'User1@gmail.com', NULL, '$2y$12$aN6y0PgU6Q85rUOy82hlwOfONWGDOAhsnLZ7ZslmZUf9BJ3hBzYZe', 0, 'usersImage/FT4zSVhj8BnePs1yCGcZf0BSdQOJkKfGEm7VdF8p.png', NULL, '2024-05-03 09:20:25', '2024-06-07 19:29:54'),
(10, 'User2', 'user2@gmail.com', NULL, '$2y$12$hD2HUZzMMVOh57Gv1BX.9OsB5ePRhq4ejkCiOoiB.JV5HV1G/pxiq', 0, 'usersImage/KRvNcXOthwhEdxMHhwTgdBdVD2RGkFwOZnDKx03i.png', NULL, '2024-06-01 12:39:45', '2024-06-07 19:30:02'),
(11, 'User3', 'user3@gmail.com', NULL, '$2y$12$Dj.gEltRFL/c9lUDXp6e.uwiRQ/Xw4aXJtM99gYxUhQFy8FJQ5NsC', 0, 'usersImage/V5MYE0XxmsYtwlKIuSMs2aAt2EPgiq1PQiVWDsJF.png', NULL, '2024-06-02 12:40:37', '2024-06-07 19:30:06'),
(12, 'User4', 'User4@gmail.com', NULL, '$2y$12$kV8LwAeTU/BoiKO5xDJ5meGxXAJTJZbeSU8l9D4pxFe42kPxulSfW', 0, 'usersImage/w1AU67ey66MwWvoKsuMqworbavAKc4KPHzBBtYbU.png', NULL, '2024-06-02 12:49:27', '2024-06-07 19:30:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_product_id_foreign` (`product_id`);

--
-- Indexes for table `derivers`
--
ALTER TABLE `derivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_histories`
--
ALTER TABLE `order_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_histories_order_id_foreign` (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_colors_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sizes_product_id_foreign` (`product_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ratings_user_id_foreign` (`user_id`),
  ADD KEY `ratings_product_id_foreign` (`product_id`);

--
-- Indexes for table `raw_materials`
--
ALTER TABLE `raw_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `raw_materials_supplier_id_foreign` (`supplier_id`);

--
-- Indexes for table `retrievals`
--
ALTER TABLE `retrievals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `retrievals_product_id_foreign` (`product_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_shop_id_foreign` (`shop_id`),
  ADD KEY `sales_product_id_foreign` (`product_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_product_id_foreign` (`product_id`);

--
-- Indexes for table `scheduling`
--
ALTER TABLE `scheduling`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shippings_deriver_id_foreign` (`deriver_id`);

--
-- Indexes for table `shipping_products`
--
ALTER TABLE `shipping_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipping_products_product_id_foreign` (`product_id`),
  ADD KEY `shipping_products_shipping_id_foreign` (`shipping_id`);

--
-- Indexes for table `shop_information`
--
ALTER TABLE `shop_information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_information_shopadmin_id_foreign` (`shopAdmin_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `derivers`
--
ALTER TABLE `derivers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_histories`
--
ALTER TABLE `order_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `raw_materials`
--
ALTER TABLE `raw_materials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `retrievals`
--
ALTER TABLE `retrievals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `scheduling`
--
ALTER TABLE `scheduling`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shipping_products`
--
ALTER TABLE `shipping_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shop_information`
--
ALTER TABLE `shop_information`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=308;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_histories`
--
ALTER TABLE `order_histories`
  ADD CONSTRAINT `order_histories_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `raw_materials`
--
ALTER TABLE `raw_materials`
  ADD CONSTRAINT `raw_materials_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `retrievals`
--
ALTER TABLE `retrievals`
  ADD CONSTRAINT `retrievals_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sales_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shop_information` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shippings`
--
ALTER TABLE `shippings`
  ADD CONSTRAINT `shippings_deriver_id_foreign` FOREIGN KEY (`deriver_id`) REFERENCES `derivers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shipping_products`
--
ALTER TABLE `shipping_products`
  ADD CONSTRAINT `shipping_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shipping_products_shipping_id_foreign` FOREIGN KEY (`shipping_id`) REFERENCES `shippings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shop_information`
--
ALTER TABLE `shop_information`
  ADD CONSTRAINT `shop_information_shopadmin_id_foreign` FOREIGN KEY (`shopAdmin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
