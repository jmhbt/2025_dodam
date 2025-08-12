CREATE DATABASE IF NOT EXISTS dodam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dodam;

-- 1) 기본 엔티티
CREATE TABLE IF NOT EXISTS users (
  id           INT AUTO_INCREMENT,
  email        VARCHAR(255) NOT NULL UNIQUE,
  password     VARCHAR(255),
  name         VARCHAR(100) NOT NULL,
  phone        VARCHAR(20)  NULL UNIQUE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS companies (
  id           INT AUTO_INCREMENT,
  name         VARCHAR(100) NOT NULL UNIQUE,
  address      VARCHAR(500) NOT NULL, 
  website      VARCHAR(2048),
  description  VARCHAR(500) NOT NULL,
  ceo_name     VARCHAR(100) NOT NULL,
  ceo_phone    VARCHAR(20)  NOT NULL,
  ceo_email    VARCHAR(100) NOT NULL,
  headcount    INT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- 2) users 의 종속 테이블
CREATE TABLE IF NOT EXISTS social_identities (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT NOT NULL,
  provider         VARCHAR(50)  NOT NULL,
  provider_user_id VARCHAR(100) NOT NULL,
  access_token     VARCHAR(500),
  refresh_token    VARCHAR(500),
  token_expires_at DATETIME,
  profile_data     JSON,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- 3) 그 외 기본 테이블
CREATE TABLE IF NOT EXISTS images (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  url            VARCHAR(2048) NOT NULL,
  imageable_id   INT NOT NULL,
  imageable_type VARCHAR(50) NOT NULL,
  purpose        VARCHAR(50),
  metadata       JSON NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inspection_forms (
  id           INT AUTO_INCREMENT,
  name         VARCHAR(50) NOT NULL,
  description  VARCHAR(500),
  is_editable  BOOLEAN NOT NULL DEFAULT TRUE,
  user_id      INT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users_info_in_company (
  id           INT AUTO_INCREMENT,
  job_title    VARCHAR(50)  NOT NULL,
  department   VARCHAR(50),
  role         VARCHAR(50),
  system_role  VARCHAR(50)  NOT NULL,
  description  VARCHAR(100),
  is_accepted  BOOLEAN NOT NULL DEFAULT FALSE,
  company_id   INT NOT NULL,
  user_id      INT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (user_id)    REFERENCES users(id)
) ENGINE=InnoDB;

-- 4) 요청/응답/로그
CREATE TABLE IF NOT EXISTS visit_requests (
  id          INT AUTO_INCREMENT,
  title       VARCHAR(100)  NOT NULL,
  location    VARCHAR(100)  NOT NULL,
  product     VARCHAR(100)  NOT NULL,
  context     VARCHAR(1000) NOT NULL,
  is_editable BOOLEAN NOT NULL DEFAULT TRUE,
  company_id  INT NOT NULL,
  user_id     INT NOT NULL,
  forms_id    INT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (user_id)    REFERENCES users(id),
  FOREIGN KEY (forms_id)   REFERENCES inspection_forms(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS visit_responses (
  id           INT AUTO_INCREMENT,
  title        VARCHAR(100) NOT NULL,
  context      VARCHAR(100) NOT NULL,
  vehicle_type VARCHAR(20),
  vehicle_no   VARCHAR(20),
  start_at     TIMESTAMP NOT NULL,
  end_at       TIMESTAMP NOT NULL,
  is_editable  BOOLEAN NOT NULL DEFAULT TRUE,
  is_accepted  BOOLEAN NOT NULL DEFAULT FALSE,
  reason       VARCHAR(100),
  user_id      INT NOT NULL,
  request_id   INT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)   REFERENCES users(id),
  FOREIGN KEY (request_id)REFERENCES visit_requests(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS visit_logs (
  id          INT AUTO_INCREMENT,
  type        ENUM('entry','exit') NOT NULL,
  user_id     INT NOT NULL,
  response_id INT NOT NULL,
  issued_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)     REFERENCES users(id),
  FOREIGN KEY (response_id) REFERENCES visit_responses(id)
) ENGINE=InnoDB;

-- 5) 폼/필드/응답
CREATE TABLE IF NOT EXISTS inspection_form_fields (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  form_id       INT NOT NULL,
  label         VARCHAR(200) NOT NULL,
  question_type ENUM('short_answer','paragraph','multiple_choice',
                     'checkbox','dropdown','file_upload',
                     'linear_scale','mc_grid','cb_grid',
                     'date','time') NOT NULL,
  is_required   BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order    INT NOT NULL DEFAULT 0,
  settings      JSON NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES inspection_forms(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inspection_form_field_options (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  field_id      INT NOT NULL,
  option_label  VARCHAR(200) NOT NULL,
  option_value  VARCHAR(200) NULL,
  sort_order    INT NOT NULL DEFAULT 0,
  FOREIGN KEY (field_id) REFERENCES inspection_form_fields(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS form_responses (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  form_id      INT NOT NULL,
  user_id      INT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES inspection_forms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS field_answers (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  response_id INT NOT NULL,
  field_id    INT NOT NULL,
  option_id   INT NULL,
  answer_text TEXT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (response_id) REFERENCES form_responses(id),
  FOREIGN KEY (field_id)    REFERENCES inspection_form_fields(id),
  FOREIGN KEY (option_id)   REFERENCES inspection_form_field_options(id)
) ENGINE=InnoDB;
