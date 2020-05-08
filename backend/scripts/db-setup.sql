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
    UNIQUE INDEX ix_rplayer_user_node_socket (user_id, node_id, socket_id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS roulette_messages (
    content VARCHAR(1024) NOT NULL,
    recipients VARCHAR(60000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

