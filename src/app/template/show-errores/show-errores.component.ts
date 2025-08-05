import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-errores',
  imports: [],
  templateUrl: './show-errores.component.html',
  styleUrl: './show-errores.component.css'
})
export class ShowErroresComponent {
    @Input({required: true})
    errores!: string[];
}