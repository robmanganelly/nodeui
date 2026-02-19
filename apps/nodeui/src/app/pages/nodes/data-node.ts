import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNodeComponent, Vflow } from 'ngx-vflow';

@Component({
  template: `
    <div class="w-50 bg-card border-2 border-emerald-500 rounded-lg shadow-sm overflow-hidden">
      <div class="flex items-center gap-2 px-3.5 py-3 border-b-2 border-emerald-500 text-emerald-500">
        <svg class="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="2.5" rx="1" fill="currentColor" />
          <rect x="2" y="6.75" width="12" height="2.5" rx="1" fill="currentColor" />
          <rect x="2" y="10.5" width="12" height="2.5" rx="1" fill="currentColor" />
        </svg>
        <span class="text-sm font-semibold tracking-tight text-foreground">For example, a table</span>
      </div>
      <div class="px-3.5 py-2.5 flex flex-col gap-1.5 bg-card">
        @for (field of fields; track field.name) {
          <div class="flex justify-between items-center text-xs py-1">
            <span class="text-foreground font-medium">{{ field.name }}</span>
            <span class="text-muted-foreground font-mono text-[11px]">{{ field.type }}</span>
          </div>
        }
      </div>

      <handle type="target" position="left" />
      <handle type="source" position="right" />
    </div>
  `,
  imports: [Vflow],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataNodeComponent extends CustomNodeComponent {
  protected fields = [
    { name: 'id', type: 'number' },
    { name: 'name', type: 'string' },
    { name: 'count', type: 'number' },
  ];
}
