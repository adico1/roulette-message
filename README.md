# local db setup
```
docker run -p 3306:3306 --name message-roulette-mysql -e MYSQL_ROOT_PASSWORD=0123456789 -d mysql:5.6.48
```

get the IP Address of the instance, either
```
docker inspect message-roulette-mysql
```
or with python 3 installed
```
docker inspect message-roulette-mysql | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['NetworkSettings']['IPAddress'])"
```

# CONFIGURE MYSQL FOR LOG_BIN

connect mysql docker instance 
```
docker exec -it message-roulette-mysql /bin/bash
```

install VIM and edit my.cnf
```
apt-get update
apt-get install vim

vim /etc/mysql/my.cnf
```

at the end of the file add [mysqld] section
```
[mysqld] 
server-id        = 1
binlog_format    = row
log_bin          = /var/log/mysql/mysql-bin.log
log_bin          = /var/log/mysql/mysql-bin-log.index
```

save the file and exit vim

# SETUP BIN_LOG
```
chown -R mysql:mysql /var/log/mysql/
chmod 777 /var/log/mysql/
touch /var/log/mysql/mysql-bin-log.index
chown -R mysql:mysql /var/log/mysql/mysql-bin-log.index
```

Restart mysql by restarting docker 
```
docker restart message-roulette-mysql
```

connect mysql docker instance 
```
docker exec -it message-roulette-mysql /bin/bash
```

connect to mysql and check that LOG_BIN is setup
```
mysql -uroot -p0123456789

select variable_value as "BINARY LOGGING STATUS (log_bin) :: " from information_schema.global_variables where variable_name='log_bin';
```

# SETUP DB SCHEMA
docker run -it --network host --rm mysql:5.6.48 mysql -h172.17.0.2 -uroot -p0123456789

execute the sql statements in the file: 
/backend/scripts/db-setup.sql 

# START NODE INSTANCE
```
npm run dev
```
or
```
npm run prod
```

# TESTING THE APP
open the browser at: http://localhost:8080/


## to test live update from mysql client use the following command
INSERT INTO roulette_messages (content, recipients) VALUES ('content', "[{n:1,s:'A4uns0-yJg5U1cheAAAA'},{n:2,s:'B4uns0-yJg5U1cheAAAB'},{n:1,s:'C4uns0-yJg5U1cheAAAC'}]");

