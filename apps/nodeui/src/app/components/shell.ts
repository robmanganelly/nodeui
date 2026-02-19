import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSidebarInset, SiteHeader } from '@blocks';
import { HlmSidebarImports } from '@ui/sidebar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, AppSidebarInset, SiteHeader, HlmSidebarImports],
  template: `
    <spartan-app-sidebar-inset>
      <main hlmSidebarInset>
        <spartan-site-header-inset />
        <router-outlet />
      </main>
    </spartan-app-sidebar-inset>
  `,
})
export class Shell {}
