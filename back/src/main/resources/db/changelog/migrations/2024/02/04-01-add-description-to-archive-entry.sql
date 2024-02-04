-- liquibase formatted sql

-- changeset sejapoe:04-01-0001-add-description-to-archive-entry
alter table archive_entries
    add column if not exists description varchar(1023) null;