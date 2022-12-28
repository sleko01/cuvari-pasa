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