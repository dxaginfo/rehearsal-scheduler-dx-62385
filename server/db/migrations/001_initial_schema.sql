-- Initial Database Schema for Rehearsal Scheduler

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Bands Table
CREATE TABLE IF NOT EXISTS bands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Band Members Table
CREATE TABLE IF NOT EXISTS band_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  band_id UUID REFERENCES bands(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('leader', 'member', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive')),
  UNIQUE (band_id, user_id)
);

-- Availability Table (for recurring weekly availability)
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME WITHOUT TIME ZONE NOT NULL,
  end_time TIME WITHOUT TIME ZONE NOT NULL,
  recurring BOOLEAN NOT NULL DEFAULT true
);

-- Special Availability Table (for one-time availability exceptions)
CREATE TABLE IF NOT EXISTS special_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME WITHOUT TIME ZONE NOT NULL,
  end_time TIME WITHOUT TIME ZONE NOT NULL,
  is_available BOOLEAN NOT NULL,
  note TEXT
);

-- Rehearsals Table
CREATE TABLE IF NOT EXISTS rehearsals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  band_id UUID REFERENCES bands(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Rehearsal Attendance Table
CREATE TABLE IF NOT EXISTS rehearsal_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rehearsal_id UUID REFERENCES rehearsals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('attending', 'not_attending', 'maybe')),
  note TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE (rehearsal_id, user_id)
);

-- Rehearsal Attachments Table
CREATE TABLE IF NOT EXISTS rehearsal_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rehearsal_id UUID REFERENCES rehearsals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  rehearsal_id UUID REFERENCES rehearsals(id) ON DELETE CASCADE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create indexes for common lookups
CREATE INDEX idx_band_members_band_id ON band_members(band_id);
CREATE INDEX idx_band_members_user_id ON band_members(user_id);
CREATE INDEX idx_availability_user_id ON availability(user_id);
CREATE INDEX idx_special_availability_user_id ON special_availability(user_id);
CREATE INDEX idx_special_availability_date ON special_availability(date);
CREATE INDEX idx_rehearsals_band_id ON rehearsals(band_id);
CREATE INDEX idx_rehearsals_start_time ON rehearsals(start_time);
CREATE INDEX idx_rehearsal_attendance_rehearsal_id ON rehearsal_attendance(rehearsal_id);
CREATE INDEX idx_rehearsal_attendance_user_id ON rehearsal_attendance(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);