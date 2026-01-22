-- Drop existing tables to avoid conflicts (ORDER MATTERS due to foreign keys)
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS class CASCADE;
DROP TABLE IF EXISTS trainer CASCADE;
DROP TABLE IF EXISTS member CASCADE;

-- Create Member Table
CREATE TABLE member (
    member_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    contact_number VARCHAR(20),
    join_date DATE DEFAULT CURRENT_DATE
);

-- Create Trainer Table
CREATE TABLE trainer (
    trainer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    specialization VARCHAR(100)
);

-- Create Class Table
CREATE TABLE class (
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(100),
    schedule TIMESTAMP, -- Corrected type (Postgres uses TIMESTAMP, not DATETIME)
    trainer_id INT REFERENCES trainer(trainer_id),
    capacity INT
);

-- Create Attendance Table
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES member(member_id),
    class_id INT REFERENCES class(class_id)
);
