-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 30 2017 г., 12:01
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
-- Структура таблицы `app_cli`
--

CREATE TABLE IF NOT EXISTS `app_cli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `lastact` int(11) NOT NULL DEFAULT '0',
  `period` int(11) NOT NULL DEFAULT '10000',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `app_email_queue`
--

CREATE TABLE IF NOT EXISTS `app_email_queue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `sended_at` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `uid` varchar(256) NOT NULL DEFAULT '',
  `email` varchar(256) NOT NULL DEFAULT '',
  `subject` varchar(256) NOT NULL DEFAULT '',
  `tpl` varchar(256) NOT NULL DEFAULT '',
  `p` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `app_email_queue`
--

INSERT INTO `app_email_queue` (`id`, `created_at`, `sended_at`, `status`, `uid`, `email`, `subject`, `tpl`, `p`) VALUES
(1, 1485766804, 1485766804, 1, 'service.vk.token.1.102.stopped', 'alexander.zybin@gmail.com', 'Окончен оплаченный период работы аккаунта', 'D:\\project\\app-azbn-ru\\app\\fork\\email\\tpl\\service\\vk\\token.stopped.html', '{}');

-- --------------------------------------------------------

--
-- Структура таблицы `app_fork`
--

CREATE TABLE IF NOT EXISTS `app_fork` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `lastact` int(11) NOT NULL DEFAULT '0',
  `period` int(11) NOT NULL DEFAULT '10',
  `title` varchar(256) NOT NULL,
  `path` varchar(256) NOT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `q` varchar(256) NOT NULL DEFAULT '',
  `uid` varchar(256) NOT NULL DEFAULT '',
  `img` varchar(256) NOT NULL DEFAULT '',
  `title` varchar(256) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `azbn_profile`
--

CREATE TABLE IF NOT EXISTS `azbn_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `param` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_addvkfr`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_addvkfr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `lastact` bigint(20) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=83 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_addvkfr_log`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_addvkfr_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `to_user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `success_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=90260 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_app`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appId` int(11) NOT NULL DEFAULT '0',
  `appSecret` varchar(256) NOT NULL DEFAULT '',
  `language` varchar(256) NOT NULL,
  `title` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_error`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_error` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `error_code` int(11) NOT NULL DEFAULT '0',
  `source` varchar(256) NOT NULL DEFAULT '',
  `method` varchar(256) NOT NULL DEFAULT '',
  `error` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13233 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_invite2gr`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_invite2gr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `lastact` bigint(20) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_invite2gr_log`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_invite2gr_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `to_user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `success_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8258 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_token`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `stop_at` int(11) NOT NULL DEFAULT '0',
  `profile` int(11) NOT NULL DEFAULT '0',
  `app_id` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `email` varchar(256) NOT NULL DEFAULT '',
  `access_token` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_unaddvkfr`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_unaddvkfr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `lastact` bigint(20) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_unaddvkfr_log`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_unaddvkfr_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `to_user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `success_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_userhistory`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_userhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `counters_friends` int(11) NOT NULL DEFAULT '0',
  `counters_followers` int(11) NOT NULL DEFAULT '0',
  `counters_subscriptions` int(11) NOT NULL DEFAULT '0',
  `p` mediumblob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=60604 ;

-- --------------------------------------------------------

--
-- Структура таблицы `nodejs_vk_userinfo`
--

CREATE TABLE IF NOT EXISTS `nodejs_vk_userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastact` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `p` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
