-- Seed data for Hotel Management System

USE hotel_management;

-- Insert sample hotel
INSERT INTO hotels (name, address, city, state, country, postal_code, phone, email, website, description, star_rating) VALUES
('Grand Plaza Hotel', '123 Main Street', 'New York', 'NY', 'USA', '10001', '+1-555-0100', 'info@grandplaza.com', 'www.grandplaza.com', 'Luxury hotel in the heart of Manhattan', 5);

-- Insert amenities
INSERT INTO amenities (name, description, icon, category) VALUES
('WiFi', 'High-speed wireless internet', 'wifi', 'room'),
('TV', 'Flat-screen television', 'tv', 'room'),
('Coffee Maker', 'In-room coffee and tea facilities', 'coffee', 'room'),
('Parking', 'Valet parking service', 'car', 'hotel'),
('Gym', 'Fitness center access', 'dumbbell', 'hotel'),
('Pool', 'Swimming pool', 'waves', 'hotel'),
('Spa', 'Full-service spa', 'flower', 'hotel'),
('Restaurant', 'On-site dining', 'utensils', 'hotel'),
('Room Service', '24/7 room service', 'room-service', 'service'),
('Concierge', 'Concierge services', 'bell', 'service');

-- Insert room types
INSERT INTO room_types (hotel_id, name, description, base_price, max_occupancy, size_sqm, bed_type, amenities) VALUES
(1, 'Standard', 'Comfortable standard room with city view', 120.00, 2, 25, 'Queen', '["WiFi", "TV", "Coffee Maker"]'),
(1, 'Deluxe', 'Spacious deluxe room with premium amenities', 180.00, 3, 35, 'King', '["WiFi", "TV", "Coffee Maker", "Room Service"]'),
(1, 'Suite', 'Luxury suite with separate living area', 350.00, 4, 60, 'King + Sofa', '["WiFi", "TV", "Coffee Maker", "Room Service", "Concierge"]'),
(1, 'Presidential', 'Ultimate luxury with panoramic views', 800.00, 6, 120, '2 Kings + Living', '["WiFi", "TV", "Coffee Maker", "Room Service", "Concierge", "Butler"]');

-- Insert rooms
INSERT INTO rooms (hotel_id, room_type_id, room_number, floor_number, status) VALUES
-- Standard rooms (Floor 1-3)
(1, 1, '101', 1, 'available'),
(1, 1, '102', 1, 'occupied'),
(1, 1, '103', 1, 'available'),
(1, 1, '201', 2, 'available'),
(1, 1, '202', 2, 'cleaning'),
(1, 1, '203', 2, 'available'),
(1, 1, '301', 3, 'available'),
(1, 1, '302', 3, 'available'),
(1, 1, '303', 3, 'maintenance'),

-- Deluxe rooms (Floor 4-6)
(1, 2, '401', 4, 'available'),
(1, 2, '402', 4, 'occupied'),
(1, 2, '403', 4, 'available'),
(1, 2, '501', 5, 'available'),
(1, 2, '502', 5, 'available'),
(1, 2, '503', 5, 'occupied'),
(1, 2, '601', 6, 'available'),
(1, 2, '602', 6, 'available'),

-- Suites (Floor 7-8)
(1, 3, '701', 7, 'available'),
(1, 3, '702', 7, 'occupied'),
(1, 3, '801', 8, 'available'),
(1, 3, '802', 8, 'available'),

-- Presidential Suite (Floor 9)
(1, 4, '901', 9, 'available');

-- Insert users
INSERT INTO users (email, password_hash, first_name, last_name, role, phone) VALUES
('admin@grandplaza.com', '$2b$10$hash1', 'John', 'Admin', 'admin', '+1-555-0101'),
('manager@grandplaza.com', '$2b$10$hash2', 'Sarah', 'Manager', 'manager', '+1-555-0102'),
('staff1@grandplaza.com', '$2b$10$hash3', 'Mike', 'Staff', 'staff', '+1-555-0103'),
('staff2@grandplaza.com', '$2b$10$hash4', 'Emily', 'Staff', 'staff', '+1-555-0104');

-- Insert guests
INSERT INTO guests (first_name, last_name, email, phone, date_of_birth, nationality, id_type, id_number, address, city, state, country, postal_code, vip_status, preferences, notes) VALUES
('John', 'Smith', 'john.smith@email.com', '+1-555-0123', '1985-06-15', 'American', 'passport', 'A12345678', '123 Main St', 'New York', 'NY', 'USA', '10001', 'gold', 'Non-smoking room, High floor', 'Frequent business traveler, prefers early check-in'),
('Sarah', 'Johnson', 'sarah.j@email.com', '+1-555-0124', '1990-03-22', 'American', 'drivers_license', 'DL987654321', '456 Oak Ave', 'Los Angeles', 'CA', 'USA', '90210', 'silver', 'Ocean view, Late checkout', 'Celebrates anniversary in March'),
('Mike', 'Davis', 'mike.davis@email.com', '+1-555-0125', '1978-11-08', 'American', 'passport', 'B98765432', '789 Pine St', 'Chicago', 'IL', 'USA', '60601', 'platinum', 'Suite, Gym access, Business center', 'Corporate account, requires receipts'),
('Emily', 'Brown', 'emily.brown@email.com', '+1-555-0126', '1992-09-12', 'Canadian', 'passport', 'C11223344', '321 Maple Dr', 'Toronto', 'ON', 'Canada', 'M5V 3A8', 'bronze', 'Quiet room, Away from elevator', 'First-time guest'),
('David', 'Wilson', 'david.wilson@email.com', '+1-555-0127', '1980-12-03', 'British', 'passport', 'UK556677', '654 Queen St', 'London', '', 'UK', 'SW1A 1AA', 'gold', 'City view, Mini bar', 'International business traveler');

-- Insert bookings
INSERT INTO bookings (booking_reference, hotel_id, room_id, guest_id, check_in_date, check_out_date, adults, children, total_amount, paid_amount, status, payment_status, special_requests, created_by) VALUES
('BK001', 1, 2, 1, '2024-01-15', '2024-01-18', 2, 0, 450.00, 450.00, 'confirmed', 'paid', 'Late check-in requested', 1),
('BK002', 1, 11, 2, '2024-01-16', '2024-01-20', 2, 1, 680.00, 200.00, 'confirmed', 'partial', 'Extra bed required', 1),
('BK003', 1, 20, 3, '2024-01-17', '2024-01-19', 1, 0, 890.00, 890.00, 'checked_in', 'paid', 'Business center access needed', 2),
('BK004', 1, 1, 4, '2024-01-18', '2024-01-22', 2, 0, 480.00, 0.00, 'pending', 'pending', 'Quiet room requested', 1),
('BK005', 1, 23, 5, '2024-01-20', '2024-01-25', 1, 0, 4000.00, 1000.00, 'confirmed', 'partial', 'Airport transfer needed', 2);

-- Insert payments
INSERT INTO payments (booking_id, amount, payment_method, payment_status, transaction_id, payment_gateway, payment_date) VALUES
(1, 450.00, 'credit_card', 'completed', 'TXN001', 'Stripe', '2024-01-10 14:30:00'),
(2, 200.00, 'credit_card', 'completed', 'TXN002', 'Stripe', '2024-01-12 09:15:00'),
(3, 890.00, 'bank_transfer', 'completed', 'TXN003', 'Bank', '2024-01-15 16:45:00'),
(5, 1000.00, 'credit_card', 'completed', 'TXN004', 'PayPal', '2024-01-18 11:20:00');

-- Insert room rates for dynamic pricing
INSERT INTO room_rates (room_type_id, date, rate, rate_type) VALUES
-- Standard room rates
(1, '2024-01-15', 120.00, 'base'),
(1, '2024-01-16', 120.00, 'base'),
(1, '2024-01-17', 120.00, 'base'),
(1, '2024-01-18', 120.00, 'base'),
(1, '2024-01-19', 150.00, 'weekend'),
(1, '2024-01-20', 150.00, 'weekend'),

-- Deluxe room rates
(2, '2024-01-15', 180.00, 'base'),
(2, '2024-01-16', 180.00, 'base'),
(2, '2024-01-17', 180.00, 'base'),
(2, '2024-01-18', 180.00, 'base'),
(2, '2024-01-19', 220.00, 'weekend'),
(2, '2024-01-20', 220.00, 'weekend'),

-- Suite rates
(3, '2024-01-15', 350.00, 'base'),
(3, '2024-01-16', 350.00, 'base'),
(3, '2024-01-17', 350.00, 'base'),
(3, '2024-01-18', 350.00, 'base'),
(3, '2024-01-19', 450.00, 'weekend'),
(3, '2024-01-20', 450.00, 'weekend'),

-- Presidential suite rates
(4, '2024-01-15', 800.00, 'base'),
(4, '2024-01-16', 800.00, 'base'),
(4, '2024-01-17', 800.00, 'base'),
(4, '2024-01-18', 800.00, 'base'),
(4, '2024-01-19', 1000.00, 'weekend'),
(4, '2024-01-20', 1000.00, 'weekend');

-- Insert reviews
INSERT INTO reviews (booking_id, guest_id, hotel_id, overall_rating, service_rating, cleanliness_rating, location_rating, value_rating, title, comment, is_verified, is_published) VALUES
(1, 1, 1, 5, 5, 5, 5, 4, 'Excellent Stay!', 'Had a wonderful time at the Grand Plaza. The staff was incredibly helpful and the room was spotless. Will definitely return!', TRUE, TRUE),
(3, 3, 1, 4, 5, 4, 5, 3, 'Great for Business', 'Perfect location for business meetings. The suite was spacious and the business center had everything I needed. A bit pricey but worth it.', TRUE, TRUE);

-- Insert housekeeping tasks
INSERT INTO housekeeping_tasks (room_id, task_type, priority, status, assigned_to, description, estimated_duration) VALUES
(5, 'cleaning', 'high', 'pending', 3, 'Deep cleaning required after checkout', 90),
(9, 'maintenance', 'medium', 'in_progress', 4, 'Fix leaky faucet in bathroom', 60),
(13, 'inspection', 'low', 'pending', 3, 'Routine monthly inspection', 30),
(21, 'cleaning', 'high', 'completed', 3, 'Standard checkout cleaning', 60);

-- Insert room amenities relationships
INSERT INTO room_amenities (room_type_id, amenity_id) VALUES
-- Standard rooms
(1, 1), (1, 2), (1, 3),
-- Deluxe rooms  
(2, 1), (2, 2), (2, 3), (2, 9),
-- Suites
(3, 1), (3, 2), (3, 3), (3, 9), (3, 10),
-- Presidential
(4, 1), (4, 2), (4, 3), (4, 9), (4, 10);
