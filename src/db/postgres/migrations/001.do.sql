CREATE TABLE guilds (
    id varchar(64) PRIMARY KEY
);

CREATE TABLE users (
    id varchar(64) PRIMARY KEY
);

CREATE TABLE books (
    id integer PRIMARY KEY,
    name varchar(128),
    link varchar(256),
    guild_id varchar(64),

    CONSTRAINT guild_fk FOREIGN KEY (guild_id) REFERENCES guilds (id)
);