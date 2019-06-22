import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'back-button',
  template: `<button (click)="goBack()" type="button" class="btn btn-secondary ">Zurück</button>`,
})
export class BackButtonComponent {
  @Input()color: string;

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
