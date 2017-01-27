-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 28 2017 г., 01:14
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
-- Структура таблицы `app_cli`
--

CREATE TABLE IF NOT EXISTS `app_cli` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `lastact` int(11) NOT NULL DEFAULT '0',
  `period` int(11) NOT NULL DEFAULT '10000',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL,
  `data` text
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_cli`
--

INSERT INTO `app_cli` (`id`, `status`, `lastact`, `period`, `title`, `path`, `data`) VALUES
(1, 0, 0, 10, 'Вывод в консоль версии ноды', 'node -v', '{}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_email_queue`
--

CREATE TABLE IF NOT EXISTS `app_email_queue` (
  `id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `sended_at` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `uid` varchar(256) NOT NULL DEFAULT '',
  `email` varchar(256) NOT NULL DEFAULT '',
  `subject` varchar(256) NOT NULL DEFAULT '',
  `tpl` varchar(256) NOT NULL DEFAULT '',
  `p` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_email_queue`
--

INSERT INTO `app_email_queue` (`id`, `created_at`, `sended_at`, `status`, `uid`, `email`, `subject`, `tpl`, `p`) VALUES
(7, 1485543588, 0, 0, 'service.vk.token.1.102.stopped', 'alexander.zybin@gmail.com', 'Окончен оплаченный период работы аккаунта', 'X:\\NodeJS\\projects\\app-azbn-ru\\app\\fork\\service\\vk/token.stopped.html', '{"email":"alexander.zybin@gmail.com","subject":"Окончен оплаченный период работы аккаунта","tpl":"X:\\\\NodeJS\\\\projects\\\\app-azbn-ru\\\\app\\\\fork\\\\service\\\\vk/token.stopped.html"}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_fork`
--

CREATE TABLE IF NOT EXISTS `app_fork` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `lastact` int(11) NOT NULL DEFAULT '0',
  `period` int(11) NOT NULL DEFAULT '10',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL,
  `data` text
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_fork`
--

INSERT INTO `app_fork` (`id`, `status`, `lastact`, `period`, `title`, `path`, `data`) VALUES
(1, 0, 0, 8, 'Вывод списка подпроцессов', 'mysql.fork.list', '{}'),
(2, 0, 0, 3, 'Test', 'test', '{}'),
(3, 0, 0, 1800, 'Загрузка видео по яндексовским новостям', 'yandex/load.news', '{}'),
(4, 1, 1485549046, 10, 'Удаление старых сообщений из очереди', 'email/clear.sended', '{}'),
(5, 1, 1485549046, 15, 'Определение окончания работы', 'service/vk/token.stop_at.is.min', '{}'),
(6, 1, 1485549038, 19, 'Обновление информации об аккаунтах', 'service/vk/userinfo/update', '{}');

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `app_yt_token`
--

INSERT INTO `app_yt_token` (`id`, `created_at`, `q`, `code`, `tokens`) VALUES
(4, 1485379757, 'моника белуччи', '4/ikX0AoZI-Ce3eLUkcgI63rCfaCqP9VhmgMBItR8Gt_s', '{"access_token":"ya29.GlveA9nnEXGgdkb1gQlVCLQoe8xw4_sx7FwzE0Bh3-KidAU64MijZs6Cy2J-d1he5y01NwUFBTdWS9CnmCj2UDyilpAvNY9MUjUGtpJ6dcao2E5MaCEIDT-jiMGQ","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0MzY0YjVmYjliODYxYzNhYTRkYTg5NWExMjk5NzZjMjgyZGJmYzIifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDg1Mzc5NzU3LCJleHAiOjE0ODUzODMzNTcsImF0X2hhc2giOiJxU0JZUHRWMTctN2VtZ05yVnF2RzZnIiwiYXVkIjoiNzE2OTA2NDgzODEyLXZmYmZwb2x0cmNlOWE3bDJuaWJndnVnYWc0bnB1ZjdlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1OTY2ODYxNTM4MDM1MDU3MTk1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjcxNjkwNjQ4MzgxMi12ZmJmcG9sdHJjZTlhN2wybmliZ3Z1Z2FnNG5wdWY3ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImVtYWlsIjoidmlkZW9taWdodHltaW5kLTA3OTRAcGFnZXMucGx1c2dvb2dsZS5jb20ifQ.MSJLEJLQrBtRK87LD4r2MKj4jvDUQxYlRWpl8Km4IlY0cXZWPnbo9wm78DJe_VVlh7e1At3LmQYkZRaaUvlGtM2A9aQaqRKqKeEmTK0NddLXstdhg66nrF2OvBLfyRiJRFNSFESFQBIDCY118K3XL4jP8KtIUlXlJxCwOV8uaxW7mjLinjz_RglTigZUIGbW62C_sh52uTQOAollNOylCcpVpMarbGXRhVD-MJiR1_Sq3rVc9gvOQOBqb4Qnc3GhHI5UKYzMZxnLccQ_qfDYbLrudg-mYlZY3cw4Yk0vyBQ6GCX00Hoi-nQmR87lzkbkZnEpKiCITQpmjT4s_yBkig","refresh_token":"1/vGsX45kAzrVgHMrO-T4q3gcH0Pw9QJZlRDgDOHErKXZzvfVzs9kFizWpXipRq5h8","token_type":"Bearer","expiry_date":1485383357971}');

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

-- --------------------------------------------------------

--
-- Структура таблицы `azbn_profile`
--

CREATE TABLE IF NOT EXISTS `azbn_profile` (
  `id` int(11) NOT NULL,
  `status` int(11) DEFAULT '1',
  `seo` int(11) DEFAULT '0',
  `cash` double DEFAULT '0',
  `rating` int(11) DEFAULT '999999999',
  `login` varchar(32) NOT NULL,
  `pass` varchar(32) DEFAULT '',
  `email` varchar(64) DEFAULT '',
  `view_as` varchar(128) DEFAULT 'Default user',
  `img` varchar(256) DEFAULT '',
  `right` blob,
  `filter` blob,
  `param` text
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `azbn_profile`
--

INSERT INTO `azbn_profile` (`id`, `status`, `seo`, `cash`, `rating`, `login`, `pass`, `email`, `view_as`, `img`, `right`, `filter`, `param`) VALUES
(1, 1, 0, 1, 999999999, 'mightymind', '1', 'alexander.zybin@gmail.com', 'mightymind', '', NULL, NULL, 'a:8:{s:3:"url";s:15:"http://azbn.ru/";s:2:"vk";a:1:{s:3:"url";s:21:"http://vk.com/azbn_ru";}s:7:"twitter";a:1:{s:3:"url";s:30:"https://twitter.com/mightymind";}s:5:"email";s:25:"alexander.zybin@gmail.com";s:3:"adr";s:52:"Орел, ул. Грановского д.2, кв.20";s:5:"phone";s:11:"79092266632";s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:1;s:9:"invite2gr";i:1;s:9:"unaddvkfr";i:1;}}}');

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_addvkfr`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_addvkfr` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `lastact` bigint(20) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_addvkfr_log`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_addvkfr_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `to_user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `success_at` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=90260 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_app`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_app` (
  `id` int(11) NOT NULL,
  `appId` int(11) NOT NULL DEFAULT '0',
  `appSecret` varchar(256) NOT NULL DEFAULT '',
  `language` varchar(256) NOT NULL,
  `title` varchar(256) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `nodejs_vk_app`
--

INSERT INTO `nodejs_vk_app` (`id`, `appId`, `appSecret`, `language`, `title`) VALUES
(1, 5172708, 'DcT2TMRKnXtdgl40DUaX', 'ru', 'Добавление друзей'),
(2, 5185110, 'GhsFNkimTiiT6kDZq3YE', 'ru', 'Приглашения в группу'),
(3, 5612366, 'YeqtvrRBRbu9RkY81p5Z', 'ru', 'Очистка подписок от недрузей');

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_error`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_error` (
  `id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `error_code` int(11) NOT NULL DEFAULT '0',
  `source` varchar(256) NOT NULL DEFAULT '',
  `method` varchar(256) NOT NULL DEFAULT '',
  `error` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=13233 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_invite2gr`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_invite2gr` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `lastact` bigint(20) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_invite2gr_log`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_invite2gr_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `to_user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `success_at` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=8258 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_token`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_token` (
  `id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `stop_at` int(11) NOT NULL DEFAULT '0',
  `profile` int(11) NOT NULL DEFAULT '0',
  `app_id` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `email` varchar(256) NOT NULL DEFAULT '',
  `access_token` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `nodejs_vk_token`
--

INSERT INTO `nodejs_vk_token` (`id`, `created_at`, `stop_at`, `profile`, `app_id`, `user_id`, `email`, `access_token`) VALUES
(102, 1473058810, 1147483647, 1, 1, 336650466, 'devazbn@yandex.ru', 'ddb64b5e0a225e2ea6d1831f881160eeea0a3322106bb293cb2214051ed8efb8c6157b980fb39991e20ee');

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_unaddvkfr`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_unaddvkfr` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `lastact` bigint(20) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_unaddvkfr_log`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_unaddvkfr_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `to_user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `success_at` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_userhistory`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_userhistory` (
  `id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `counters_friends` int(11) NOT NULL DEFAULT '0',
  `counters_followers` int(11) NOT NULL DEFAULT '0',
  `counters_subscriptions` int(11) NOT NULL DEFAULT '0',
  `p` mediumblob NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=60604 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_userinfo`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_userinfo` (
  `id` int(11) NOT NULL,
  `lastact` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `nodejs_vk_userinfo`
--

INSERT INTO `nodejs_vk_userinfo` (`id`, `lastact`, `user_id`, `p`) VALUES
(24, 1485554397, 336650466, '{"id":336650466,"first_name":"Властелин","last_name":"Вселенной","sex":2,"nickname":"","domain":"zaphod_b","screen_name":"zaphod_b","bdate":"1.1.1901","city":{"id":1,"title":"Москва"},"country":{"id":1,"title":"Россия"},"photo_50":"https://pp.vk.me/c633722/v633722466/8f6a/ItEqg765qgE.jpg","photo_100":"https://pp.vk.me/c633722/v633722466/8f69/oEsoMOb673k.jpg","photo_200":"https://pp.vk.me/c633722/v633722466/8f68/mkOFGX9p4jo.jpg","photo_max":"https://pp.vk.me/c633722/v633722466/8f68/mkOFGX9p4jo.jpg","photo_200_orig":"https://pp.vk.me/c633722/v633722466/8f66/VTsXkCeP1a8.jpg","photo_400_orig":"https://pp.vk.me/c633722/v633722466/8f67/7wmaUwr2fJA.jpg","photo_max_orig":"https://pp.vk.me/c633722/v633722466/8f67/7wmaUwr2fJA.jpg","photo_id":"336650466_395081825","has_photo":1,"has_mobile":1,"is_friend":0,"friend_status":0,"online":0,"wall_comments":0,"can_post":0,"can_see_all_posts":0,"can_see_audio":1,"can_write_private_message":1,"can_send_friend_request":1,"site":"","status":"","last_seen":{"time":1484142032,"platform":7},"crop_photo":{"photo":{"id":395081825,"album_id":-6,"owner_id":336650466,"photo_75":"https://pp.vk.me/c633722/v633722466/8f5b/xxu27uUq6F0.jpg","photo_130":"https://pp.vk.me/c633722/v633722466/8f5c/jTLtAv3Wf44.jpg","photo_604":"https://pp.vk.me/c633722/v633722466/8f5d/qp7RT8LpnKI.jpg","photo_807":"https://pp.vk.me/c633722/v633722466/8f5e/Px4xuCETDpc.jpg","photo_1280":"https://pp.vk.me/c633722/v633722466/8f5f/p8JAypOBpbA.jpg","photo_2560":"https://pp.vk.me/c633722/v633722466/8f60/2LQ9Mqdyj2U.jpg","width":1400,"height":915,"text":"","date":1452112615,"post_id":10},"crop":{"x":13.07,"y":0,"x2":78.43,"y2":100},"rect":{"x":13.01,"y":0,"x2":90.6,"y2":77.6}},"verified":0,"followers_count":62,"is_favorite":0,"is_hidden_from_feed":0,"counters":{"albums":0,"videos":0,"audios":0,"notes":0,"photos":2,"groups":19,"gifts":0,"user_videos":0,"followers":62},"hidden":1}');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `app_cli`
--
ALTER TABLE `app_cli`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `app_email_queue`
--
ALTER TABLE `app_email_queue`
  ADD PRIMARY KEY (`id`);

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
-- Индексы таблицы `azbn_profile`
--
ALTER TABLE `azbn_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- Индексы таблицы `nodejs_vk_addvkfr`
--
ALTER TABLE `nodejs_vk_addvkfr`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_addvkfr_log`
--
ALTER TABLE `nodejs_vk_addvkfr_log`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_app`
--
ALTER TABLE `nodejs_vk_app`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_error`
--
ALTER TABLE `nodejs_vk_error`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_invite2gr`
--
ALTER TABLE `nodejs_vk_invite2gr`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_invite2gr_log`
--
ALTER TABLE `nodejs_vk_invite2gr_log`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_token`
--
ALTER TABLE `nodejs_vk_token`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_unaddvkfr`
--
ALTER TABLE `nodejs_vk_unaddvkfr`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_unaddvkfr_log`
--
ALTER TABLE `nodejs_vk_unaddvkfr_log`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_userhistory`
--
ALTER TABLE `nodejs_vk_userhistory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `nodejs_vk_userinfo`
--
ALTER TABLE `nodejs_vk_userinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `app_cli`
--
ALTER TABLE `app_cli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `app_email_queue`
--
ALTER TABLE `app_email_queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `app_fork`
--
ALTER TABLE `app_fork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `app_yt_token`
--
ALTER TABLE `app_yt_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `app_yt_video`
--
ALTER TABLE `app_yt_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `azbn_profile`
--
ALTER TABLE `azbn_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_addvkfr`
--
ALTER TABLE `nodejs_vk_addvkfr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_addvkfr_log`
--
ALTER TABLE `nodejs_vk_addvkfr_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=90260;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_app`
--
ALTER TABLE `nodejs_vk_app`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_error`
--
ALTER TABLE `nodejs_vk_error`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13233;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_invite2gr`
--
ALTER TABLE `nodejs_vk_invite2gr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_invite2gr_log`
--
ALTER TABLE `nodejs_vk_invite2gr_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8258;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_token`
--
ALTER TABLE `nodejs_vk_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_unaddvkfr`
--
ALTER TABLE `nodejs_vk_unaddvkfr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_unaddvkfr_log`
--
ALTER TABLE `nodejs_vk_unaddvkfr_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_userhistory`
--
ALTER TABLE `nodejs_vk_userhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=60604;
--
-- AUTO_INCREMENT для таблицы `nodejs_vk_userinfo`
--
ALTER TABLE `nodejs_vk_userinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
