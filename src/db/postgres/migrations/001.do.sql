CREATE TABLE guilds (
    "id" varchar(64) PRIMARY KEY
);

CREATE TABLE users (
    "id" varchar(64) PRIMARY KEY
);

CREATE TABLE books (
    "id" integer PRIMARY KEY,
    "name" varchar(128),
    "link" varchar(256),
    "guild_id" varchar(64),

    CONSTRAINT guild_fk FOREIGN KEY ("guild_id") REFERENCES guilds ("id")
);

CREATE TABLE sections (
    "id" integer PRIMARY KEY,
    "description" varchar(256),
    "order" integer,
    "book_id" integer,

    CONSTRAINT book_fk FOREIGN KEY ("book_id") REFERENCES books ("id"),
    CONSTRAINT unique_book_section UNIQUE ("book_id", "order")
);

CREATE TABLE progresses (
    "id" integer PRIMARY KEY,
    "user_id" varchar(64),
    "section_id" integer,
    "updated" date,

    CONSTRAINT user_fk FOREIGN KEY ("user_id") REFERENCES users ("id"),
    CONSTRAINT section_fk FOREIGN KEY ("section_id") REFERENCES sections ("id"),
    CONSTRAINT unique_user_section UNIQUE ("user_id", "section_id")
);