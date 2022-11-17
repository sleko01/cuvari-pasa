CREATE TABLE IF NOT EXISTS Role
(
    role_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS appUser
(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    rating_sum INT NOT NULL,
    rating_count INT NOT NULL,
    contact VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
);

CREATE TABLE IF NOT EXISTS Breed
(
    breed_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (breed_id)
);

CREATE TABLE IF NOT EXISTS Owner
(
    user_id INT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES appUser(user_id)
);

CREATE TABLE IF NOT EXISTS Guardian
(
    has_experience BOOLEAN NOT NULL,
    has_dog BOOLEAN NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES appUser(user_id)
);

CREATE TABLE IF NOT EXISTS Dog
(
    dog_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    year_of_birth INT NOT NULL,
    photo VARCHAR(100),
    rating_sum INT NOT NULL,
    rating_count INT NOT NULL,
    user_id INT NOT NULL,
    breed_id INT NOT NULL,
    PRIMARY KEY (dog_id),
    FOREIGN KEY (user_id) REFERENCES Owner(user_id),
    FOREIGN KEY (breed_id) REFERENCES Breed(breed_id)
);

CREATE TABLE IF NOT EXISTS Request_dog
(
    request_dog_id INT NOT NULL,
    dog_age INT,
    dog_time_begin TIMESTAMP NOT NULL,
    dog_time_end  TIMESTAMP NOT NULL,
    is_flexible BOOLEAN,
    location VARCHAR(100) NOT NULL,
    number_of_dogs INT NOT NULL,
    is_published  BOOLEAN NOT NULL,
    is_reviewed  BOOLEAN NOT NULL,
    breed_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (request_dog_id),
    FOREIGN KEY (breed_id) REFERENCES Breed(breed_id),
    FOREIGN KEY (user_id) REFERENCES Guardian(user_id)
);

CREATE TABLE IF NOT EXISTS Request_guardian
(
    request_guardian_id INT NOT NULL,
    location VARCHAR(50) NOT NULL,
    number_of_dogs INT,
    guard_time_begin TIMESTAMP NOT NULL,
    guard_time_end  TIMESTAMP NOT NULL,
    is_published BOOLEAN NOT NULL,
    is_reviewed BOOLEAN NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (request_guardian_id),
    FOREIGN KEY (user_id) REFERENCES Owner(user_id)
);

CREATE TABLE IF NOT EXISTS Request_guardians_dog
(
    request_guardians_dogs_id INT NOT NULL,
    dog_id INT NOT NULL,
    PRIMARY KEY (request_guardians_dogs_id),
    FOREIGN KEY (dog_id) REFERENCES Dog(dog_id)
);

CREATE TABLE IF NOT EXISTS Activity
(
    activity_id INT NOT NULL,
    activity_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (activity_id)
);

CREATE TABLE IF NOT EXISTS UserRole
(
    role_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (role_id, user_id),
    FOREIGN KEY (role_id) REFERENCES Role(role_id),
    FOREIGN KEY (user_id) REFERENCES appUser(user_id)
);

CREATE TABLE IF NOT EXISTS requestedForGuard
(
    request_guardian_id INT NOT NULL,
    request_guardians_dogs_id INT NOT NULL,
    PRIMARY KEY (request_guardian_id, request_guardians_dogs_id),
    FOREIGN KEY (request_guardian_id) REFERENCES Request_guardian(request_guardian_id),
    FOREIGN KEY (request_guardians_dogs_id) REFERENCES Request_guardians_dog(request_guardians_dogs_id)
);

CREATE TABLE IF NOT EXISTS requestsActivity
(
    feeding_quantity INT NOT NULL,
    request_guardian_id INT NOT NULL,
    activity_id INT NOT NULL,
    PRIMARY KEY (request_guardian_id, activity_id),
    FOREIGN KEY (request_guardian_id) REFERENCES Request_guardian(request_guardian_id),
    FOREIGN KEY (activity_id) REFERENCES Activity(activity_id)
);
ALTER TABLE appUser DROP COLUMN contact;
ALTER TABLE appUser ADD COLUMN email varchar(100);

ALTER TABLE DOG DROP COLUMN year_of_birth;
ALTER TABLE DOG ADD COLUMN date_of_birth DATE NOT NULL;

ALTER TABLE Request_guardian ADD COLUMN has_experience BOOLEAN;
ALTER TABLE Request_guardian ADD COLUMN has_dog BOOLEAN;

DROP TABLE requestedForGuard;
DROP TABLE UserRole;
DROP TABLE requestsActivity;

CREATE TABLE Request_activity
(
    request_activity_id INT NOT NULL,
    activity_id INT NOT NULL,
    feeding_quantity INT,
    request_guardian_id INT NOT NULL,
    PRIMARY KEY(request_activity_id),
    FOREIGN KEY(activity_id) REFERENCES Activity(activity_id),
    FOREIGN KEY(request_guardian_id) REFERENCES Request_guardian(request_guardian_id)
);

CREATE TABLE Agreed_request
(
    agreed_request_id INT NOT NULL,
    is_agreed BOOLEAN,
    agreed_time_begin TIMESTAMP,
    agreed_time_end TIMESTAMP,
    request_guardian_id INT NOT NULL,
    request_dog_id INT NOT NULL,
    initiator_user_id INT NOT NULL,
    PRIMARY KEY (agreed_request_id),
    FOREIGN KEY (request_guardian_id) REFERENCES Request_guardian(request_guardian_id),
    FOREIGN KEY (request_dog_id) REFERENCES Request_dog(request_dog_id),
    FOREIGN KEY (initiator_user_id) REFERENCES appUser(user_id)
);

DROP TABLE Request_guardians_dog;

CREATE TABLE Request_guardians_dog
(
    request_guardians_dog_id INT NOT NULL,
    request_guardian_id INT NOT NULL,
    dog_id INT NOT NULL,
    PRIMARY KEY (request_guardians_dog_id),
    FOREIGN KEY (request_guardian_id) REFERENCES Request_guardian(request_guardian_id),
    FOREIGN KEY (dog_id) REFERENCES Dog(dog_id)
);