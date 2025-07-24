CREATE TABLE users (
  id               INT             AUTO_INCREMENT,
  email            VARCHAR(255)    NOT NULL UNIQUE,
  password         VARCHAR(255),
  name             VARCHAR(100)    NOT NULL,
  phone            VARCHAR(20)     NOT NULL UNIQUE,

  created_at       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id)
);

CREATE TABLE social_identities (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  user_id              INT NOT NULL,
  provider             VARCHAR(50) NOT NULL,      -- google, facebook, kakao 등
  provider_user_id     VARCHAR(100) NOT NULL,     -- 소셜 계정 고유 ID
  access_token         VARCHAR(500),
  refresh_token        VARCHAR(500),
  token_expires_at     DATETIME,
  profile_data         JSON,                      -- 소셜에서 받은 프로필 정보 등

  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE(provider, provider_user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE companies (
  id               INT             AUTO_INCREMENT,
  name             VARCHAR(100)    NOT NULL UNIQUE,
  address          VARCHAR(500)    NOT NULL,
  website          VARCHAR(2048),
  description      VARCHAR(500)    NOT NULL,
  ceo_name         VARCHAR(100)    NOT NULL,
  ceo_phone        VARCHAR(20)     NOT NULL,
  ceo_email        VARCHAR(100)    NOT NULL,
  headcount        INT             NOT NULL,

  created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id)
);



CREATE TABLE users_info_in_company (
  id               INT            AUTO_INCREMENT,
  job_title        VARCHAR(50)    NOT NULL,
  department       VARCHAR(50),
  role             VARCHAR(50),
  system_role      VARCHAR(50)    NOT NULL,
  description      VARCHAR(100),
  is_accepted      BOOLEAN        NOT NULL DEFAULT FALSE,

  company_id       INT            NOT NULL,
  user_id          INT            NOT NULL,

  created_at       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
  

);



CREATE TABLE images (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  url               VARCHAR(2048) NOT NULL,
  imageable_id      INT NOT NULL,
  imageable_type    VARCHAR(50) NOT NULL,
  purpose           VARCHAR(50),          -- ex: "profile", "company", "visit_request", "inspection"
  metadata          JSON NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inspection_forms (
    id               INT AUTO_INCREMENT,
    name             VARCHAR(50) NOT NULL,
    description      VARCHAR(500),
    is_editable      BOOLEAN NOT NULL DEFAULT TRUE,

    user_id       INT NOT NULL,
    
    created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE visit_requests (
    id              INT                 AUTO_INCREMENT,
    title           VARCHAR(100)        NOT NULL,
    location        VARCHAR(100)        NOT NULL,
    product         VARCHAR(100)        NOT NULL,
    context         VARCHAR(1000)       NOT NULL,
    is_editable     BOOLEAN NOT NULL DEFAULT TRUE,

    company_id      INT                 NOT NULL,
    user_id         INT                 NOT NULL,
    forms_id        INT                 NOT NULL,

    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (forms_id) REFERENCES inspection_forms(id)
);

CREATE TABLE visit_responses (
    id               INT AUTO_INCREMENT,
    title            VARCHAR(100) NOT NULL,
    context          VARCHAR(100) NOT NULL,
    vehicle_type     VARCHAR(20),
    vehicle_no       VARCHAR(20),
    start_at         TIMESTAMP NOT NULL,
    end_at           TIMESTAMP NOT NULL,
    is_editable      BOOLEAN NOT NULL DEFAULT TRUE,
    is_accepted      BOOLEAN NOT NULL DEFAULT FALSE,
    reason           VARCHAR(100),

    user_id       INT NOT NULL,
    request_id       INT NOT NULL,

    created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)        REFERENCES users(id),
    FOREIGN KEY (request_id)        REFERENCES visit_requests(id)
);

CREATE TABLE visit_logs (
    id                  INT AUTO_INCREMENT,
    type                ENUM('entry','exit') NOT NULL,

    user_id             INT NOT NULL,
    response_id         INT NOT NULL,
    
    issued_at          TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id)       REFERENCES users(id),
    FOREIGN KEY (response_id)   REFERENCES visit_responses(id)
);

CREATE TABLE inspection_form_fields (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  form_id      INT NOT NULL,                        -- inspection_forms.id 참조
  label        VARCHAR(200) NOT NULL,               -- 화면에 보일 질문 텍스트
  question_type ENUM(
     'short_answer','paragraph','multiple_choice',
     'checkbox','dropdown','file_upload',
     'linear_scale','mc_grid','cb_grid',
     'date','time'
  ) NOT NULL,                                      -- 질문 유형
  is_required  BOOLEAN NOT NULL DEFAULT FALSE,     -- 필수 여부
  sort_order   INT  NOT NULL DEFAULT 0,            -- 문항 순서 지정
  settings     JSON  NULL,                         -- 추가 옵션(e.g. 선형배율의 min/max/step)

  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (form_id) REFERENCES inspection_forms(id)
);

CREATE TABLE inspection_form_field_options (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  field_id     INT NOT NULL,                        -- inspection_form_fields.id 참조
  option_label VARCHAR(200) NOT NULL,               -- 사용자에게 보일 옵션 텍스트
  option_value VARCHAR(200) NULL,                   -- 내부 값(코드) 필요 시
  sort_order   INT NOT NULL DEFAULT 0,              -- 옵션 순서 지정

  FOREIGN KEY (field_id) REFERENCES inspection_form_fields(id)
);

CREATE TABLE form_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  form_id INT NOT NULL,
  user_id INT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES inspection_forms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE field_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  response_id INT NOT NULL,              -- form_responses.id
  field_id INT NOT NULL,                 -- inspection_form_fields.id
  option_id INT NULL,                    -- inspection_form_field_options.id (선택형)
  answer_text TEXT NULL,                 -- 주관식 응답
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (response_id) REFERENCES form_responses(id),
  FOREIGN KEY (field_id) REFERENCES inspection_form_fields(id),
  FOREIGN KEY (option_id) REFERENCES inspection_form_field_options(id)
);
