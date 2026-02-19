import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly _document = inject(DOCUMENT);

	readonly theme = signal<Theme>(this._getInitialTheme());

	constructor() {
		effect(() => {
			const isDark = this.theme() === 'dark';
			this._document.documentElement.classList.toggle('dark', isDark);
			localStorage.setItem('theme', this.theme());
		});
	}

	toggle(): void {
		this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
	}

	private _getInitialTheme(): Theme {
		const stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'light') return stored;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
}
