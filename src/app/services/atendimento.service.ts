import { Injectable } from '@angular/core';

export interface Beneficiario {
  id: string;
  nome_responsavel: string;
  cpf: string;
  ativo: boolean;
}

export interface ItemEstoque {
  id: string;
  item: string;
  data_validade: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  // RF01: Busca textual rápida apenas em beneficiários ativos
  filtrarBeneficiariosAtivos(lista: Beneficiario[], termo: string): Beneficiario[] {
    const busca = termo.trim().toLowerCase();
    if (!busca) return [];
    return lista.filter(b => b.ativo && (b.nome_responsavel.toLowerCase().includes(busca) || b.cpf.includes(busca)));
  }

  // RF02: Verificação de bloqueio de duplicidade no mês civil corrente
  validarElegibilidadeMensal(entregasNoMes: string[], beneficiarioId: string): boolean {
    return !entregasNoMes.includes(beneficiarioId);
  }

  // RF03: Ordenação de estoque pelo método FIFO (First-In, First-Out)
  ordenarEstoqueFIFO(itens: ItemEstoque[]): ItemEstoque[] {
    return [...itens].sort((a, b) => new Date(a.data_validade).getTime() - new Date(b.data_validade).getTime());
  }
}
