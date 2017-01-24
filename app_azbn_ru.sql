-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 24 2017 г., 11:58
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
(1, 1, 8000, 'Вывод списка подпроцессов', 'mysql.fork.list'),
(2, 1, 3000, 'Test', 'test');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `app_yt_token`
--

INSERT INTO `app_yt_token` (`id`, `created_at`, `q`, `code`, `tokens`) VALUES
(2, 1485235874, 'путин', '4/9hr4MG9Dj4nCJRkDp9rWVo6-jklM6tggye6bmxGsYjI', '{"access_token":"ya29.GlvdA9PGc3CaqFqrhYPCJTHAMVqbYf9An2gDrFdd3WqduhbVDZ5DYw6qQQVmoYgMMc_vKwRytnA5Ke15zPlgqYNkjIIFcrFqyca1jF7uUPWGlz1dwWAWZnrbB-sR","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyZmM5ZWQ1M2UwMGY3OWY2NjRhYTZjZTE3ZGY2MWVlNzRlNmM0MDcifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDg1MjM1ODc2LCJleHAiOjE0ODUyMzk0NzYsImF0X2hhc2giOiJDYzExc0NHa0pxZlBUYnZDQ1B4TmpnIiwiYXVkIjoiNzE2OTA2NDgzODEyLXZmYmZwb2x0cmNlOWE3bDJuaWJndnVnYWc0bnB1ZjdlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1OTY2ODYxNTM4MDM1MDU3MTk1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjcxNjkwNjQ4MzgxMi12ZmJmcG9sdHJjZTlhN2wybmliZ3Z1Z2FnNG5wdWY3ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImVtYWlsIjoidmlkZW9taWdodHltaW5kLTA3OTRAcGFnZXMucGx1c2dvb2dsZS5jb20ifQ.KE0cGcpJq1086BsKi6K8fXwlsivwm4R7kZ5fDKaPDLicuJedYK-QwG51li29qMu-GFtRhecZvEJynNP5-QTRRpzPAtyqw6wp6fYAMZg6twak19i51U9rZ1IspISlwEMteNLL3MAJYTcgmdAFd0t3nFKKi5flENY-cpq4msWigs2WSj-hwza1Vq4jMtYZal9CN_yHcVI_HKdmBdlE3QGLY_GG4Odtzvg9esS2Lhwgw8-ACMfOYgL7049CEkwpXkYTYVp60JzMgqDJSz1AfPAAusXsp6nMyIRnYzkA4rEQYT0dPFB3qhy_KXKdBI4Yxvx_FY51yAZ3Vl9mLpmaecq5RA","refresh_token":"1/Emlg8XRXgHTQdJaV_6YY1QR_eITqq7Tv5qLShwD63TM3sZxoOBGNhnyZ6VEzlEux","token_type":"Bearer","expiry_date":1485239474952}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_yt_video`
--

CREATE TABLE IF NOT EXISTS `app_yt_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
