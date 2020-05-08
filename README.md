local db setup
docker run -p 3306:3306 --name message-roulette-mysql -e MYSQL_ROOT_PASSWORD=0123456789 -d mysql:5.6.48

docker inspect message-roulette-mysql

docker inspect message-roulette-mysql | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['NetworkSettings']['IPAddress'])"


docker exec -it message-roulette-mysql /bin/bash

apt-get update
apt-get install vim

vim /etc/mysql/my.cnf

add under [mysqld] section
log-bin=bin.log
log-bin-index=bin-log.index
max_binlog_size=100M
binlog_format=row
socket=mysql.sock
slow_query_log  = ON
long_query_time = 1

chown -R mysql:mysql /var/log/mysql/
chmod 777 /var/log/mysql/
touch /var/log/mysql/mysql-bin-log.index
chown -R mysql:mysql /var/log/mysql/mysql-bin-log.index

mysql -uroot -p0123456789

select variable_value as "BINARY LOGGING STATUS (log_bin) :: " from information_schema.global_variables where variable_name='log_bin';

then:
docker restart message-roulette-mysql

docker run -it --network host --rm mysql:5.6.48 mysql -h172.17.0.2 -uroot -p0123456789



[mysqld] #grouping  config options is important
# Must be unique integer from 1-2^32
server-id        = 1
# Row format required for ZongJi
binlog_format    = row
# Directory must exist. This path works for Linux. Other OS may require
#   different path.
log_bin          = /var/log/mysql/mysql-bin.log