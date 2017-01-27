-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 27 2017 г., 16:54
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

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
(1, 1485524614, 0, 0, 'service.vk.token.4.58.stopped', 'seo@dorohovdesign.com', 'Окончен оплаченный период работы аккаунта', 'D:\\project\\app-azbn-ru\\app\\fork\\service\\vk', '{"email":"seo@dorohovdesign.com","subject":"Окончен оплаченный период работы аккаунта","tpl":"D:\\\\project\\\\app-azbn-ru\\\\app\\\\fork\\\\service\\\\vk"}');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `app_fork`
--

INSERT INTO `app_fork` (`id`, `status`, `lastact`, `period`, `title`, `path`, `data`) VALUES
(1, 0, 0, 8, 'Вывод списка подпроцессов', 'mysql.fork.list', '{}'),
(2, 0, 0, 3, 'Test', 'test', '{}'),
(3, 0, 0, 1800, 'Загрузка видео по яндексовским новостям', 'yandex/load.news', '{}'),
(4, 0, 0, 300, 'Удаление старых сообщений из очереди', 'email/clear.sended', '{}');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `azbn_profile`
--

INSERT INTO `azbn_profile` (`id`, `status`, `seo`, `cash`, `rating`, `login`, `pass`, `email`, `view_as`, `img`, `right`, `filter`, `param`) VALUES
(1, 1, 0, 1, 999999999, 'mightymind', '3641a3e6ed35cad6d581d3ffdddd004b', 'alexander.zybin@gmail.com', 'mightymind', '', NULL, '', 'a:8:{s:3:"url";s:15:"http://azbn.ru/";s:2:"vk";a:1:{s:3:"url";s:21:"http://vk.com/azbn_ru";}s:7:"twitter";a:1:{s:3:"url";s:30:"https://twitter.com/mightymind";}s:5:"email";s:25:"alexander.zybin@gmail.com";s:3:"adr";s:52:"Орел, ул. Грановского д.2, кв.20";s:5:"phone";s:11:"79092266632";s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:1;s:9:"invite2gr";i:1;s:9:"unaddvkfr";i:1;}}}'),
(2, 1, 0, 1, 999999999, 'android', 'e650802ab33fd810548ab156b04e11b9', '', 'android', '', NULL, NULL, 'a:7:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:0:"";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";s:17:"devazbn@yandex.ru";s:3:"adr";N;s:5:"phone";N;s:8:"timezone";s:13:"Europe/Moscow";}'),
(3, 1, 0, 1, 999999999, 'arybka1990', '1aa08ab7c4042a0d24bd307105723aa5', '', 'arybka1990', '', NULL, NULL, 'a:7:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:24:"http://vk.com/anna.rybka";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";s:20:"arybka1990@gmail.com";s:3:"adr";N;s:5:"phone";N;s:8:"timezone";s:13:"Europe/Moscow";}'),
(4, 1, 0, 1, 999999999, 'seo@dorohovdesign.com', '978d839b75fa2a96b28638fce0d2e6f9', 'seo@dorohovdesign.com', 'seo-dorohovdesign', '', NULL, NULL, 'a:7:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:0:"";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";s:21:"seo@dorohovdesign.com";s:3:"adr";N;s:5:"phone";N;s:8:"timezone";s:13:"Europe/Moscow";}'),
(5, 1, 0, 1, 999999999, 'kira_owl', '84b750896e48fab94ad5effe36981755', '', 'kira_owl', '', NULL, '', 'a:8:{s:3:"url";s:23:"https://vk.com/kira_owl";s:2:"vk";a:1:{s:3:"url";s:23:"https://vk.com/kira_owl";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";N;s:3:"adr";N;s:5:"phone";N;s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:1;s:9:"invite2gr";i:1;s:9:"unaddvkfr";i:1;}}}'),
(6, 0, 0, 1, 999999999, 'Test', '2335cfbdba536342fc7f437983d00ec6', 'yourmail@gmail.com', '', '', NULL, '', 'a:7:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:0:"";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";s:18:"yourmail@gmail.com";s:3:"adr";N;s:5:"phone";s:6:"123456";s:8:"timezone";s:13:"Europe/Moscow";}'),
(7, 0, 0, 1, 999999999, '', '6a29ec1da8697b1685220b7db5eeafab', '', '', '', NULL, '', 'a:7:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:0:"";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";N;s:3:"adr";N;s:5:"phone";N;s:8:"timezone";N;}'),
(8, 0, 0, 1, 999999999, 'Mark', '8dc8444aab3f0ae6b69afdd4dc8352f8', 'mark3qf527@hotmail.com', 'JSvcoGQCMqKgegh', '', NULL, '', 'a:7:{s:3:"url";s:47:"http://www.y7YwKx7Pm6OnyJvolbcwrWdoEnRF29pb.com";s:2:"vk";a:1:{s:3:"url";s:47:"http://www.y7YwKx7Pm6OnyJvolbcwrWdoEnRF29pb.com";}s:7:"twitter";a:1:{s:3:"url";s:47:"http://www.y7YwKx7Pm6OnyJvolbcwrWdoEnRF29pb.com";}s:5:"email";s:22:"mark3qf527@hotmail.com";s:3:"adr";s:18:"REPtTxkhlHYCnQPMPL";s:5:"phone";s:11:"50814337253";s:8:"timezone";s:13:"Europe/Moscow";}'),
(9, 1, 0, 1, 999999999, 'info-city', '25caa29a9511774fb7aa4f357e594e1f', 'reklama@infoorel.ru', 'info-city', '', NULL, '', 'a:8:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:0:"";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";s:19:"reklama@infoorel.ru";s:3:"adr";N;s:5:"phone";N;s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:1;s:9:"invite2gr";i:1;s:9:"unaddvkfr";i:1;}}}'),
(10, 0, 0, 1, 999999999, 'JimmiXS', '6c2d2364fa7976c4a5a2023dc0d2c12b', 'jimos4581rt@hotmail.com', 'wIjRtezEJxbYLs', '', NULL, '', 'a:7:{s:3:"url";s:47:"http://www.FyLitCl7Pf7kjQdDUOLQOuaxTXbj5iNG.com";s:2:"vk";a:1:{s:3:"url";s:47:"http://www.FyLitCl7Pf7kjQdDUOLQOuaxTXbj5iNG.com";}s:7:"twitter";a:1:{s:3:"url";s:47:"http://www.FyLitCl7Pf7kjQdDUOLQOuaxTXbj5iNG.com";}s:5:"email";s:23:"jimos4581rt@hotmail.com";s:3:"adr";s:15:"cemRyyrHugfFRaZ";s:5:"phone";s:11:"83224009874";s:8:"timezone";s:13:"Europe/Moscow";}'),
(11, 1, 0, 1, 999999999, 'tester', '28d2ec48b0efd705f782d65ff7a04e0f', 'tester@azbn.ru', 'tester', '', NULL, NULL, 'a:8:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:0:"";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";s:14:"tester@azbn.ru";s:3:"adr";N;s:5:"phone";N;s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:0;s:9:"invite2gr";i:0;s:9:"unaddvkfr";i:0;}}}'),
(12, 1, 0, 1, 999999999, 'DavidExono', '2adbb291913e6b334924d42496602fbd', 'zakazat-lending@mail.ru', 'DavidExonoUW', '', NULL, NULL, 'a:8:{s:3:"url";s:34:"http://zakazat-lending-nedorogo.ru";s:2:"vk";a:1:{s:3:"url";s:34:"http://zakazat-lending-nedorogo.ru";}s:7:"twitter";a:1:{s:3:"url";s:34:"http://zakazat-lending-nedorogo.ru";}s:5:"email";s:23:"zakazat-lending@mail.ru";s:3:"adr";N;s:5:"phone";s:6:"123456";s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:0;s:9:"invite2gr";i:0;s:9:"unaddvkfr";i:0;}}}'),
(13, 1, 0, 1, 999999999, 'Victorflumn', 'b628afe0a68963858dbd375249eca8af', 'rimtexp@mail.ru', 'VictorflumnHV', '', NULL, NULL, 'a:8:{s:3:"url";s:23:"http://rimtex-print.ru/";s:2:"vk";a:1:{s:3:"url";s:23:"http://rimtex-print.ru/";}s:7:"twitter";a:1:{s:3:"url";s:23:"http://rimtex-print.ru/";}s:5:"email";s:15:"rimtexp@mail.ru";s:3:"adr";N;s:5:"phone";s:6:"123456";s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:0;s:9:"invite2gr";i:0;s:9:"unaddvkfr";i:0;}}}'),
(14, 1, 0, 1, 999999999, 'AltonMix', 'f306a83ad6aa5121bfea5c31e844e574', 'ledframe@mail.ru', 'AltonMixRZ', '', NULL, NULL, 'a:8:{s:3:"url";s:18:"http://ledframe.ru";s:2:"vk";a:1:{s:3:"url";s:18:"http://ledframe.ru";}s:7:"twitter";a:1:{s:3:"url";s:18:"http://ledframe.ru";}s:5:"email";s:16:"ledframe@mail.ru";s:3:"adr";N;s:5:"phone";s:6:"123456";s:8:"timezone";s:13:"Europe/Moscow";s:7:"service";a:1:{s:2:"vk";a:3:{s:7:"addvkfr";i:0;s:9:"invite2gr";i:0;s:9:"unaddvkfr";i:0;}}}'),
(15, 1, 1, 0, 999999999, 'yumboo', 'fa61a12e71a14769e1d451a0d2c9b40d', 'i@yumboo.com', 'Yumboo', '/img/cms.azbn.ru/default.png', NULL, '', 'a:7:{s:3:"url";s:0:"";s:2:"vk";a:1:{s:3:"url";s:0:"";}s:7:"twitter";a:1:{s:3:"url";s:0:"";}s:5:"email";s:12:"i@yumboo.com";s:3:"adr";N;s:5:"phone";N;s:8:"timezone";s:13:"Europe/Moscow";}');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `error_code` int(11) NOT NULL DEFAULT '0',
  `method` varchar(256) NOT NULL DEFAULT '',
  `error` mediumtext NOT NULL,
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=113 ;

--
-- Дамп данных таблицы `nodejs_vk_token`
--

INSERT INTO `nodejs_vk_token` (`id`, `created_at`, `stop_at`, `profile`, `app_id`, `user_id`, `email`, `access_token`) VALUES
(95, 1472652280, 2147483647, 1, 3, 110091436, '', ''),
(105, 1480428438, 1486217238, 9, 1, 396893143, '', ''),
(100, 1472885566, 2147483647, 1, 1, 336650466, '', ''),
(101, 1473016306, 2147483647, 1, 1, 14558328, '', ''),
(92, 1472639353, 2147483647, 1, 1, 110091436, '', ''),
(104, 1473061195, 2147483647, 1, 2, 110091436, '', ''),
(68, 1467709839, 2147483647, 5, 2, 245644842, '', ''),
(62, 1457375282, 2147483647, 5, 1, 245644842, '', ''),
(58, 1455630527, 1473461906, 4, 2, 319992011, '', ''),
(70, 1468498307, 1487026706, 9, 1, 337325345, '', ''),
(80, 1468586788, 2147483647, 5, 2, 255713513, '', ''),
(74, 1468584610, 1487026706, 9, 1, 374394179, '', ''),
(76, 1468585526, 2147483647, 5, 1, 255713513, '', ''),
(82, 1469001537, 1487026706, 9, 1, 372227643, '', ''),
(102, 1473058810, 2147483647, 1, 3, 336650466, '', ''),
(106, 1483814518, 2147483647, 5, 1, 405813554, '', ''),
(107, 1484307521, 1487504321, 9, 1, 338221074, '', ''),
(108, 1484312669, 1487509469, 9, 1, 212616634, '', ''),
(109, 1484315008, 1487511808, 9, 2, 212616634, '', ''),
(110, 1484827229, 1488024029, 9, 1, 219897276, '', ''),
(111, 1484827393, 1488024193, 9, 2, 219897276, '', ''),
(112, 1485499253, 1488696053, 9, 1, 409639543, '', '');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
