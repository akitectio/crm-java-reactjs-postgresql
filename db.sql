-- Create languages table
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL
);

-- Create posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create post_translations table
CREATE TABLE post_translations (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords VARCHAR(255),
    slug VARCHAR(255) NOT NULL
);

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY
);

-- Create category_translations table
CREATE TABLE category_translations (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL
);

-- Create tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY
);

-- Create tag_translations table
CREATE TABLE tag_translations (
    id SERIAL PRIMARY KEY,
    tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);

-- Create series table
CREATE TABLE series (
    id SERIAL PRIMARY KEY
);

-- Create series_translations table
CREATE TABLE series_translations (
    id SERIAL PRIMARY KEY,
    series_id INT NOT NULL REFERENCES series(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL
);

-- Create post_categories table
CREATE TABLE post_categories (
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- Create post_tags table
CREATE TABLE post_tags (
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Create post_series table
CREATE TABLE post_series (
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    series_id INT NOT NULL REFERENCES series(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, series_id)
);

-- Create configs table
CREATE TABLE configs (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT
);

-- Indexes for faster lookups and uniqueness enforcement
CREATE UNIQUE INDEX idx_post_translations_slug ON post_translations(slug);
CREATE UNIQUE INDEX idx_category_translations_slug ON category_translations(slug);
CREATE UNIQUE INDEX idx_tag_translations_slug ON tag_translations(slug);
CREATE UNIQUE INDEX idx_series_translations_slug ON series_translations(slug);

-- Additional indexes can be created as needed
