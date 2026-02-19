import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@ui/sidebar';
import { ThemeService } from './theme.service';

@Component({
	selector: 'spartan-theme-toggle',
	imports: [HlmSidebarImports, NgIcon],
	providers: [provideIcons({ lucideSun, lucideMoon })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ul hlmSidebarMenu>
			<li hlmSidebarMenuItem>
				<button hlmSidebarMenuButton (click)="themeService.toggle()">
					@if (themeService.theme() === 'dark') {
						<ng-icon name="lucideSun" />
						<span>Light mode</span>
					} @else {
						<ng-icon name="lucideMoon" />
						<span>Dark mode</span>
					}
				</button>
			</li>
		</ul>
	`,
})
export class ThemeToggle {
	protected readonly themeService = inject(ThemeService);
}
