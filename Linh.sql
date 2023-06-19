CREATE TABLE user_collection (
  username VARCHAR(50),
  password VARCHAR(50),
  email VARCHAR(100),
  other_info VARCHAR(200),
  PRIMARY KEY (username)
);
INSERT INTO user_collection (username, password, email, other_info)
VALUES ('Linh', 'password123', 'lyousef@my.centennialcollege.ca', 'Other relevant information');