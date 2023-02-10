 -- Create the table
 CREATE TABLE countries (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL
 );
 -- Insert some sample data into the table
 INSERT INTO countries (name) VALUES ('United States');
 INSERT INTO countries (name) VALUES ('Canada');
 INSERT INTO countries (name) VALUES ('Mexico');