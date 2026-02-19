import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CustomNodeComponent, Vflow } from 'ngx-vflow';
import { FlowStoreService } from './flow.service';

@Component({
  template: `
    <div class="w-45 bg-card border-2 border-slate-500 rounded-lg shadow-sm overflow-hidden">
      <div class="flex items-center gap-2 px-3.5 py-3 border-b-2 border-slate-500 text-slate-500">
        <svg class="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
        <span class="text-sm font-semibold tracking-tight text-foreground">Output</span>
      </div>
      <div class="px-3.5 py-3 flex flex-col gap-2 bg-card">
        <div class="flex flex-col gap-1.5">
          <div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Size</div>
          <div class="flex items-center gap-2 px-2 py-1 bg-black/2 dark:bg-white/3 rounded text-xs">
            <span class="text-muted-foreground font-semibold min-w-4">W:</span>
            <span class="text-foreground font-mono font-medium">{{ connectedNodeWidth() }}px</span>
            <handle position="left" type="target" id="width" />
          </div>
          <div class="flex items-center gap-2 px-2 py-1 bg-black/2 dark:bg-white/3 rounded text-xs">
            <span class="text-muted-foreground font-semibold min-w-4">H:</span>
            <span class="text-foreground font-mono font-medium">{{ connectedNodeHeight() }}px</span>
            <handle position="left" type="target" id="height" />
          </div>
        </div>

        <div class="h-px bg-border my-1"></div>

        <div class="flex flex-col gap-1.5">
          <div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Position</div>
          <div class="flex items-center gap-2 px-2 py-1 bg-black/2 dark:bg-white/3 rounded text-xs">
            <span class="text-muted-foreground font-semibold min-w-4">X:</span>
            <span class="text-foreground font-mono font-medium">{{ connectedNodeX() }}</span>
            <handle position="left" type="target" id="x" />
          </div>
          <div class="flex items-center gap-2 px-2 py-1 bg-black/2 dark:bg-white/3 rounded text-xs">
            <span class="text-muted-foreground font-semibold min-w-4">Y:</span>
            <span class="text-foreground font-mono font-medium">{{ connectedNodeY() }}</span>
            <handle position="left" type="target" id="y" />
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Vflow],
})
export class OutputNodeComponent extends CustomNodeComponent {
  public store = inject(FlowStoreService);

  public connectedNodeWidth = computed(() => {
    const edge =
      this.store.edges().find((edge) => edge.target === this.node().id && edge.targetHandle === 'width') ?? null;
    const sourceNode = edge ? this.store.nodes().find((node) => node.id === edge?.source) : null;
    return Math.floor(sourceNode?.width?.() ?? 0);
  });

  public connectedNodeHeight = computed(() => {
    const edge =
      this.store.edges().find((edge) => edge.target === this.node().id && edge.targetHandle === 'height') ?? null;
    const sourceNode = edge ? this.store.nodes().find((node) => node.id === edge?.source) : null;
    return Math.floor(sourceNode?.height?.() ?? 0);
  });

  public connectedNodeX = computed(() => {
    const edge = this.store.edges().find((edge) => edge.target === this.node().id && edge.targetHandle === 'x') ?? null;
    const sourceNode = edge ? this.store.nodes().find((node) => node.id === edge?.source) : null;
    return Math.floor(sourceNode?.point().x ?? 0);
  });

  public connectedNodeY = computed(() => {
    const edge = this.store.edges().find((edge) => edge.target === this.node().id && edge.targetHandle === 'y') ?? null;
    const sourceNode = edge ? this.store.nodes().find((node) => node.id === edge?.source) : null;
    return Math.floor(sourceNode?.point().y ?? 0);
  });
}
