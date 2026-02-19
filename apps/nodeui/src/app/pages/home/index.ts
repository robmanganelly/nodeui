import { Component } from "@angular/core";
import { HlmButtonImports } from "@ui/button";
@Component({
  imports: [HlmButtonImports],
  template: `
    <h1>Home</h1>
    <button size="sm" [variant]="'default'" hlmBtn >Click me</button>
  `,
})
export class Home {}
