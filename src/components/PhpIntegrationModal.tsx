import React, { useState } from 'react';
import { X, Database, Check, Copy, Code, FileSpreadsheet, Server, Terminal } from 'lucide-react';

interface PhpIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhpIntegrationModal: React.FC<PhpIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'php-api' | 'xampp-guide'>('sql');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sqlSchema = `-- ========================================================
-- PawConnect Animal Welfare Database Schema (MySQL / MariaDB)
-- For use with XAMPP (phpMyAdmin)
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`pawconnect_db\` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`pawconnect_db\`;

-- 1. Pets Table
CREATE TABLE IF NOT EXISTS \`pets\` (
  \`id\` VARCHAR(36) PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`species\` ENUM('dog', 'cat', 'rabbit', 'bird', 'small-pet', 'other') NOT NULL DEFAULT 'dog',
  \`breed\` VARCHAR(120) NOT NULL,
  \`age\` VARCHAR(50) NOT NULL,
  \`age_group\` ENUM('puppy-kitten', 'young', 'adult', 'senior') NOT NULL,
  \`gender\` ENUM('male', 'female') NOT NULL,
  \`size\` ENUM('small', 'medium', 'large', 'extra-large') NOT NULL,
  \`weight\` VARCHAR(30) NOT NULL,
  \`status\` ENUM('available', 'foster', 'urgent', 'pending', 'adopted') DEFAULT 'available',
  \`kennel_id\` VARCHAR(20) NOT NULL,
  \`intake_date\` DATE NOT NULL,
  \`intake_reason\` ENUM('stray', 'owner-surrender', 'rescue-transfer', 'emergency-seizure') DEFAULT 'stray',
  \`microchip_id\` VARCHAR(50) UNIQUE,
  \`is_spayed_neutered\` TINYINT(1) DEFAULT 1,
  \`is_vaccinated\` TINYINT(1) DEFAULT 1,
  \`is_house_trained\` TINYINT(1) DEFAULT 1,
  \`good_with_kids\` TINYINT(1) DEFAULT 1,
  \`good_with_dogs\` TINYINT(1) DEFAULT 1,
  \`good_with_cats\` TINYINT(1) DEFAULT 0,
  \`energy_level\` ENUM('low', 'moderate', 'high', 'very-high') DEFAULT 'moderate',
  \`primary_image\` VARCHAR(500) NOT NULL,
  \`story\` TEXT NOT NULL,
  \`medical_summary\` TEXT,
  \`adoption_fee\` DECIMAL(8,2) NOT NULL DEFAULT 100.00,
  \`urgent_reason\` VARCHAR(255) NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Medical Timeline Records Table
CREATE TABLE IF NOT EXISTS \`medical_records\` (
  \`id\` VARCHAR(36) PRIMARY KEY,
  \`pet_id\` VARCHAR(36) NOT NULL,
  \`record_date\` DATE NOT NULL,
  \`title\` VARCHAR(200) NOT NULL,
  \`category\` ENUM('vaccination', 'surgery', 'checkup', 'treatment', 'dental') NOT NULL,
  \`veterinarian\` VARCHAR(120) NOT NULL,
  \`notes\` TEXT,
  \`status\` ENUM('completed', 'scheduled', 'overdue') DEFAULT 'completed',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`pet_id\`) REFERENCES \`pets\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Shelter Kennels Table
CREATE TABLE IF NOT EXISTS \`kennels\` (
  \`id\` VARCHAR(36) PRIMARY KEY,
  \`code\` VARCHAR(20) NOT NULL UNIQUE,
  \`wing\` VARCHAR(100) NOT NULL,
  \`type\` ENUM('dog-run', 'cat-condo', 'quarantine-suite') NOT NULL,
  \`status\` ENUM('occupied', 'vacant', 'cleaning', 'isolation') DEFAULT 'vacant',
  \`current_pet_id\` VARCHAR(36) NULL,
  \`cleaning_status\` ENUM('clean', 'needs-attention', 'in-progress') DEFAULT 'clean',
  \`last_cleaned\` VARCHAR(100) NOT NULL,
  FOREIGN KEY (\`current_pet_id\`) REFERENCES \`pets\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Adoption Applications Table
CREATE TABLE IF NOT EXISTS \`adoption_applications\` (
  \`id\` VARCHAR(36) PRIMARY KEY,
  \`pet_id\` VARCHAR(36) NOT NULL,
  \`applicant_name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`city\` VARCHAR(100) NOT NULL,
  \`state\` VARCHAR(50) NOT NULL,
  \`home_type\` VARCHAR(50) NOT NULL,
  \`has_fenced_yard\` TINYINT(1) DEFAULT 0,
  \`landlord_approval\` TINYINT(1) DEFAULT 1,
  \`household_members\` INT DEFAULT 1,
  \`children_ages\` VARCHAR(100) DEFAULT 'None',
  \`current_pets\` TEXT,
  \`hours_alone\` INT DEFAULT 4,
  \`vet_contact\` VARCHAR(255) NOT NULL,
  \`experience_notes\` TEXT,
  \`status\` ENUM('pending-review', 'interview-scheduled', 'approved', 'rejected') DEFAULT 'pending-review',
  \`submitted_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`pet_id\`) REFERENCES \`pets\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Donations Table
CREATE TABLE IF NOT EXISTS \`donations\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`amount\` DECIMAL(10,2) NOT NULL,
  \`frequency\` ENUM('once', 'monthly') DEFAULT 'once',
  \`fund_designation\` VARCHAR(100) NOT NULL,
  \`donor_name\` VARCHAR(150) NOT NULL,
  \`donor_email\` VARCHAR(150) NOT NULL,
  \`is_anonymous\` TINYINT(1) DEFAULT 0,
  \`transaction_date\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

  const phpDbConnect = `<?php
// C:\\xampp\\htdocs\\pawconnect\\api\\config.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = '127.0.0.1';
$db   = 'pawconnect_db';
$user = 'root';
$pass = ''; // Default XAMPP MySQL password is empty
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\\PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
    exit();
}
?>`;

  const phpGetPets = `<?php
// C:\\xampp\\htdocs\\pawconnect\\api\\pets.php
require_once 'config.php';

$species = isset($_GET['species']) ? $_GET['species'] : null;
$status  = isset($_GET['status']) ? $_GET['status'] : null;

$query = "SELECT * FROM pets WHERE 1=1";
$params = [];

if ($species && $species !== 'all') {
    $query .= " AND species = :species";
    $params[':species'] = $species;
}

if ($status && $status !== 'all') {
    $query .= " AND status = :status";
    $params[':status'] = $status;
}

$query .= " ORDER BY created_at DESC";

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$pets = $stmt->fetchAll();

echo json_encode(["status" => "success", "count" => count($pets), "data" => $pets]);
?>`;

  const phpApply = `<?php
// C:\\xampp\\htdocs\\pawconnect\\api\\apply.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['petId']) || empty($input['applicantName']) || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required form fields"]);
    exit();
}

$appId = "APP-" . rand(100000, 999999);

$stmt = $pdo->prepare("INSERT INTO adoption_applications 
  (id, pet_id, applicant_name, email, phone, city, state, home_type, has_fenced_yard, landlord_approval, household_members, children_ages, current_pets, hours_alone, vet_contact, experience_notes, status) 
  VALUES (:id, :pet_id, :applicant_name, :email, :phone, :city, :state, :home_type, :has_fenced_yard, :landlord_approval, :household_members, :children_ages, :current_pets, :hours_alone, :vet_contact, :experience_notes, 'pending-review')");

$stmt->execute([
    ':id'                 => $appId,
    ':pet_id'             => $input['petId'],
    ':applicant_name'     => $input['applicantName'],
    ':email'              => $input['email'],
    ':phone'              => $input['phone'] ?? '',
    ':city'               => $input['city'] ?? '',
    ':state'              => $input['state'] ?? 'OR',
    ':home_type'          => $input['homeType'] ?? 'own-house',
    ':has_fenced_yard'    => !empty($input['hasFencedYard']) ? 1 : 0,
    ':landlord_approval'  => !empty($input['landlordApproval']) ? 1 : 0,
    ':household_members'  => $input['householdMembers'] ?? 1,
    ':children_ages'      => $input['childrenAges'] ?? 'None',
    ':current_pets'       => $input['currentPetsDescription'] ?? '',
    ':hours_alone'        => $input['hoursAlonePerDay'] ?? 4,
    ':vet_contact'        => $input['veterinarianContact'] ?? '',
    ':experience_notes'   => $input['experienceDescription'] ?? ''
]);

echo json_encode([
    "status" => "success",
    "application_id" => $appId,
    "message" => "Adoption application successfully registered in MySQL!"
]);
?>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E5DFD7] shadow-warm-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#1B4332] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-[#D8F3DC] flex items-center justify-center">
              <Database className="w-5 h-5 text-[#74C69D]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                PHP & MySQL XAMPP Integration Guide
                <span className="text-xs bg-[#74C69D]/30 text-[#D8F3DC] px-2 py-0.5 rounded-full">
                  Requirement 9 Ready
                </span>
              </h2>
              <p className="text-xs text-white/80">
                Easily plug this frontend into your local Apache / MySQL XAMPP stack.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5DFD7] bg-[#F4EFEA] px-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('sql')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'border-[#1B4332] text-[#1B4332] bg-white'
                : 'border-transparent text-[#59605B] hover:text-[#1B4332]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#74C69D]" />
            <span>1. MySQL Database Schema (pawconnect.sql)</span>
          </button>
          <button
            onClick={() => setActiveTab('php-api')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'php-api'
                ? 'border-[#1B4332] text-[#1B4332] bg-white'
                : 'border-transparent text-[#59605B] hover:text-[#1B4332]'
            }`}
          >
            <Code className="w-4 h-4 text-[#74C69D]" />
            <span>2. PHP REST Endpoints (config, pets, apply)</span>
          </button>
          <button
            onClick={() => setActiveTab('xampp-guide')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'xampp-guide'
                ? 'border-[#1B4332] text-[#1B4332] bg-white'
                : 'border-transparent text-[#59605B] hover:text-[#1B4332]'
            }`}
          >
            <Server className="w-4 h-4 text-[#74C69D]" />
            <span>3. 3-Step Setup Instructions</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-[#2D312E] space-y-4">
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1B4332]">
                    Complete MySQL Schema Definition
                  </h3>
                  <p className="text-xs text-[#59605B]">
                    Includes relational tables for pets, medical records, kennels, applications, and donations with foreign keys.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(sqlSchema, 'sql')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  {copiedSection === 'sql' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#191c1a] text-[#86af99] p-4 rounded-xl text-xs font-mono max-h-96 overflow-y-auto border border-[#414844]">
                <pre>{sqlSchema}</pre>
              </div>
            </div>
          )}

          {activeTab === 'php-api' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-[#1B4332]">
                    A. Database PDO Connection (config.php)
                  </span>
                  <button
                    onClick={() => copyToClipboard(phpDbConnect, 'php-db')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[#F4EFEA] hover:bg-[#ecefea] rounded border border-[#E5DFD7]"
                  >
                    {copiedSection === 'php-db' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-[#191c1a] text-[#86af99] p-3 rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
                  <pre>{phpDbConnect}</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-[#1B4332]">
                    B. Fetch Pets API (pets.php)
                  </span>
                  <button
                    onClick={() => copyToClipboard(phpGetPets, 'php-pets')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[#F4EFEA] hover:bg-[#ecefea] rounded border border-[#E5DFD7]"
                  >
                    {copiedSection === 'php-pets' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-[#191c1a] text-[#86af99] p-3 rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
                  <pre>{phpGetPets}</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-[#1B4332]">
                    C. Save Adoption Application (apply.php)
                  </span>
                  <button
                    onClick={() => copyToClipboard(phpApply, 'php-apply')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[#F4EFEA] hover:bg-[#ecefea] rounded border border-[#E5DFD7]"
                  >
                    {copiedSection === 'php-apply' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-[#191c1a] text-[#86af99] p-3 rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
                  <pre>{phpApply}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'xampp-guide' && (
            <div className="space-y-4">
              <h3 className="font-bold text-[#1B4332]">
                Running with XAMPP in 3 Easy Steps:
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1B4332]">
                      Start Apache & MySQL in XAMPP
                    </h4>
                    <p className="text-xs text-[#59605B] mt-0.5">
                      Launch XAMPP Control Panel and click &quot;Start&quot; next to Apache and MySQL.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1B4332]">
                      Import the Database Schema in phpMyAdmin
                    </h4>
                    <p className="text-xs text-[#59605B] mt-0.5">
                      Visit <code>http://localhost/phpmyadmin</code> in your browser. Create a new database named <code>pawconnect_db</code> and paste the SQL script from Tab 1 into the SQL query box, then click &quot;Go&quot;.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1B4332]">
                      Place API Files in your htdocs directory
                    </h4>
                    <p className="text-xs text-[#59605B] mt-0.5">
                      Create folder <code>C:\xampp\htdocs\pawconnect\api\</code> and save <code>config.php</code>, <code>pets.php</code>, and <code>apply.php</code> inside it. You can immediately send queries from your React frontend to <code>http://localhost/pawconnect/api/pets.php</code>!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5DFD7] bg-[#FDFBF7] flex items-center justify-between">
          <span className="text-xs text-[#59605B]">
            All frontend form structures strictly match these MySQL fields.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
