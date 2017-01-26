-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Янв 26 2017 г., 10:09
-- Версия сервера: 5.7.16-0ubuntu0.16.04.1
-- Версия PHP: 5.6.29-1+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `app_azbn_ru`
--

-- --------------------------------------------------------

--
-- Структура таблицы `app_fork`
--

DROP TABLE IF EXISTS `app_fork`;
CREATE TABLE `app_fork` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `lastact` int(11) NOT NULL DEFAULT '0',
  `period` int(11) NOT NULL DEFAULT '10000',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL,
  `data` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_fork`
--

INSERT INTO `app_fork` (`id`, `status`, `lastact`, `period`, `title`, `path`, `data`) VALUES
(1, 0, 0, 8, 'Вывод списка подпроцессов', 'mysql.fork.list', '{}'),
(2, 0, 0, 3, 'Test', 'test', '{}'),
(3, 1, 1485414116, 1800, 'Загрузка видео по яндексовским новостям', 'yandex/load.news', '{}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_yt_token`
--

DROP TABLE IF EXISTS `app_yt_token`;
CREATE TABLE `app_yt_token` (
  `id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `q` varchar(256) NOT NULL DEFAULT '',
  `code` text NOT NULL,
  `tokens` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_yt_token`
--

INSERT INTO `app_yt_token` (`id`, `created_at`, `q`, `code`, `tokens`) VALUES
(4, 1485379757, 'моника белуччи', '4/ikX0AoZI-Ce3eLUkcgI63rCfaCqP9VhmgMBItR8Gt_s', '{"access_token":"ya29.GlveA9nnEXGgdkb1gQlVCLQoe8xw4_sx7FwzE0Bh3-KidAU64MijZs6Cy2J-d1he5y01NwUFBTdWS9CnmCj2UDyilpAvNY9MUjUGtpJ6dcao2E5MaCEIDT-jiMGQ","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0MzY0YjVmYjliODYxYzNhYTRkYTg5NWExMjk5NzZjMjgyZGJmYzIifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDg1Mzc5NzU3LCJleHAiOjE0ODUzODMzNTcsImF0X2hhc2giOiJxU0JZUHRWMTctN2VtZ05yVnF2RzZnIiwiYXVkIjoiNzE2OTA2NDgzODEyLXZmYmZwb2x0cmNlOWE3bDJuaWJndnVnYWc0bnB1ZjdlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1OTY2ODYxNTM4MDM1MDU3MTk1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjcxNjkwNjQ4MzgxMi12ZmJmcG9sdHJjZTlhN2wybmliZ3Z1Z2FnNG5wdWY3ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImVtYWlsIjoidmlkZW9taWdodHltaW5kLTA3OTRAcGFnZXMucGx1c2dvb2dsZS5jb20ifQ.MSJLEJLQrBtRK87LD4r2MKj4jvDUQxYlRWpl8Km4IlY0cXZWPnbo9wm78DJe_VVlh7e1At3LmQYkZRaaUvlGtM2A9aQaqRKqKeEmTK0NddLXstdhg66nrF2OvBLfyRiJRFNSFESFQBIDCY118K3XL4jP8KtIUlXlJxCwOV8uaxW7mjLinjz_RglTigZUIGbW62C_sh52uTQOAollNOylCcpVpMarbGXRhVD-MJiR1_Sq3rVc9gvOQOBqb4Qnc3GhHI5UKYzMZxnLccQ_qfDYbLrudg-mYlZY3cw4Yk0vyBQ6GCX00Hoi-nQmR87lzkbkZnEpKiCITQpmjT4s_yBkig","refresh_token":"1/vGsX45kAzrVgHMrO-T4q3gcH0Pw9QJZlRDgDOHErKXZzvfVzs9kFizWpXipRq5h8","token_type":"Bearer","expiry_date":1485383357971}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_yt_video`
--

DROP TABLE IF EXISTS `app_yt_video`;
CREATE TABLE `app_yt_video` (
  `id` int(11) NOT NULL,
  `q` varchar(256) NOT NULL DEFAULT '',
  `uid` varchar(256) NOT NULL DEFAULT '',
  `img` varchar(256) NOT NULL DEFAULT '',
  `title` varchar(256) NOT NULL DEFAULT '',
  `description` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_yt_video`
--

INSERT INTO `app_yt_video` (`id`, `q`, `uid`, `img`, `title`, `description`) VALUES
(1, 'февраль сеть видео', 'uu6C-sfT434', 'https://i.ytimg.com/vi/uu6C-sfT434/hqdefault.jpg', 'ДТП КАД СПБ февраль 27 02 2016', 'Занесло джип compilation of crashes and accidents Самая последняя подборка за февраль 2016 Ваши видео вы можете прислать...'),
(2, 'февраль сеть видео', 'EM7tVlFyKic', 'https://i.ytimg.com/vi/EM7tVlFyKic/hqdefault.jpg', 'Самое смешное в сети, февраль 2016 #9', 'Самое смешное в сети, февраль 2016 #9.'),
(3, 'февраль сеть видео', 'ELY9ggHCfCM', 'https://i.ytimg.com/vi/ELY9ggHCfCM/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine2', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(4, 'февраль сеть видео', 'aohODm2Jess', 'https://i.ytimg.com/vi/aohODm2Jess/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(5, 'февраль сеть видео', 'M91Uuhsp3rE', 'https://i.ytimg.com/vi/M91Uuhsp3rE/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(6, 'февраль сеть видео', 'rCcAk7TGmVk', 'https://i.ytimg.com/vi/rCcAk7TGmVk/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(7, 'февраль сеть видео', 'LLIAgRdpX1s', 'https://i.ytimg.com/vi/LLIAgRdpX1s/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(8, 'февраль сеть видео', 'U0C5IJRYguU', 'https://i.ytimg.com/vi/U0C5IJRYguU/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014 № 6    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(9, 'февраль сеть видео', 'RB83KJQ6tp0', 'https://i.ytimg.com/vi/RB83KJQ6tp0/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014 №5    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(10, 'февраль сеть видео', 'lGtHpXgGJBE', 'https://i.ytimg.com/vi/lGtHpXgGJBE/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(11, 'февраль сеть видео', 'zdaUP3_jG7k', 'https://i.ytimg.com/vi/zdaUP3_jG7k/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(12, 'февраль сеть видео', 'Kcn7MTqrXzA', 'https://i.ytimg.com/vi/Kcn7MTqrXzA/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine2', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(13, 'февраль сеть видео', 'Zii354Qb-Pw', 'https://i.ytimg.com/vi/Zii354Qb-Pw/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(14, 'февраль сеть видео', 'YWrTn-scpCo', 'https://i.ytimg.com/vi/YWrTn-scpCo/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(15, 'февраль сеть видео', '6CpE1bWtCo4', 'https://i.ytimg.com/vi/6CpE1bWtCo4/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ ФЕВРАЛЬ 2014', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(16, 'февраль сеть видео', 'xws3E7N2qHg', 'https://i.ytimg.com/vi/xws3E7N2qHg/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ ФЕВРАЛЬ 20141', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(17, 'февраль сеть видео', 'eEm7Kto-Zp0', 'https://i.ytimg.com/vi/eEm7Kto-Zp0/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 7    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(18, 'февраль сеть видео', 'Kp5vQ7mwFMc', 'https://i.ytimg.com/vi/Kp5vQ7mwFMc/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 8    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(19, 'февраль сеть видео', 'q6NyE7YfpWQ', 'https://i.ytimg.com/vi/q6NyE7YfpWQ/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 4    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(20, 'февраль сеть видео', 'G0cnePKxNxk', 'https://i.ytimg.com/vi/G0cnePKxNxk/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 6    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(21, 'февраль сеть видео', 'ChOxOd-KpsI', 'https://i.ytimg.com/vi/ChOxOd-KpsI/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ КОШКИ № 2   ЛУЧШАЯ подборка СМЕШНЫХ видео с КОШКАМИ ФЕВРАЛЬ 2014', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(22, 'февраль сеть видео', 'VtBTqAt-pLw', 'https://i.ytimg.com/vi/VtBTqAt-pLw/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ КОШКИ    ЛУЧШАЯ подборка СМЕШНЫХ видео с КОШКАМИ ФЕВРАЛЬ 2014', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(23, 'февраль сеть видео', 'pqDfL9ZM5LU', 'https://i.ytimg.com/vi/pqDfL9ZM5LU/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine2', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(24, 'февраль сеть видео', 'OTqvxX7QSC8', 'https://i.ytimg.com/vi/OTqvxX7QSC8/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(25, 'февраль сеть видео', 'Ofg_kJc7SKU', 'https://i.ytimg.com/vi/Ofg_kJc7SKU/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(26, 'февраль сеть видео', 'pJUxjQpv0u8', 'https://i.ytimg.com/vi/pJUxjQpv0u8/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(27, 'февраль сеть видео', 'yL1Ih9lxz9w', 'https://i.ytimg.com/vi/yL1Ih9lxz9w/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014 № 6    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(28, 'февраль сеть видео', '6tEMg-RkBJU', 'https://i.ytimg.com/vi/6tEMg-RkBJU/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014 №5    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(29, 'февраль сеть видео', 'lW64jTf-dSQ', 'https://i.ytimg.com/vi/lW64jTf-dSQ/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(30, 'февраль сеть видео', 's6-YyF5h9-Q', 'https://i.ytimg.com/vi/s6-YyF5h9-Q/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ ФЕВРАЛЬ 20141', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(31, 'февраль сеть видео', 'J4BlePyrFAQ', 'https://i.ytimg.com/vi/J4BlePyrFAQ/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ ТАНЦЫ февраль 2014    ЛУЧШАЯ подборка СМЕШНЫХ видео с ТАНЦУЮЩИМИ людьми', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(32, 'февраль сеть видео', 'hljwItkN8Bc', 'https://i.ytimg.com/vi/hljwItkN8Bc/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 8    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(33, 'февраль сеть видео', 'uonWuXizF5U', 'https://i.ytimg.com/vi/uonWuXizF5U/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 7    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(34, 'февраль сеть видео', '-46xRMh5m-w', 'https://i.ytimg.com/vi/-46xRMh5m-w/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ ФЕВРАЛЬ 2014', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(35, 'февраль сеть видео', 'XiCzOW3x_ak', 'https://i.ytimg.com/vi/XiCzOW3x_ak/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 4    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(36, 'февраль сеть видео', 'KG7aMIhVx6s', 'https://i.ytimg.com/vi/KG7aMIhVx6s/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ КОШКИ № 2   ЛУЧШАЯ подборка СМЕШНЫХ видео с КОШКАМИ ФЕВРАЛЬ 2014', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(37, 'февраль сеть видео', 'nrEZ4HT0z7o', 'https://i.ytimg.com/vi/nrEZ4HT0z7o/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ КОШКИ    ЛУЧШАЯ подборка СМЕШНЫХ видео с КОШКАМИ ФЕВРАЛЬ 2014', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(38, 'февраль сеть видео', '8QfiGzpg-eQ', 'https://i.ytimg.com/vi/8QfiGzpg-eQ/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 6    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(39, 'февраль сеть видео', 'i9645F51sx8', 'https://i.ytimg.com/vi/i9645F51sx8/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(40, 'февраль сеть видео', 'qFJVHEpNvhI', 'https://i.ytimg.com/vi/qFJVHEpNvhI/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine2', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(41, 'февраль сеть видео', '1sMUB_9YcT0', 'https://i.ytimg.com/vi/1sMUB_9YcT0/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014 № 6    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(42, 'февраль сеть видео', 'vccc41y6kto', 'https://i.ytimg.com/vi/vccc41y6kto/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(43, 'февраль сеть видео', 'eIJXDiNlV0s', 'https://i.ytimg.com/vi/eIJXDiNlV0s/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014    ЛУЧШИЕ видео из VINE1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(44, 'февраль сеть видео', 'DWLone4NBR8', 'https://i.ytimg.com/vi/DWLone4NBR8/hqdefault.jpg', 'Топ 10  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine    ФЕВРАЛЬ 2014 №5    ЛУЧШИЕ видео из VINE', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(45, 'февраль сеть видео', 'pBdEjhqz9xw', 'https://i.ytimg.com/vi/pBdEjhqz9xw/hqdefault.jpg', 'Топ 10  ЛУЧШИЕ видео из VINE февраль 2014  ЛУЧШАЯ ПОДБОРКА СМЕШНЫХ ВИДЕО из Vine1', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(46, 'февраль сеть видео', '1Q6PR3OVl0w', 'https://i.ytimg.com/vi/1Q6PR3OVl0w/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ КОШКИ № 2   ЛУЧШАЯ подборка СМЕШНЫХ видео с КОШКАМИ ФЕВРАЛЬ 2014', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(47, 'февраль сеть видео', '51tGVkmRBCA', 'https://i.ytimg.com/vi/51tGVkmRBCA/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 8    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(48, 'февраль сеть видео', 'gAjj0laxstI', 'https://i.ytimg.com/vi/gAjj0laxstI/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ ФЕВРАЛЬ 20141', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(49, 'февраль сеть видео', '2luIYAYrU2Q', 'https://i.ytimg.com/vi/2luIYAYrU2Q/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 6    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(50, 'февраль сеть видео', '-ZLoxwPO4ag', 'https://i.ytimg.com/vi/-ZLoxwPO4ag/hqdefault.jpg', 'ТОП 10  СМЕШНЫЕ СОБАКИ февраль 2014 № 3    ЛУЧШАЯ подборка СМЕШНЫХ видео с СОБАКАМИ', 'Получай деньги за свой канал на ютубе, присоединившись к медиа сети AIR (партнерке. БЕСПЛАТНО!) и получай...'),
(51, 'васильев член встреча', 'jQlijXOpWJ8', 'https://i.ytimg.com/vi/jQlijXOpWJ8/hqdefault.jpg', 'Встреча с Валерием Васильевым', 'Встреча с членом Совета Федерации Валерием Васильевым в приемной В. В. Путина.'),
(52, 'ребенок член встреча', 'MkYwuE0zUww', 'https://i.ytimg.com/vi/MkYwuE0zUww/hqdefault.jpg', 'Встреча с длинным черным членом', 'https://goo.gl/k4xGoH.'),
(53, 'ребенок член встреча', 'XtDOtAcFxXc', 'https://i.ytimg.com/vi/XtDOtAcFxXc/hqdefault.jpg', 'Встреча с длинным черным членом', 'https://goo.gl/8jlKec.'),
(54, 'ребенок член встреча', 'opjLdnTL2xI', 'https://i.ytimg.com/vi/opjLdnTL2xI/hqdefault.jpg', 'Встреча с собачкой))))) Наш новый член семьи- Бро ✌!!!', ''),
(55, 'ребенок член встреча', 'z0tyFofYgGw', 'https://i.ytimg.com/vi/z0tyFofYgGw/hqdefault.jpg', 'Негр на  встрече посадил на чёрный член бразильянку с большой попой', 'http://vk.cc/5uagrY.'),
(56, 'ребенок член встреча', 'EHHzTjpVnEE', 'https://i.ytimg.com/vi/EHHzTjpVnEE/hqdefault.jpg', 'Русская брюнетка в чулках ловко отсосала член на  встрече и отдалась в киску', 'http://bit.ly/29LwpJQ.'),
(57, 'сирия корабль встреча', 'uG_Sxpg0k5I', 'https://i.ytimg.com/vi/uG_Sxpg0k5I/hqdefault.jpg', 'Сирия: новый удар «Калибрами» — ракета  несется на встречу с ИГИЛ в небе Алеппо', 'Сирия: ракета «Калибр» несется на встречу с ИГИЛ в небе Алеппо.');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `app_fork`
--
ALTER TABLE `app_fork`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `app_yt_token`
--
ALTER TABLE `app_yt_token`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `app_yt_video`
--
ALTER TABLE `app_yt_video`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `app_fork`
--
ALTER TABLE `app_fork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `app_yt_token`
--
ALTER TABLE `app_yt_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `app_yt_video`
--
ALTER TABLE `app_yt_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
