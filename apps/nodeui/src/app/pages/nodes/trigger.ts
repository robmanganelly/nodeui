import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNodeComponent, Vflow } from 'ngx-vflow';

@Component({
  template: `
    <div class="w-55 bg-card border-2 border-violet-500 rounded-lg shadow-sm overflow-hidden">
      <div class="flex items-center gap-2 px-3.5 py-3 border-b-2 border-violet-500 text-violet-500">
        <svg class="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 3L12 8L4 13V3Z" fill="currentColor" />
        </svg>
        <span class="text-sm font-semibold tracking-tight text-foreground">A node can be anything</span>
      </div>
      <div class="px-3.5 py-3 bg-card">
        <iframe class="w-full h-full border-0 block" width="100%" height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ">
        </iframe>
      </div>

      <handle type="source" position="right" />
    </div>
  `,
  imports: [Vflow],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriggerNodeComponent extends CustomNodeComponent {}
