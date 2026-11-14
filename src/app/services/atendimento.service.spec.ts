import { AtendimentoService, Beneficiario, ItemEstoque } from './atendimento.service';

describe('AtendimentoService (Validação de Regras do MVP)', () => {
  let service: AtendimentoService;

  beforeEach(() => {
    service = new AtendimentoService();
  });

  it('deve filtrar apenas beneficiários com status ativo (RF01)', () => {
    const base: Beneficiario[] = [
      { id: '1', nome_responsavel: 'Maria da Silva', cpf: '123.456.789-00', ativo: true },
      { id: '2', nome_responsavel: 'João Santos', cpf: '987.654.321-11', ativo: false }
    ];
    const resultado = service.filtrarBeneficiariosAtivos(base, 'a');
    expect(resultado.length).toBe(1);
    expect(resultado[0].nome_responsavel).toBe('Maria da Silva');
  });

  it('deve bloquear segunda retirada no mesmo mês para o mesmo beneficiário (RF02)', () => {
    const entregasMesAtual = ['1'];
    expect(service.validarElegibilidadeMensal(entregasMesAtual, '1')).toBeFalse();
    expect(service.validarElegibilidadeMensal(entregasMesAtual, '2')).toBeTrue();
  });

  it('deve priorizar itens com data de validade mais próxima no método FIFO (RF03)', () => {
    const estoque: ItemEstoque[] = [
      { id: '10', item: 'Feijão Carioca', data_validade: '2026-11-30', quantidade: 20 },
      { id: '11', item: 'Arroz Tipo 1', data_validade: '2026-11-15', quantidade: 15 }
    ];
    const ordenado = service.ordenarEstoqueFIFO(estoque);
    expect(ordenado[0].item).toBe('Arroz Tipo 1');
  });
});
