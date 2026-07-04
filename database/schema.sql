-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Database: MySQL 8.x
-- ============================================================

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- -------------------------------------------------------
-- PROFILE
-- -------------------------------------------------------
CREATE TABLE profile (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    role        VARCHAR(100) NOT NULL,
    tagline     TEXT,
    bio         TEXT,
    email       VARCHAR(150) NOT NULL,
    phone       VARCHAR(30),
    location    VARCHAR(100),
    github_url  VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    resume_url  VARCHAR(255),
    avatar_url  VARCHAR(255),
    years_experience INT DEFAULT 0,
    projects_count   INT DEFAULT 0,
    clients_count    INT DEFAULT 0,
    github_stars     VARCHAR(20),
    available_for_work BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- SKILLS
-- -------------------------------------------------------
CREATE TABLE skill_category (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(80) NOT NULL,
    icon     VARCHAR(20),
    color    VARCHAR(20),
    sort_order INT DEFAULT 0
);

CREATE TABLE skill (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id      BIGINT NOT NULL,
    name             VARCHAR(100) NOT NULL,
    proficiency      INT NOT NULL CHECK (proficiency BETWEEN 0 AND 100),
    sort_order       INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES skill_category(id) ON DELETE CASCADE
);

-- -------------------------------------------------------
-- PROJECTS
-- -------------------------------------------------------
CREATE TABLE project (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(150) NOT NULL,
    subtitle     VARCHAR(100),
    description  TEXT,
    icon         VARCHAR(20),
    accent_color VARCHAR(20),
    live_url     VARCHAR(255),
    github_url   VARCHAR(255),
    case_study_url VARCHAR(255),
    featured     BOOLEAN DEFAULT FALSE,
    sort_order   INT DEFAULT 0,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_tag (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    tag        VARCHAR(60) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE project_metric (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    metric     VARCHAR(100) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

-- -------------------------------------------------------
-- EXPERIENCE
-- -------------------------------------------------------
CREATE TABLE experience (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    role        VARCHAR(150) NOT NULL,
    company     VARCHAR(150) NOT NULL,
    employment_type VARCHAR(50) DEFAULT 'Full-time',
    period_start DATE NOT NULL,
    period_end   DATE,
    is_current   BOOLEAN DEFAULT FALSE,
    description  TEXT,
    sort_order   INT DEFAULT 0
);

CREATE TABLE experience_tag (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    experience_id BIGINT NOT NULL,
    tag           VARCHAR(60) NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES experience(id) ON DELETE CASCADE
);

-- -------------------------------------------------------
-- CONTACT MESSAGES
-- -------------------------------------------------------
CREATE TABLE contact_message (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    subject    VARCHAR(200),
    message    TEXT NOT NULL,
    is_read    BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- SEED DATA
-- -------------------------------------------------------
INSERT INTO profile (full_name, role, tagline, bio, email, phone, location,
    github_url, linkedin_url, twitter_url, resume_url,
    years_experience, projects_count, clients_count, github_stars, available_for_work)
VALUES (
    'Your Name',
    'Full-Stack Developer',
    'Building scalable web applications with React, Angular & Spring Boot',
    'I craft high-performance web applications from pixel-perfect frontends to robust backend systems. Passionate about clean architecture, developer experience, and pushing the web forward.',
    'you@email.com', '+91 9876543210', 'Bengaluru, India',
    'https://github.com/yourhandle',
    'https://linkedin.com/in/yourhandle',
    'https://twitter.com/yourhandle',
    '/resume.pdf',
    5, 30, 15, '3.5K', TRUE
);

INSERT INTO skill_category (name, icon, color, sort_order) VALUES
('Frontend',        '◈', '#e11d48', 1),
('Backend',         '◇', '#0ea5e9', 2),
('Data & Cloud',    '○', '#a855f7', 3),
('Tools & Practices','◉','#10b981', 4);

INSERT INTO skill (category_id, name, proficiency, sort_order) VALUES
(1, 'React / Next.js',     95, 1),
(1, 'Angular',             88, 2),
(1, 'TypeScript',          92, 3),
(1, 'Tailwind / SCSS',     90, 4),
(2, 'Node.js / Express',   90, 1),
(2, 'Java Spring Boot',    87, 2),
(2, 'Python / FastAPI',    80, 3),
(2, 'GraphQL / REST',      85, 4),
(3, 'MySQL / PostgreSQL',  88, 1),
(3, 'MongoDB / Redis',     80, 2),
(3, 'AWS / GCP',           82, 3),
(3, 'Docker / Kubernetes', 80, 4),
(4, 'CI/CD Pipelines',     88, 1),
(4, 'TDD / Testing',       85, 2),
(4, 'System Design',       83, 3),
(4, 'Agile / Scrum',       90, 4);

INSERT INTO project (title, subtitle, description, icon, accent_color, live_url, github_url, featured, sort_order) VALUES
('Nexus Platform',  'Enterprise SaaS',        'A full-featured project management SaaS built with Angular 17 and Spring Boot. Features real-time collaboration, custom workflow automation, and AI-assisted sprint planning.',  '⬡', '#e11d48', 'https://nexus.demo', 'https://github.com', TRUE, 1),
('StreamGraph',     'Data Visualization',     'Real-time analytics dashboard built with React and D3.js. Processes 1M+ events/day with sub-100ms query latency using MySQL and Redis under the hood.',                         '◈', '#0ea5e9', 'https://streamgraph.demo', 'https://github.com', TRUE, 2),
('CodeForge CLI',   'Open Source Tool',       'A developer CLI tool written in Node.js that scaffolds production-ready Angular and React projects with best practices baked in. 3.5K+ GitHub stars.',                         '◇', '#a855f7', NULL, 'https://github.com', TRUE, 3),
('PulseAPI',        'Backend Infrastructure', 'High-performance REST + GraphQL API gateway built with Spring Boot, MySQL, and Redis. Rate limiting, JWT auth, caching, and observability built in.',                          '○', '#10b981', 'https://pulseapi.demo', 'https://github.com', TRUE, 4);

INSERT INTO project_tag (project_id, tag) VALUES
(1,'Angular'),(1,'Spring Boot'),(1,'MySQL'),(1,'WebSockets'),(1,'OpenAI'),
(2,'React'),(2,'D3.js'),(2,'MySQL'),(2,'Kafka'),(2,'Redis'),
(3,'Node.js'),(3,'TypeScript'),(3,'Commander.js'),(3,'Handlebars'),
(4,'Spring Boot'),(4,'MySQL'),(4,'GraphQL'),(4,'Redis'),(4,'JWT');

INSERT INTO project_metric (project_id, metric) VALUES
(1,'50K+ users'),(1,'99.9% uptime'),(1,'<80ms p95'),
(2,'1M+ events/day'),(2,'<100ms queries'),(2,'12 chart types'),
(3,'3.5K GitHub stars'),(3,'200+ weekly downloads'),(3,'MIT License'),
(4,'3 prod apps'),(4,'10K+ req/sec'),(4,'<5ms latency');

INSERT INTO experience (role, company, employment_type, period_start, is_current, description, sort_order) VALUES
('Senior Software Engineer', 'Your Company',  'Full-time', '2023-01-01', TRUE,  'Architecting micro-frontend systems in Angular and React. Leading a team of 5 engineers, establishing code quality standards, and delivering core product features at scale.', 1),
('Full-Stack Developer',     'Prev Company',  'Full-time', '2021-06-01', FALSE, 'Built customer-facing SaaS products end-to-end. Reduced bundle size by 45%, improved LCP by 60%, and shipped features that grew user retention by 30%.', 2),
('Frontend Engineer',        'Tech Startup',  'Full-time', '2020-03-01', FALSE, 'Developed shared Angular component library used across 4 products. Worked closely with product and design to ship pixel-perfect accessible UIs.', 3);

INSERT INTO experience_tag (experience_id, tag) VALUES
(1,'Angular'),(1,'React'),(1,'Spring Boot'),(1,'MySQL'),(1,'AWS'),
(2,'React'),(2,'Node.js'),(2,'PostgreSQL'),(2,'Docker'),
(3,'Angular'),(3,'TypeScript'),(3,'SCSS'),(3,'Storybook');
