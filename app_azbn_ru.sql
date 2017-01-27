-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Янв 27 2017 г., 08:12
-- Версия сервера: 5.7.16-0ubuntu0.16.04.1
-- Версия PHP: 5.6.29-1+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(3, 1, 1485493554, 1800, 'Загрузка видео по яндексовским новостям', 'yandex/load.news', '{}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_yt_token`
--

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

CREATE TABLE `app_yt_video` (
  `id` int(11) NOT NULL,
  `q` varchar(256) NOT NULL DEFAULT '',
  `uid` varchar(256) NOT NULL DEFAULT '',
  `img` varchar(256) NOT NULL DEFAULT '',
  `title` varchar(256) NOT NULL DEFAULT '',
  `description` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
