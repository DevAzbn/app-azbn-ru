-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 23 2017 г., 22:42
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
  `interval` int(11) NOT NULL DEFAULT '10000',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_fork`
--

INSERT INTO `app_fork` (`id`, `status`, `interval`, `title`, `path`) VALUES
(1, 0, 20000, 'Вывод списка подпроцессов', 'mysql.fork.list'),
(2, 0, 20000, 'Test', 'test');

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_yt_token`
--

INSERT INTO `app_yt_token` (`id`, `created_at`, `q`, `code`, `tokens`) VALUES
(5, 1485197919, 'в Орле', '4/Ql-hiKbYbFOJUwdZgQqhXoMHl2nCawTXA4cqNuUv8Pg', '{"access_token":"ya29.GlvcA9V6jXZ4e75ERuR3qoPM38ECom0Rzj3Jvbq-P0d8evWK6rL5r6y1x-IKc6M_8ltDV7pSu8JeDjyWL2bUxs0YXYGLFSYd7PVfVOau5iha1BpXWlGaZeo71rhl","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyZmM5ZWQ1M2UwMGY3OWY2NjRhYTZjZTE3ZGY2MWVlNzRlNmM0MDcifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDg1MTk3OTE3LCJleHAiOjE0ODUyMDE1MTcsImF0X2hhc2giOiJKWG01N3FmbWdmbXNlTEJYLUtCbWhBIiwiYXVkIjoiNzE2OTA2NDgzODEyLXZmYmZwb2x0cmNlOWE3bDJuaWJndnVnYWc0bnB1ZjdlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1OTY2ODYxNTM4MDM1MDU3MTk1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjcxNjkwNjQ4MzgxMi12ZmJmcG9sdHJjZTlhN2wybmliZ3Z1Z2FnNG5wdWY3ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImVtYWlsIjoidmlkZW9taWdodHltaW5kLTA3OTRAcGFnZXMucGx1c2dvb2dsZS5jb20ifQ.VKdKQrKTy8D1o8k0ITEnfttmfyKqWMG27uyFuRbUySWM88YgG2-hZmQR7spRVbTXDtV-4BDby7DANu99jOkGUV42GQpsf8WrfE2udZFnFX-6NEAt47SnuFUj-iGGBl-XS52HuxQtpygjHvxZm_I7B1fT3CWyxDbsPHg54XNHuYDjIEeoAvAtY9YNlRgWZL4FqMFmLIUJf-K22639p6pOWvd_-iCdSCFZXPJ3WrJvo9jP5d44iPNR3VUJxXRKCSG4bJ50WTQiBd2oKQfi4ytc4gjR8arEMKAPx_Q5iPW7c2ajIR4xfnnsmdQdZsu4Hf5jaLaF6oDP8Fm0MVYMqkMOQw","refresh_token":"1/If7BJggo3pJLE3j0k52RwGDzBNjVmp0hfO_dCxJ_4-w","token_type":"Bearer","expiry_date":1485201519764}');

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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `app_fork`
--
ALTER TABLE `app_fork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `app_yt_token`
--
ALTER TABLE `app_yt_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
