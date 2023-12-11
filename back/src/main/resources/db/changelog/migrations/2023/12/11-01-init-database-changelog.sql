-- liquibase formatted sql

-- changeset sejapoe:11-01-0001-create-institutions
create table if not exists institutes
(
    id bigserial primary key,
    name varchar(255) not null
);

-- changeset sejapoe:11-01-0002-create-departments
create table if not exists departments
(
    id bigserial primary key,
    institute_id bigint not null references institutes (id) on delete cascade,
    name         varchar(255)
);
create index if not exists departments_institute_id_index
    on departments (institute_id);

-- changeset sejapoe:11-01-0003-create-users
create table if not exists users
(
    id bigserial primary key,
    email      varchar(255) not null unique,
    password   varchar(255) not null,
    full_name  varchar(255) not null,
    role       varchar(31)  not null,
    is_enabled bool         not null default false
);

-- changeset sejapoe:11-01-0004-create-user_activations
create table if not exists user_activations
(
    id bigserial primary key,
    uuid    uuid unique not null,
    user_id bigint      not null references users (id) on delete cascade
);

-- changeset sejapoe:11-01-0005-create-refresh_tokens
create table if not exists refresh_tokens
(
    id bigserial primary key,
    token varchar(255) not null,
    user_id bigint not null references users (id) on delete cascade
);
create index if not exists refresh_tokens_token_index
    on refresh_tokens (token);
create index if not exists refresh_tokens_user_id_index
    on refresh_tokens (user_id);

-- changeset sejapoe:11-01-0006-create-requests
create table if not exists requests
(
    id bigserial primary key,
    name           varchar(255)  not null,
    lecturer_id    bigint        not null references users (id),
    institute_id   bigint        not null references institutes (id),
    department_id  bigint        not null references departments (id),
    status         varchar(31)   not null,
    link_to_moodle varchar(1023) not null,
    link_to_video  varchar(1023) not null
);
create index if not exists requests_lecturer_id_index
    on requests (lecturer_id);
create index if not exists requests_institute_id_index
    on requests (institute_id);
create index if not exists requests_department_id_index
    on requests (department_id);

-- changeset sejapoe:11-01-0007-create-corrections
create table if not exists corrections
(
    id bigserial primary key,
    request_id      bigint not null references requests (id) on delete cascade,
    start_time_code int    not null,
    end_time_code   int    not null,
    is_closed       bool   not null default false
);
create index if not exists corrections_request_id_index
    on corrections (request_id);

-- changeset sejapoe:11-01-0008-create-archive_entries
create table if not exists archive_entries
(
    id bigserial primary key,
    name           varchar(255)  not null,
    lecturer_id    bigint        not null references users (id),
    institute_id   bigint        not null references institutes (id),
    department_id  bigint        not null references departments (id),
    link_to_moodle varchar(1023) not null,
    link_to_video  varchar(1023) not null,
    request_id     bigint        null references requests (id) on delete set null
);
create index if not exists archive_entries_lecturer_id_index
    on archive_entries (lecturer_id);
create index if not exists archive_entries_institute_id_index
    on archive_entries (institute_id);
create index if not exists archive_entries_department_id_index
    on archive_entries (department_id);

-- changeset sejapoe:11-01-0009-create-comments
create table if not exists comments
(
    id bigserial primary key,
    text          varchar(255) not null,
    author_id     bigint       not null references users (id),
    correction_id bigint       not null references corrections (id),
    timestamp     timestamp    not null default now()
);
create index if not exists comments_correction_id_index
    on comments (correction_id);

-- changeset sejapoe:11-01-0010-create-last_view
create table if not exists last_view
(
    id bigserial primary key,
    user_id                bigint not null references users (id) on delete cascade,
    correction_id          bigint not null references corrections (id) on delete cascade,
    last_viewed_comment_id bigint not null references comments (id) on delete cascade
);
create index if not exists last_view_user_id_correction_id_index
    on last_view (user_id, correction_id);