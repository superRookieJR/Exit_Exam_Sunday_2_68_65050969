-- 1. Seed Roles
INSERT INTO roles (name) VALUES ('STUDENT'), ('STAFF'), ('ADMIN');

-- 2. Seed Departments (Positions)
INSERT INTO departments (name) VALUES ('North Wing'), ('South Wing'), ('Central Area');

-- 3. Seed Complaint Types
INSERT INTO complaint_types (title) VALUES ('Food Quality'), ('Cleanliness'), ('Service'), ('Price'), ('Environment');

-- 4. Seed Canteens (3 แห่ง)
INSERT INTO canteens (code, name, position_id) VALUES 
('C001', 'Engineering Canteen', 1),
('C002', 'Medical Center Food Court', 2),
('C003', 'Central Student Union', 3);

-- 5. Seed Stalls (8 ร้าน)
INSERT INTO stalls (name, canteen_id) VALUES 
('Uncle Sam Noodle', 1),    -- C001
('Green Curry Express', 1), -- C001
('Hainanese Chicken Rice', 1), -- C001
('Healthy Salad Bar', 2),   -- C002
('Quick Sushi', 2),         -- C002
('Halal Kitchen', 3),       -- C003
('Wonton Station', 3),      -- C003
('Fruit & Smoothie', 3);    -- C003

-- 6. Seed Users (เพื่อใช้ในการร้องเรียน)
INSERT INTO users (id, email, first_name, last_name, role_id) VALUES 
(gen_random_uuid(), 'somchai@example.com', 'Somchai', 'Saidee', 1),
(gen_random_uuid(), 'admin_jane@example.com', 'Jane', 'Admin', 3);

-- 7. Seed Complaints (10 รายการ ครบทุกสถานะ)
-- ดึง user_id แรกที่เจอมาใช้เป็นคนแจ้ง
DO $$
DECLARE
    user_id_val uuid := (SELECT id FROM users LIMIT 1);
BEGIN
    -- IN_PROGRESS
    INSERT INTO complaints (id, code, user_id, canteen_id, stall_id, type_id, details, status) VALUES 
    (gen_random_uuid(), 'CP-001', user_id_val, 1, 1, 1, 'พบเส้นผมในชามก๋วยเตี๋ยว', 'IN_PROGRESS'),
    (gen_random_uuid(), 'CP-002', user_id_val, 1, 2, 2, 'โต๊ะนั่งบริเวณร้านแกงเขียวหวานสกปรก', 'IN_PROGRESS'),
    (gen_random_uuid(), 'CP-003', user_id_val, 2, 4, 3, 'พนักงานบริการไม่สุภาพ', 'IN_PROGRESS');

    -- COMPLETED
    INSERT INTO complaints (id, code, user_id, canteen_id, stall_id, type_id, details, status) VALUES 
    (gen_random_uuid(), 'CP-004', user_id_val, 3, 6, 1, 'อาหารดิบเกินไป (แก้ไขแล้ว)', 'COMPLETED'),
    (gen_random_uuid(), 'CP-005', user_id_val, 3, 8, 4, 'ราคาน้ำปั่นแพงกว่าป้ายที่ติดไว้', 'COMPLETED'),
    (gen_random_uuid(), 'CP-006', user_id_val, 1, 3, 2, 'มีแมลงสาบวิ่งผ่านหน้าร้าน', 'COMPLETED');

    -- CANCELLED
    INSERT INTO complaints (id, code, user_id, canteen_id, stall_id, type_id, details, status) VALUES 
    (gen_random_uuid(), 'CP-007', user_id_val, 2, 5, 5, 'แอร์บริเวณร้านซูชิไม่เย็น (แจ้งซ้ำ)', 'CANCELLED'),
    (gen_random_uuid(), 'CP-008', user_id_val, 1, NULL, 5, 'พื้นทางเดินลื่นมาก', 'CANCELLED');

    -- REJECTED
    INSERT INTO complaints (id, code, user_id, canteen_id, stall_id, type_id, details, status) VALUES 
    (gen_random_uuid(), 'CP-009', user_id_val, 3, 7, 1, 'ไม่อร่อยเลย (ความเห็นส่วนตัวเกินไป)', 'REJECTED'),
    (gen_random_uuid(), 'CP-010', user_id_val, 2, 4, 4, 'อยากให้ลดราคาเหลือ 10 บาท', 'REJECTED');
END $$;