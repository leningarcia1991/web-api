-- eliminar bd si existe
DROP database moviesdb;
-- Crear la base de datos
CREATE DATABASE moviesdb;

-- Usar la base de datos
USE moviesdb;

-- Crear la tabla de películas
CREATE TABLE movie (
 id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
 title VARCHAR(255) NOT NULL,
 year INT NOT NULL,
 director VARCHAR(255) NOT NULL,
 duration INT NOT NULL,
 poster TEXT,
 rate DECIMAL(2,1) NOT NULL
);

-- Crear la tabla de géneros
CREATE TABLE genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Crear la tabla de relación entre películas y géneros
CREATE TABLE movie_genres (
    movie_id BINARY(16),
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
);

-- Insertar datos movie
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
 (UUID_TO_BIN(UUID()),'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
 (UUID_TO_BIN(UUID()),'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
 (UUID_TO_BIN(UUID()),'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
 (UUID_TO_BIN(UUID()),'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9),
 (UUID_TO_BIN(UUID()),'Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 8.8),
 (UUID_TO_BIN(UUID()),'Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 8.5),
 (UUID_TO_BIN(UUID()),'The Matrix', 1999, 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 8.7),
 (UUID_TO_BIN(UUID()),'Interstellar', 2014, 'Christopher Nolan', 169, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.6),
 (UUID_TO_BIN(UUID()),'The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://i.etsystatic.com/43280665/r/il/281d2e/6062224227/il_1140xN.6062224227_10gt.jpg', 8.9),
 (UUID_TO_BIN(UUID()),'The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 8.5),
 (UUID_TO_BIN(UUID()),'The Avengers', 2012, 'Joss Whedon', 143, 'https://img.fruugo.com/product/7/41/14532417_max.jpg', 8.0),
 (UUID_TO_BIN(UUID()),'Jurassic Park', 1993, 'Steven Spielberg', 127, 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 8.1),
 (UUID_TO_BIN(UUID()),'Titanic', 1997, 'James Cameron', 195, 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 7.8),
 (UUID_TO_BIN(UUID()),'The Social Network', 2010, 'David Fincher', 120, 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg', 7.7),
 (UUID_TO_BIN(UUID()),'Avatar', 2009, 'James Cameron', 162, 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg', 7.8);


-- Insertar datos genre
INSERT INTO genre (name) VALUES
('Drama'), 
('Action'), 
('Crime'), 
('Adventure'), 
('Sci-Fi'), 
('Romance'), 
('Biography'), 
('Fantasy'), 
('Animation');

-- Insentar datos movie_genre
-- The Shawshank Redemption (Drama, Crime)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'The Shawshank Redemption';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Crime') FROM movie WHERE title = 'The Shawshank Redemption';

-- The Dark Knight (Action, Crime, Drama)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Action') FROM movie WHERE title = 'The Dark Knight';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Crime') FROM movie WHERE title = 'The Dark Knight';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'The Dark Knight';

-- Inception (Action, Sci-Fi, Adventure)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Action') FROM movie WHERE title = 'Inception';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Sci-Fi') FROM movie WHERE title = 'Inception';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Adventure') FROM movie WHERE title = 'Inception';

-- Pulp Fiction (Crime, Drama)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Crime') FROM movie WHERE title = 'Pulp Fiction';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'Pulp Fiction';

-- Forrest Gump (Drama, Romance)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'Forrest Gump';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Romance') FROM movie WHERE title = 'Forrest Gump';

-- Gladiator (Action, Drama)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Action') FROM movie WHERE title = 'Gladiator';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'Gladiator';

-- The Matrix (Action, Sci-Fi)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Action') FROM movie WHERE title = 'The Matrix';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Sci-Fi') FROM movie WHERE title = 'The Matrix';

-- Interstellar (Sci-Fi, Drama, Adventure)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Sci-Fi') FROM movie WHERE title = 'Interstellar';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'Interstellar';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Adventure') FROM movie WHERE title = 'Interstellar';

-- The Lord of the Rings: The Return of the King (Adventure, Fantasy, Drama)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Adventure') FROM movie WHERE title = 'The Lord of the Rings: The Return of the King';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Fantasy') FROM movie WHERE title = 'The Lord of the Rings: The Return of the King';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'The Lord of the Rings: The Return of the King';

-- The Lion King (Animation, Drama)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Animation') FROM movie WHERE title = 'The Lion King';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'The Lion King';

-- The Avengers (Action, Sci-Fi, Adventure)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Action') FROM movie WHERE title = 'The Avengers';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Sci-Fi') FROM movie WHERE title = 'The Avengers';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Adventure') FROM movie WHERE title = 'The Avengers';

-- Jurassic Park (Sci-Fi, Adventure)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Sci-Fi') FROM movie WHERE title = 'Jurassic Park';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Adventure') FROM movie WHERE title = 'Jurassic Park';

-- Titanic (Romance, Drama)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Romance') FROM movie WHERE title = 'Titanic';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'Titanic';

-- The Social Network (Drama, Biography)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Drama') FROM movie WHERE title = 'The Social Network';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Biography') FROM movie WHERE title = 'The Social Network';

-- Avatar (Action, Adventure, Fantasy)
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Action') FROM movie WHERE title = 'Avatar';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Adventure') FROM movie WHERE title = 'Avatar';
INSERT INTO movie_genres (movie_id, genre_id)
SELECT id, (SELECT id FROM genre WHERE name = 'Fantasy') FROM movie WHERE title = 'Avatar';