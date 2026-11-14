-- Estrutura Inicial do Banco de Dados (PostgreSQL / Supabase)
-- Projeto: Cozinha Solidária "Pão Nosso" - MVP

CREATE TABLE beneficiario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_responsavel VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    endereco TEXT NOT NULL,
    qtd_familiares INT NOT NULL DEFAULT 1,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE estoque_alimentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade >= 0),
    data_validade DATE NOT NULL,
    entrada_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE registro_entrega (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiario_id UUID NOT NULL REFERENCES beneficiario(id),
    mes_referencia INT NOT NULL CHECK (mes_referencia BETWEEN 1 AND 12),
    ano_referencia INT NOT NULL,
    data_entrega TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Trava de banco contra duplicidade mensal (RF02)
    CONSTRAINT uk_entrega_mensal UNIQUE (beneficiario_id, mes_referencia, ano_referencia)
);

-- Habilitando Row Level Security (RNF02 - OWASP Broken Access Control)
ALTER TABLE beneficiario ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque_alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE registro_entrega ENABLE ROW LEVEL SECURITY;
