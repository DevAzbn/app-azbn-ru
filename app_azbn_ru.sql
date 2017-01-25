-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 25 2017 г., 12:03
-- Версия сервера: 5.5.41-log
-- Версия PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `app_azbn_ru`
--

-- --------------------------------------------------------

--
-- Структура таблицы `app_fork`
--

CREATE TABLE IF NOT EXISTS `app_fork` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `period` int(11) NOT NULL DEFAULT '10000',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `app_fork`
--

INSERT INTO `app_fork` (`id`, `status`, `period`, `title`, `path`) VALUES
(1, 0, 8000, 'Вывод списка подпроцессов', 'mysql.fork.list'),
(2, 0, 3000, 'Test', 'test');

-- --------------------------------------------------------

--
-- Структура таблицы `app_yt_token`
--

CREATE TABLE IF NOT EXISTS `app_yt_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `q` varchar(256) NOT NULL DEFAULT '',
  `code` text NOT NULL,
  `tokens` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `q` varchar(256) NOT NULL DEFAULT '',
  `uid` varchar(256) NOT NULL DEFAULT '',
  `img` varchar(256) NOT NULL DEFAULT '',
  `title` varchar(256) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
