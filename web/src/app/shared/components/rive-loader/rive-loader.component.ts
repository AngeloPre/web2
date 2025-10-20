import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas-single';

@Component({
  selector: 'app-rive-loader',
  standalone: true,
  template: `
    <div class="rive-wrap">
      <canvas #canvas
              [style.width.px]="width"
              [style.height.px]="height"
              class="rive-canvas"></canvas>
    </div>
  `,
  styles: [`
    :host{display:block}
    .rive-wrap{display:flex;align-items:center;justify-content:center}
  `]
})
export class RiveLoaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @Input() src = 'assets/miner_loading_bar.riv';
  @Input() artboard?: string;
  @Input() stateMachine: string = 'State Machine 1';
  @Input() progressInput: string = 'Number 1'; 
  @Input() durationMs = 4000;
  @Input() from = 0;
  @Input() to = 100;
  @Input() width = 560;
  @Input() height = 160;

  private rive?: Rive;
  private rafId?: number;
  private progressRef?: any;

  ngAfterViewInit() {
    this.rive = new Rive({
      canvas: this.canvas.nativeElement,
      src: this.src,
      autoplay: true,
      artboard: this.artboard,
      stateMachines: this.stateMachine,
      layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
      onLoad: () => {
        this.rive?.resizeDrawingSurfaceToCanvas();
        const inputs = this.rive?.stateMachineInputs(this.stateMachine) ?? [];
        this.progressRef = inputs.find((i: any) => i.name === this.progressInput);
        if (this.progressRef) {
          this.progressRef.value = this.from;
          this.animateProgress(this.from, this.to, this.durationMs);
        } else {
          console.warn('[RiveLoader] input não encontrado:', this.progressInput, 'disponíveis:', inputs.map((i:any)=>i.name));
        }
      }
    });
  }

  private animateProgress(from: number, to: number, duration: number) {
    let startTs: number | null = null;
    const step = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      const value = from + (to - from) * t;
      if (this.progressRef) this.progressRef.value = value;
      this.rive?.drawFrame();
      if (t < 1) this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }
  
  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rive?.cleanup();
  }
}
