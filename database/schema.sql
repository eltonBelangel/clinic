CREATE DATABASE IF NOT EXISTS clinic_db;
USE clinic_db;

CREATE TABLE IF NOT EXISTS patients (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  full_name  VARCHAR(120) NOT NULL,
  age        INT NOT NULL,
  gender     ENUM('Female','Male','Other') NOT NULL,
  phone      VARCHAR(30),
  address    VARCHAR(200),
  diagnosis  VARCHAR(200),
  status     ENUM('Active','Follow-up','Discharged') NOT NULL DEFAULT 'Active',
  visit_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_name (full_name),
  INDEX idx_status (status)
);
