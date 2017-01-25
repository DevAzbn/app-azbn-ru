-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 26 2017 г., 00:16
-- Версия сервера: 5.5.50-log
-- Версия PHP: 7.0.8

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

CREATE TABLE IF NOT EXISTS `app_fork` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `lastact` int(11) NOT NULL DEFAULT '0',
  `period` int(11) NOT NULL DEFAULT '10000',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL,
  `data` text
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_fork`
--

INSERT INTO `app_fork` (`id`, `status`, `lastact`, `period`, `title`, `path`, `data`) VALUES
(1, 0, 1485378735, 8, 'Вывод списка подпроцессов', 'mysql.fork.list', '{}'),
(2, 0, 1485378913, 3, 'Test', 'test', '{}'),
(3, 0, 0, 10, 'Загрузка видео по яндексовским новостям', 'yandex/load.news', '{}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_yt_token`
--

CREATE TABLE IF NOT EXISTS `app_yt_token` (
  `id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `q` varchar(256) NOT NULL DEFAULT '',
  `code` text NOT NULL,
  `tokens` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_yt_token`
--

INSERT INTO `app_yt_token` (`id`, `created_at`, `q`, `code`, `tokens`) VALUES
(3, 1485329845, 'моника белуччи', '4/hJgEWqKsxJsiGIX9U57AiqQqQQ2oLGhDkwCcpvKxyXc', '{"access_token":"ya29.GlveAxdB4ttre8UART4xtXWUuNVk79dWEJkMMld5fN9BwTnh7zEw7nFDqY6aCvop2ozj7AqYaUQ0-q0NI7b69Tw85oJ6_Y9w_y6fG1Cgd0sZ8HY-UiDVPmfX6MD-","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjNzkxMWI4YWY0MGNhNmU5YjgzZWMyZTU2MTRjN2U2ZDc4MjVhMGYifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDg1MzI5ODQ3LCJleHAiOjE0ODUzMzM0NDcsImF0X2hhc2giOiJfcEd6VS1TZnV2a3VWck1qcmk2cFpBIiwiYXVkIjoiNzE2OTA2NDgzODEyLXZmYmZwb2x0cmNlOWE3bDJuaWJndnVnYWc0bnB1ZjdlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1OTY2ODYxNTM4MDM1MDU3MTk1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjcxNjkwNjQ4MzgxMi12ZmJmcG9sdHJjZTlhN2wybmliZ3Z1Z2FnNG5wdWY3ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImVtYWlsIjoidmlkZW9taWdodHltaW5kLTA3OTRAcGFnZXMucGx1c2dvb2dsZS5jb20ifQ.gAUaIMDJsXaSVvsZPxku0KzW5E4DfAARhtI9z2-aMFCBrBWVkO24Oq1y1sZlBHKUc-pQklCpL2VBArsyO1R-CM1LAGlhNHd663V_qJrUjLk84NzSYGZLmXScX0dAA6J1kBm6TpaF1JBkkLBGDGJu01t4R3QcJ4wLAZoqpFYB6KuBELA4DhRatCunX5M3lMfvSrx4b9S6FML2ZBm2ub-b5ZfeOPcqt8ebnjwhN3dBmyj-NaCO0QFouHCdO-5spGP04h0Fl3VL69PaTEwkCzEnw_PLatK0CPlAlZ2zBecW5yQ6vnjtWPLnuahCdyPIEiDdW3wFOacCGAAhsEFBW7z59Q","refresh_token":"1/qU09V8FRBMa66A6t3cjeoKr1vDLO_WOx2DTaF0-yuTdLZMaJ1I3GPXrtrC7I7iIj","token_type":"Bearer","expiry_date":1485333445192}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_yt_video`
--

CREATE TABLE IF NOT EXISTS `app_yt_video` (
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `app_yt_token`
--
ALTER TABLE `app_yt_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `app_yt_video`
--
ALTER TABLE `app_yt_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
