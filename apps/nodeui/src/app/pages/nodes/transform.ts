import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CustomNodeComponent, Node, Vflow } from 'ngx-vflow';

@Component({
  template: `
    <div class="min-w-60 min-h-80 w-full h-full bg-card border-2 border-amber-500 rounded-lg shadow-sm overflow-hidden flex flex-col"
      selectable [resizable]="selected()">
      <div class="flex items-center gap-2 px-3.5 py-3 border-b-2 border-amber-500 text-amber-500">
        <svg class="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 8H8M8 8L5 5M8 8L5 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M14 8H8M8 8L11 5M8 8L11 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <span class="text-sm font-semibold tracking-tight text-foreground">Click to Resize</span>
      </div>
      <div class="flex-1 px-3.5 py-3 flex flex-col justify-evenly gap-3 bg-card">
        <div class="p-2.5 bg-black/2 dark:bg-white/3 rounded-md border border-border">
          <div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Input</div>
          <div class="text-xs text-foreground font-mono">You can attach handle to content inside node</div>
          <handle type="target" position="left" id="input-1" />
        </div>
        <div class="flex items-center justify-center py-2 text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2V10M6 10L9 7M6 10L3 7"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <div class="p-2.5 bg-black/2 dark:bg-white/3 rounded-md border border-border">
          <div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Output</div>
          <div class="text-xs text-foreground font-mono">You can attach handle to content inside node</div>
          <handle type="source" position="right" id="output-1" />
        </div>
      </div>
    </div>

    <node-toolbar position="top">
      <div class="flex gap-1 bg-card border border-border p-1 rounded-md shadow-sm">
        <button
          class="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-foreground cursor-pointer transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/8 dark:active:bg-white/8"
          (click)="deleted.emit(node())">
          Delete
        </button>
      </div>
    </node-toolbar>
  `,
  styles: [':host { display: contents; }'],
  imports: [Vflow],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransformNodeComponent extends CustomNodeComponent {
  readonly deleted = output<Node>();
}
