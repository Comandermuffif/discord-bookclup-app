CREATE TABLE books (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(128),
    "link" varchar(256),
    "guild_id" varchar(64)
);

CREATE TABLE sections (
    "id" SERIAL PRIMARY KEY,
    "description" varchar(256),
    "order" integer,
    "book_id" integer,

    CONSTRAINT book_fk FOREIGN KEY ("book_id") REFERENCES books ("id"),
    CONSTRAINT unique_book_section UNIQUE ("book_id", "order")
);

CREATE TABLE progresses (
    "id" SERIAL PRIMARY KEY,
    "user_id" varchar(64),
    "section_id" integer,
    "updated" date,

    CONSTRAINT section_fk FOREIGN KEY ("section_id") REFERENCES sections ("id"),
    CONSTRAINT unique_user_section UNIQUE ("user_id", "section_id")
);