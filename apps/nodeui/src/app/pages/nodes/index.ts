
import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked, viewChild } from '@angular/core';
import { Vflow, Connection, VflowComponent, Edge, createEdge, ComponentNodeEvent } from 'ngx-vflow';
import { ThemeService } from '@blocks';
import { FlowStoreService } from './flow.service';
import { TransformNodeComponent } from './transform';

@Component({
  template: `<vflow
    view="auto"
    [nodes]="store.nodes()"
    [edges]="store.edges()"
    [background]="background()"
    [optimization]="{ detachedGroupsLayer: true }"
    [alignmentHelper]="true"
    (connect)="createEdge($event)"
    (componentNodeEvent)="onComponentEvent($event)">
    <ng-template let-ctx edge>
      @if (ctx.edge.data?.().type === 'animated') {
        <svg:path
          class="animated-edge"
          fill="none"
          [attr.d]="ctx.path()"
          [attr.stroke-width]="2.5"
          [attr.stroke]="'#8b5cf6'"
          [attr.marker-end]="ctx.markerEnd()" />
      }
    </ng-template>

    <ng-template let-ctx edgeLabelHtml>
      @if (ctx.label.data.type === 'text') {
        <div class="h-7 bg-card border border-border rounded-md px-2.5 flex items-center justify-center text-xs font-medium text-card-foreground shadow-sm">
          {{ ctx.label.data.text }}
        </div>
      }

      @if (ctx.label.data.type === 'delete') {
        <div class="w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center cursor-pointer text-muted-foreground shadow-sm transition-all duration-150 hover:bg-destructive hover:border-destructive hover:text-white"
          (keydown.space)="deleteEdge(ctx.edge)"
          (keydown.enter)="deleteEdge(ctx.edge)"
          (click)="deleteEdge(ctx.edge)"
          tabindex="0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
      }
    </ng-template>

    <!-- <mini-map /> -->
  </vflow>`,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .animated-edge {
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 8 4;
        animation: dash-flow 1s linear infinite;
      }

      @keyframes dash-flow {
        to {
          stroke-dashoffset: -12;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Vflow],
  providers: [FlowStoreService],
})
export class AllFeaturesDemoComponent {
  protected store = inject(FlowStoreService);
  private theme = inject(ThemeService);

  protected vflow = viewChild.required(VflowComponent);

  protected background = computed(() =>
    this.theme.theme() === 'dark'
      ? { type: 'dots' as const, backgroundColor: '#0a0a0a', color: '#2a2a2a' }
      : { type: 'dots' as const, backgroundColor: '#fafafa', color: '#d4d4d4' }
  );

  constructor() {
    effect(() => {
      if (this.vflow().initialized()) {
        untracked(() => this.vflow().fitView());
      }
    });
  }

  createEdge(connection: Connection) {
    const id = `${connection.source}${connection.sourceHandle ?? ''}-${connection.target}${connection.targetHandle ?? ''}`;

    this.store.edges.update((edges) => {
      return [
        ...edges,
        createEdge({
          id,
          edgeLabels: {
            center: {
              type: 'html-template',
              data: {
                type: 'delete',
              },
            },
          },
          markers: {
            end: {
              type: 'arrow-closed',
            },
          },
          ...connection,
        }),
      ];
    });
  }

  deleteEdge(edgeToDelete: Edge) {
    this.store.edges.update((edges) => {
      return edges.filter((edge) => edge !== edgeToDelete);
    });
  }

  onComponentEvent(event: ComponentNodeEvent<[TransformNodeComponent]>) {
    if (event.eventName === 'deleted') {
      this.store.nodes.update((nodes) => nodes.filter((node) => node !== event.eventPayload));
    }
  }
}
