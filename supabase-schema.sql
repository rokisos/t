-- Création des tables pour la plateforme de transport

-- Table des profils utilisateurs
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'transporter')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des transporteurs
CREATE TABLE transporters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_phone TEXT,
    coverage_zones TEXT[] DEFAULT '{}',
    vehicle_types TEXT[] DEFAULT '{}',
    response_delay_hours INTEGER DEFAULT 2,
    is_active BOOLEAN DEFAULT true,
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des demandes de transport
CREATE TABLE transport_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    assigned_transporter_id UUID REFERENCES transporters(id),
    pickup_address TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    contact_name TEXT,
    contact_phone TEXT,
    request_date TIMESTAMP WITH TIME ZONE NOT NULL,
    goods_description TEXT,
    total_weight DECIMAL(10,2),
    price_ht DECIMAL(10,2),
    special_instructions TEXT,
    status TEXT CHECK (status IN ('pending', 'accepted', 'refused', 'completed', 'cancelled')) DEFAULT 'pending',
    response_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des réponses des transporteurs
CREATE TABLE transport_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID REFERENCES transport_requests(id) ON DELETE CASCADE,
    transporter_id UUID REFERENCES transporters(id) ON DELETE CASCADE,
    response_type TEXT CHECK (response_type IN ('accepted', 'refused', 'delay_request')) NOT NULL,
    scheduled_date TIMESTAMP WITH TIME ZONE,
    refusal_reason TEXT,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des logs de scan email
CREATE TABLE email_scan_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_subject TEXT NOT NULL,
    email_sender TEXT NOT NULL,
    email_received_at TIMESTAMP WITH TIME ZONE NOT NULL,
    scan_status TEXT CHECK (scan_status IN ('pending', 'processed', 'failed')) DEFAULT 'pending',
    extracted_data JSONB,
    error_message TEXT,
    created_request_id UUID REFERENCES transport_requests(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des notifications
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('info', 'warning', 'error', 'success')) DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    related_request_id UUID REFERENCES transport_requests(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes pour optimiser les performances
CREATE INDEX idx_transport_requests_status ON transport_requests(status);
CREATE INDEX idx_transport_requests_assigned_transporter ON transport_requests(assigned_transporter_id);
CREATE INDEX idx_transport_requests_deadline ON transport_requests(response_deadline);
CREATE INDEX idx_transport_responses_request ON transport_responses(request_id);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_email_scan_logs_status ON email_scan_logs(scan_status);

-- Triggers pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transporters_updated_at BEFORE UPDATE ON transporters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transport_requests_updated_at BEFORE UPDATE ON transport_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role)
    VALUES (NEW.id, NEW.email, 'transporter');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un profil
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Politiques de sécurité RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Politique pour les profils
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Politique pour les transporteurs
CREATE POLICY "Transporters can view own data" ON transporters
    FOR SELECT USING (
        profile_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Politique pour les demandes de transport
CREATE POLICY "View transport requests" ON transport_requests
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') OR
        assigned_transporter_id IN (SELECT id FROM transporters WHERE profile_id = auth.uid())
    );

-- Politique pour les réponses
CREATE POLICY "Transporters can manage own responses" ON transport_responses
    FOR ALL USING (
        transporter_id IN (SELECT id FROM transporters WHERE profile_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Politique pour les notifications
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

-- Données de test
INSERT INTO profiles (id, email, full_name, role) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'admin@transportpro.com', 'Administrateur Principal', 'admin'),
    ('550e8400-e29b-41d4-a716-446655440001', 'transporteur1@example.com', 'TRADIFRET SARL', 'transporter'),
    ('550e8400-e29b-41d4-a716-446655440002', 'transporteur2@example.com', 'EXPRESS PLUS', 'transporter');

INSERT INTO transporters (profile_id, company_name, contact_phone, coverage_zones, vehicle_types, response_delay_hours, rating) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'TRADIFRET SARL', '01 23 45 67 89', ARRAY['Paris', 'Lyon', 'Marseille'], ARRAY['Camion 3.5T', 'Camion 7.5T'], 2, 4.7),
    ('550e8400-e29b-41d4-a716-446655440002', 'EXPRESS PLUS', '01 98 76 54 32', ARRAY['Paris', 'Bordeaux', 'Toulouse'], ARRAY['Camion 3.5T', 'Fourgon'], 4, 4.2);

-- Données de test pour les demandes
INSERT INTO transport_requests (order_number, assigned_transporter_id, pickup_address, delivery_address, contact_name, contact_phone, request_date, goods_description, total_weight, price_ht, status, response_deadline) VALUES
    ('TR-2024-001', (SELECT id FROM transporters WHERE company_name = 'TRADIFRET SARL'), '123 Rue de la Paix, Paris 75001', '456 Avenue des Champs, Lyon 69000', 'Jean Dupont', '06 12 34 56 78', NOW(), 'Matériel informatique', 150.00, 450.00, 'pending', NOW() + INTERVAL '2 hours'),
    ('TR-2024-002', (SELECT id FROM transporters WHERE company_name = 'EXPRESS PLUS'), '789 Boulevard Saint-Germain, Paris 75006', '321 Rue de la République, Marseille 13000', 'Marie Martin', '06 98 76 54 32', NOW() - INTERVAL '1 hour', 'Documents confidentiels', 5.00, 120.00, 'accepted', NOW() + INTERVAL '1 hour');