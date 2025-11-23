import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import { API_URL } from '@/environment/env';
import autoTable from 'jspdf-autotable';
import { PDF_FONTS } from './pdf-fonts';
import { firstValueFrom } from 'rxjs';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

interface RelatorioDTO {
  tipo: string;
  totalChamados: number;
  totalFinalizados: number;
  receitaTotal: number;
  ticketMedio: number;
  detalhes: RelatorioDetalhe[];
}

interface RelatorioDetalhe {
  chave: string;
  chamados: number;
  finalizados: number;
  receita: number;
  taxaConversao: number;
  ticketMedio: number;
}

@Injectable({ providedIn: 'root' })
export class RelatorioService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = `${API_URL}/relatorios`;
  private readonly cores = {
    brandDark: [220, 38, 38] as [number, number, number],
    brandBase: [251, 146, 60] as [number, number, number],
    brandLight: [254, 215, 170] as [number, number, number],
    darkGray: [55, 65, 81] as [number, number, number],
    steelGray: [107, 114, 128] as [number, number, number],
    white: [255, 255, 255] as [number, number, number],
    lightGray: [249, 250, 251] as [number, number, number],
    mediumGray: [156, 163, 175] as [number, number, number],
    textPrimary: [31, 41, 55] as [number, number, number],
  };

  private readonly logoPath = 'assets/logo.png';

  constructor() {}

  private async loadImage(path: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(''); // ERROR -> VAZIO
      img.src = path;
    });
  }

  private formatDateForApi(date?: string): string | null {
    if (!date) return null;
    return date;
  }

  async gerarPDF(
    tipo: 'Periodo' | 'Categoria',
    data_inicio?: string,
    data_fim?: string,
  ): Promise<void> {
    try {
      // BATER NO ENDPOINT DO RELATÓRIO
      const params: any = {
        tipo: tipo.toUpperCase()
      };
      
      if (data_inicio) params.dataInicio = this.formatDateForApi(data_inicio);
      if (data_fim) params.dataFim = this.formatDateForApi(data_fim);
      
      const relatorioData = await firstValueFrom(
        this.http.get<RelatorioDTO>(this.BASE_URL, { params })
      );
      const doc = new jsPDF('p', 'mm', 'a4');
      const margin = { top: 25, right: 15, bottom: 25, left: 15 };
      // FONTES DA LOGO
      doc.addFileToVFS('Cinzel-SemiBold.ttf', PDF_FONTS.CINZEL_SEMIBOLD);
      doc.addFont('Cinzel-SemiBold.ttf', 'Cinzel', 'semibold');
      doc.addFileToVFS('Orbitron-Medium.ttf', PDF_FONTS.ORBITRON_MEDIUM);
      doc.addFont('Orbitron-Medium.ttf', 'Orbitron', 'medium');

      const phoenixLogo = await this.loadImage(this.logoPath);

      this.adicionarCabecalho(doc, tipo, phoenixLogo);

      // INFORMAÇÕES GERAIS (PERIODO OU CATEGORIA)
      let yPosition = 50;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...this.cores.textPrimary);

      const dataGeracao = new Date().toLocaleDateString('pt-BR');
      doc.text(`Gerado em: ${dataGeracao}`, margin.left, yPosition);
      yPosition += 8;

      if (tipo === 'Periodo') {
        if (data_inicio || data_fim) {
          const periodo = `${data_inicio || 'Início'} até ${data_fim || 'Hoje'}`;
          doc.text(`Período do Relatório: ${periodo}`, margin.left, yPosition);
        } else {
          doc.text('Período do Relatório: Todo o período', margin.left, yPosition);
        }
        yPosition += 10;

        // VALORES AGREGADOS
        this.adicionarResumoKPI(doc, relatorioData, yPosition);
        yPosition += 70;

        // TABELA
        this.adicionarTabelaPeriodo(doc, relatorioData, yPosition, phoenixLogo);
      } else {
        doc.text('Categorias: Todas as categorias', margin.left, yPosition);
        yPosition += 10;

        // VALORES AGREGADOS
        this.adicionarResumoKPI(doc, relatorioData, yPosition);
        yPosition += 70;

        // TABELA
        this.adicionarTabelaCategoria(doc, relatorioData, yPosition, phoenixLogo);
      }

      // RODAPÉ
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        this.adicionarRodape(doc, i, totalPages);
      }

      // Salvar o PDF
      const nomeArquivo = `Phoenix_LAB_Relatorio_${tipo}_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(nomeArquivo);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o relatório. Por favor, tente novamente.');
    }
  }

  private adicionarCabecalho(doc: jsPDF, tipo: string, phoenixLogo?: string): void {
    const pageWidth = 210;
    
    // COR CABEÇALHO
    doc.setFillColor(...this.cores.lightGray);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // LOGO
    if (phoenixLogo) {
      doc.addImage(phoenixLogo, 'PNG', 15, 14, 12, 12);
    }

    // TEXTO LOGO
    doc.setFont('Cinzel', 'semibold');
    doc.setFontSize(20);
    doc.setTextColor(...this.cores.brandBase);
    doc.text('Phoenix', phoenixLogo ? 30 : 15, 20);
    
    doc.setFont('Orbitron', 'medium');
    doc.setFontSize(20);
    const phoenixWidth = doc.getTextWidth('Phoenix ');
    doc.text('LAB', (phoenixLogo ? 30 : 15) + phoenixWidth - 1, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...this.cores.steelGray);
    doc.text('Relatório de Earnings - Q4 2025', phoenixLogo ? 30 : 15, 25);

    // LINHA
    doc.setDrawColor(...this.cores.brandBase);
    doc.setLineWidth(0.5);
    doc.line(0, 39, pageWidth, 39);

    // TIPO DE RELATORIO
    const boxWidth = 40;
    doc.setFillColor(...this.cores.brandBase);
    doc.rect(pageWidth - 50, 12, boxWidth, 14, 'F');
    doc.setTextColor(...this.cores.white);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(tipo === 'Periodo' ? 'PERÍODO' : tipo.toUpperCase(), pageWidth - 50 + (boxWidth / 2), 20, { align: 'center' });
  }

  private adicionarResumoKPI(
    doc: jsPDF,
    dados: RelatorioDTO,
    yPosition: number
  ): void {
    const pageWidth = 210;
    const cardWidth = 85;
    const cardHeight = 25;
    const margin = 15;

    const cards = [
      { titulo: 'CHAMADOS', valor: dados.totalChamados.toString(), cor: this.cores.darkGray },
      { titulo: 'FINALIZADOS', valor: dados.totalFinalizados.toString(), cor: this.cores.brandBase },
      { titulo: 'RECEITA TOTAL', valor: `R$ ${dados.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, cor: this.cores.brandBase },
      { titulo: 'TICKET MÉDIO', valor: `R$ ${dados.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, cor: this.cores.darkGray }
    ];

    // SESSÂO RESUMO EXECUTIVO
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...this.cores.darkGray);
    doc.text('RESUMO EXECUTIVO', margin, yPosition);

    // CARDS
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      const x = margin + col * (cardWidth + 10);
      const y = yPosition + 8 + row * (cardHeight + 5);

      // BORDA
      doc.setDrawColor(...card.cor);
      doc.setLineWidth(0.5);
      doc.rect(x, y, cardWidth, cardHeight);

      // TITULO
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...this.cores.darkGray);
      doc.text(card.titulo, x + 5, y + 8);

      // VALOR
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...card.cor);
      doc.text(card.valor, x + 5, y + 18);
    });
  }

  // https://codepen.io/mmghv/pen/eYYvQqO
  private enhanceWordBreak = ({ doc, cell, column }: any) => {
    if (!cell || typeof cell.styles.cellWidth === 'number' || !cell.raw || cell.colSpan > 1) {
      return;
    }

    let text: string;
    
    if (cell.raw instanceof Node) {
      text = (cell.raw as any).innerText || '';
    } else if (typeof cell.raw === 'object') {
      return;
    } else {
      text = String(cell.raw);
    }

    const words = text.split(/\s+/);
    
    const maxWordUnitWidth = words
      .map(word => Math.floor(doc.getStringUnitWidth(word) * 100) / 100)
      .reduce((max, width) => Math.max(max, width), 0);
    
    const maxWordWidth = maxWordUnitWidth * (cell.styles.fontSize / doc.internal.scaleFactor);
    const minWidth = cell.padding('horizontal') + maxWordWidth;
    
    // ATUALIZAR LARGURA CAMPOS DA TABELA
    if (minWidth > cell.minWidth) {
      cell.minWidth = minWidth;
    }
    if (cell.minWidth > cell.wrappedWidth) {
      cell.wrappedWidth = cell.minWidth;
    }
    if (cell.minWidth > column.minWidth) {
      column.minWidth = cell.minWidth;
    }
    if (column.minWidth > column.wrappedWidth) {
      column.wrappedWidth = column.minWidth;
    }
  }

  private adicionarTabelaPeriodo(doc: jsPDF, relatorio: RelatorioDTO, startY: number, phoenixLogo?: string): void {
    const head = [['Data', 'Chamados', 'Finalizados', 'Receita (R$)', 'Taxa de Conversão']];
    const body = relatorio.detalhes.map(d => {
      // FORMATAR DATA
      const [year, month, day] = d.chave.split('-');
      const dataFormatada = `${day}/${month}/${year}`;
      
      return [
        dataFormatada,
        d.chamados.toString(),
        d.finalizados.toString(),
        d.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
        `${(d.taxaConversao * 100).toFixed(1)}%`
      ];
    });

    autoTable(doc, {
      startY,
      head,
      body,
      theme: 'grid',
      headStyles: {
        fillColor: this.cores.brandDark,
        textColor: this.cores.white,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: this.cores.darkGray
      },
      alternateRowStyles: {
        fillColor: [252, 241, 236]
      },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 4,
        lineColor: this.cores.brandLight,
        lineWidth: 0.1,
        overflow: 'linebreak',
        cellWidth: 'auto',
        halign: 'left'
      },
      // MARGENS 
      margin: { 
        left: 15, 
        right: 15,
        top: 45,
        bottom: 30
      },
      didParseCell: this.enhanceWordBreak,
      // CABEÇALHO PARA NOVA PAGINA
      didDrawPage: (data: any) => {
        if (data.pageCount > 1) {
          this.adicionarCabecalho(doc, 'Periodo', phoenixLogo);
        }
      },
      pageBreak: 'auto',
      showHead: 'everyPage'
    });
  }

  private adicionarTabelaCategoria(doc: jsPDF, relatorio: RelatorioDTO, startY: number, phoenixLogo?: string): void {
    const head = [['Categoria', 'Chamados', 'Finalizados', 'Receita (R$)', 'Ticket Médio (R$)', 'Participação']];
    const body = relatorio.detalhes.map(d => {
      // RECEITA TOTAL POR CATEGORIA
      const participacao = relatorio.receitaTotal > 0 ? 
        (d.receita / relatorio.receitaTotal) : 0;
      
      return [
        d.chave,
        d.chamados.toString(),
        d.finalizados.toString(),
        d.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
        d.ticketMedio ? d.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00',
        `${(participacao * 100).toFixed(1)}%`
      ];
    });

    autoTable(doc, {
      startY,
      head,
      body,
      theme: 'grid',
      headStyles: {
        fillColor: this.cores.brandBase,
        textColor: this.cores.white,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: this.cores.darkGray
      },
      alternateRowStyles: {
        fillColor: [255, 247, 241]
      },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 4,
        lineColor: this.cores.brandLight,
        lineWidth: 0.1,
        overflow: 'linebreak',
        cellWidth: 'auto',
        halign: 'left'
      },
      margin: { 
        left: 15, 
        right: 15,
        top: 45,
        bottom: 30
      },
      didParseCell: this.enhanceWordBreak,
      // CABEÇALHO PARA NOVA PAGINA
      didDrawPage: (data: any) => {
        if (data.pageCount > 1) {
          this.adicionarCabecalho(doc, 'Categoria', phoenixLogo);
        }
      },
      pageBreak: 'auto',
      showHead: 'everyPage'
    });
  }

  private adicionarRodape(doc: jsPDF, paginaAtual: number, totalPaginas: number): void {
    const pageWidth = 210;
    const pageHeight = 297;

    // RODAPÉ LINHA
    doc.setDrawColor(...this.cores.brandLight);
    doc.setLineWidth(0.5);
    doc.line(15, pageHeight - 20, pageWidth - 15, pageHeight - 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...this.cores.steelGray);
    doc.text(`Página ${paginaAtual} de ${totalPaginas}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    doc.text('Phoenix LAB © 2025', 15, pageHeight - 10);
    
    doc.text('Confidencial', pageWidth - 15, pageHeight - 10, { align: 'right' });
  }
}