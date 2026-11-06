USE clinic_db;
INSERT INTO patients (full_name, age, gender, phone, address, diagnosis, status, visit_date) VALUES
('Maria Santos', 34, 'Female', '0917-555-0101', 'Jaro, Iloilo City', 'Hypertension', 'Follow-up', CURDATE()),
('Juan Dela Cruz', 52, 'Male', '0918-555-0102', 'Mandurriao, Iloilo City', 'Type 2 Diabetes', 'Active', CURDATE()),
('Ana Reyes', 27, 'Female', '0919-555-0103', 'La Paz, Iloilo City', 'Migraine', 'Active', DATE_SUB(CURDATE(), INTERVAL 2 DAY)),
('Carlo Mendoza', 8, 'Male', '0920-555-0104', 'Molo, Iloilo City', 'Asthma', 'Follow-up', DATE_SUB(CURDATE(), INTERVAL 4 DAY)),
('Liza Fernandez', 61, 'Female', '0921-555-0105', 'Arevalo, Iloilo City', 'Osteoarthritis', 'Active', DATE_SUB(CURDATE(), INTERVAL 7 DAY)),
('Miguel Torres', 45, 'Male', '0922-555-0106', 'Oton, Iloilo', 'Acute bronchitis', 'Discharged', DATE_SUB(CURDATE(), INTERVAL 10 DAY)),
('Grace Villanueva', 39, 'Female', '0923-555-0107', 'Pavia, Iloilo', 'Gastritis', 'Discharged', DATE_SUB(CURDATE(), INTERVAL 14 DAY)),
('Paolo Garcia', 19, 'Male', '0924-555-0108', 'Santa Barbara, Iloilo', 'Sprained ankle', 'Follow-up', DATE_SUB(CURDATE(), INTERVAL 3 DAY));
