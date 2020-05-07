local db setup
docker run -p 3306:3306 --name message-roulette-mysql -e MYSQL_ROOT_PASSWORD=0123456789 -d mysql:8.0.20

docker inspect message-roulette-mysql

docker inspect message-roulette-mysql | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['NetworkSettings']['IPAddress'])"

docker run -it --network host --rm mysql:8.0.20 mysql -h172.17.0.2 -uroot -p0123456789