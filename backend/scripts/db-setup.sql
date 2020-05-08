create database roulette_service;

use roulette_service;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

ALTER TABLE users ADD UNIQUE INDEX (email);

CREATE TABLE IF NOT EXISTS roulette_players (
    user_id INT NOT NULL,
    node_id SMALLINT NOT NULL,
    socket_id VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rplayer_users_user_id
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id),
    UNIQUE INDEX ix_rplayer_user_node_socket (user_id, node_id, socket_id),
    INDEX ix_rplayer_node_socket (node_id, socket_id),
    INDEX ix_rplayer_socket (socket_id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS roulette_messages (
    content VARCHAR(1024) NOT NULL,
    recipients VARCHAR(60000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

INSERT INTO roulette_messages (content, recipients) VALUES ('content', "[{n:1,s:'A4uns0-yJg5U1cheAAAA'},{n:2,s:'B4uns0-yJg5U1cheAAAB'},{n:1,s:'C4uns0-yJg5U1cheAAAC'}]");

max len of 1 item is 34

1=35 char
2=69 chars
3=103 chars
single recipients format example: 
{'1':['A4uns0-yJg5U1cheAAAA']}

multiple recipients format example: 
{'1':['A4uns0-yJg5U1cheAAAA','C4uns0-yJg5U1cheAAAC'],'2':['B4uns0-yJg5U1cheAAAB']}

all recipients format example: 
*

max messages: 1750 per package