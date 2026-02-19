import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { HlmButtonImports } from "@ui/button";
@Component({
  imports: [HlmButtonImports, RouterLink],
  template: `
    <h1>Home</h1>
    <button size="sm" variant="link" hlmBtn [routerLink]="['/nodes']">Go to nodes</button>
  `,
})
export class Home {}
