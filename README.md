## About

APIs:
* “spin” - send a message to a random user
* “wild” -  send a message to X random users. X will be determined by the client.
* “blast”  - sends a message to all users
* “register” - simple user registration flow
* “login” - simple user login flow 

## API Params Screeshots
![Register](https://user-images.githubusercontent.com/5412270/81479173-72c4c000-922a-11ea-9c21-5ddcc434baee.png)
![Login](https://user-images.githubusercontent.com/5412270/81478453-44dd7c80-9226-11ea-9f7a-f487bd7296b6.png)
![Spin](https://user-images.githubusercontent.com/5412270/81478450-4149f580-9226-11ea-87b8-4a0d3e23a865.png)
![Wild](https://user-images.githubusercontent.com/5412270/81478452-43ac4f80-9226-11ea-878b-9d614349347b.png)

## local db setup
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

## CONFIGURE MYSQL FOR LOG_BIN

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

## SETUP BIN_LOG
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

## SETUP DB SCHEMA
docker run -it --network host --rm mysql:5.6.48 mysql -h172.17.0.2 -uroot -p0123456789

execute the sql statements in the file: 
/backend/scripts/db-setup.sql 

## START NODE INSTANCE
```
npm run dev
```
or
```
npm run prod
```

## TESTING THE APP
open the browser at: http://localhost:8080/


### to test live update from mysql client use the following command
INSERT INTO roulette_messages (content, recipients) VALUES ('content', "[{n:1,s:'A4uns0-yJg5U1cheAAAA'},{n:2,s:'B4uns0-yJg5U1cheAAAB'},{n:1,s:'C4uns0-yJg5U1cheAAAC'}]");

