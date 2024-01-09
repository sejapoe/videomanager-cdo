-- liquibase formatted sql

-- changeset sejapoe:09-01-0001-add-short-name-to-departments
alter table departments
    add column if not exists short_name varchar(255) null;