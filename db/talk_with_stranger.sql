CREATE DATABASE IF NOT EXISTS `talk_with_stranger_dev`

use `talk_with_stranger_dev`

CREATE TABLE IF NOT EXISTS `country` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `country_name` NVARCHAR(100) NOT NULL,
    `country_code` NVARCHAR(20) NOT NULL,
    `country_iso_code` NVARCHAR(20) NOT NULL,
)

CREATE TABLE IF NOT EXISTS `user` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_first_name` NVARCHAR(100) NOT NULL,
    `user_last_name` NVARCHAR(100) NOT NULL,
    `user_email` NVARCHAR(100) NOT NULL,
    `user_password` NVARCHAR(100) NOT NULL,
	`user_avatar` NVARCHAR(100),
    `user_description` NVARCHAR(200),
    `user_background` NVARCHAR(100) NOT NULL,
    `user_gender` NVARCHAR(20) NOT NULL,
	`user_major` NVARCHAR(100),
    `user_dob` DATETIME NOT NULL,
    `user_country` INT,
	`created_at` DATETIME DEFAULT NOW(),
    `modified_at` DATETIME,
    CONSTRAINT chk_dob CHECK (`user_dob` < NOW())
    CONSTRAINT fk_user_conntry FOREIGN KEY(`user_country`) REFERENCES `country`(`id`)
)

SELECT CONSTRAINT_NAME FROM  information_schema.KEY_COLUMN_USAGE
      where TABLE_NAME = 'user'
      
select * from `user`
select * from `key_token`
select * from `country`
select * from `refresh_token`

select * from `user` where `user`.id not in (select `user_id` from `key_token`)

delete from `key_token` where 