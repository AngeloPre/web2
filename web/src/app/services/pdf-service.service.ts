import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfServiceService {
  relatorioPorTempo(): Array<string> {
    return new Array<string>(
      'Dia 11/09/2025 - Receita: R$200',
      'Dia 12/09/2025 - Receita: R$300',
      'Dia 13/09/2025 - Receita: R$400',
      'Dia 17/09/2025 - Receita: R$2000'
    );
  }

  relatorioPorCategoria(): Array<string> {
    return new Array<string>(
      'Mouse - Receita: R$200',
      'Teclado - Receita: R$300',
      'Computador - Receita: R$400',
      'Notebook - Receita: R$2000',
      'Impressora - Receita: R$100'
    );
  }

  gerarPDF(
    tipo: 'Periodo' | 'Categoria',
    data_inicio?: string,
    data_fim?: string,
    categorias?: string[]
  ) {
    const doc = new jsPDF();
    const data = new Date().toLocaleDateString('pt-BR');
    let y_doc = 20;

    doc.text(`Relatório por ${tipo}`, 10, y_doc);

    doc.text(`Gerado em: ${data}`, 10, (y_doc += 10));

    if (tipo === 'Periodo') {
      doc.text('Perído do Relatório:', 10, (y_doc += 10));
      if (data_inicio) {
        doc.text(`Data início: ${data_inicio}`, 10, (y_doc += 10));
      }
      if (data_fim) {
        doc.text(`Data fim: ${data_fim}`, 10, (y_doc += 10));
      } else if (!data_inicio) {
        doc.text('Desde o início', 10, (y_doc += 10));
      }
      this.relatorioPorTempo().forEach((item) =>
        doc.text(item, 10, (y_doc += 10))
      );
    } else if (categorias) {
      doc.text('Categorias:', 10, (y_doc += 10));
      categorias.forEach((cat) => (cat ? doc.text(cat, 10, (y_doc += 5)) : ''));
      this.relatorioPorCategoria().forEach((item) =>
        doc.text(item, 10, (y_doc += 10))
      );
    }
    doc.save('Relatorio.pdf');
  }

  constructor() {}
}
