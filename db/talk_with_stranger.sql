CREATE DATABASE IF NOT EXISTS `talk_with_stranger_dev`

use `talk_with_stranger_dev`
      
select * from `user`
select * from `key_token`
select * from `country`
select * from `refresh_token`

select * from `key_token` where `user_id` not in (select `id` from `user`)

delete from `key_token` where 