-- Medplus Franchisee Portal Database Schema
-- Version 1.0

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('franchisee', 'admin')),
  customer_id VARCHAR(100) UNIQUE,
  name VARCHAR(255) NOT NULL,
  primary_mobile VARCHAR(20),
  secondary_mobile VARCHAR(20),
  address TEXT,
  aadhar_no VARCHAR(20),
  pan_no VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id VARCHAR(100) UNIQUE NOT NULL,
  store_name VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  gst_no VARCHAR(50),
  dl_no VARCHAR(50),
  fssai_no VARCHAR(50),
  labour_license_no VARCHAR(50),
  trade_license_no VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bank accounts table
CREATE TABLE IF NOT EXISTS bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  account_type VARCHAR(20) CHECK (account_type IN ('Savings', 'Current')),
  account_no VARCHAR(50),
  bank_name VARCHAR(255),
  ifsc_code VARCHAR(20),
  branch_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Account balance table
CREATE TABLE IF NOT EXISTS account_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  account_name VARCHAR(255),
  credit_limit DECIMAL(15, 2) DEFAULT 0,
  available_credit_limit DECIMAL(15, 2) DEFAULT 0,
  current_outstanding DECIMAL(15, 2) DEFAULT 0,
  credit_period INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id VARCHAR(100) UNIQUE NOT NULL,
  web_order_id VARCHAR(100),
  sale_order_id VARCHAR(100),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(15, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  order_type VARCHAR(20) CHECK (order_type IN ('Auto', 'Manual')),
  tracking_status VARCHAR(50) DEFAULT 'order_placed',
  order_received_at TIMESTAMP,
  dispatch_at TIMESTAMP,
  replenishment_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  batch_id VARCHAR(100),
  pack_size VARCHAR(50),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Returns table
CREATE TABLE IF NOT EXISTS returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id VARCHAR(100) UNIQUE NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tax_invoice VARCHAR(100),
  created_by VARCHAR(255),
  total_amount DECIMAL(15, 2),
  received_date TIMESTAMP,
  return_note_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Return items table
CREATE TABLE IF NOT EXISTS return_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id UUID REFERENCES returns(id) ON DELETE CASCADE,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  batch_id VARCHAR(100),
  pack_size VARCHAR(50),
  exp_date DATE,
  inv_id VARCHAR(100),
  ord_id VARCHAR(100),
  price DECIMAL(10, 2),
  returned_quantity INTEGER NOT NULL,
  total DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id VARCHAR(100) UNIQUE NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  payment_type VARCHAR(100),
  payment_name VARCHAR(255),
  total_amount DECIMAL(15, 2) NOT NULL,
  remarks TEXT,
  payment_mode VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_date TIMESTAMP
);

-- Provisional indents table
CREATE TABLE IF NOT EXISTS provisional_indents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  indent_id VARCHAR(100) UNIQUE NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_value DECIMAL(15, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP
);

-- Provisional indent items table
CREATE TABLE IF NOT EXISTS provisional_indent_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  indent_id UUID REFERENCES provisional_indents(id) ON DELETE CASCADE,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id VARCHAR(100) UNIQUE NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  department VARCHAR(50) NOT NULL CHECK (department IN ('Operations', 'Warehouse', 'Infra', 'EDP', 'Accounts', 'POS', 'Supply Chain')),
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  closed_at TIMESTAMP
);

-- Complaint comments table
CREATE TABLE IF NOT EXISTS complaint_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complaint attachments table
CREATE TABLE IF NOT EXISTS complaint_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Monthly reports table
CREATE TABLE IF NOT EXISTS monthly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id VARCHAR(100) UNIQUE NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  report_name VARCHAR(255) NOT NULL,
  report_type VARCHAR(100) NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  file_type VARCHAR(10) CHECK (file_type IN ('Excel', 'PDF')),
  file_url TEXT NOT NULL,
  requires_action BOOLEAN DEFAULT false,
  action_status VARCHAR(50),
  dispatch_date DATE,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id VARCHAR(100) UNIQUE NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  invoice_type VARCHAR(50) CHECK (invoice_type IN ('order', 'membership')),
  total_amount DECIMAL(15, 2) NOT NULL,
  file_url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP
);

-- Account statements table
CREATE TABLE IF NOT EXISTS account_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  bill_id VARCHAR(100),
  bill_type VARCHAR(50) CHECK (bill_type IN ('Purchase', 'Payment')),
  amount DECIMAL(15, 2) NOT NULL,
  billing_place VARCHAR(255),
  transaction_type VARCHAR(10) CHECK (transaction_type IN ('Dr', 'Cr')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance metrics table (for reports)
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  net_sale DECIMAL(15, 2) DEFAULT 0,
  margin_amount DECIMAL(15, 2) DEFAULT 0,
  branded_sale DECIMAL(15, 2) DEFAULT 0,
  private_label_sale DECIMAL(15, 2) DEFAULT 0,
  offline_sale DECIMAL(15, 2) DEFAULT 0,
  online_sale DECIMAL(15, 2) DEFAULT 0,
  sale_orders_count INTEGER DEFAULT 0,
  web_orders_count INTEGER DEFAULT 0,
  average_bill_value DECIMAL(10, 2) DEFAULT 0,
  number_of_bills INTEGER DEFAULT 0,
  total_discount_percentage DECIMAL(5, 2) DEFAULT 0,
  bounce_products_count INTEGER DEFAULT 0,
  sku_ordered INTEGER DEFAULT 0,
  sku_replenished INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stores_user_id ON stores(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_returns_store_id ON returns(store_id);
CREATE INDEX IF NOT EXISTS idx_payments_store_id ON payments(store_id);
CREATE INDEX IF NOT EXISTS idx_complaints_store_id ON complaints(store_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_monthly_reports_store_id ON monthly_reports(store_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_store_id ON performance_metrics(store_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_date ON performance_metrics(metric_date);
