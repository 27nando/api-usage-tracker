CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE developers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usage_logs (
  id SERIAL PRIMARY KEY,
  developer_id UUID REFERENCES developers(id),
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  status_code INTEGER,
  response_time_ms INTEGER
);

CREATE TABLE usage_summary (
  id SERIAL PRIMARY KEY,
  developer_id UUID REFERENCES developers(id),
  month VARCHAR(7), -- e.g., '2025-05'
  request_count INTEGER,
  cost_estimate NUMERIC(10, 2),
  UNIQUE(developer_id, month)
);
