import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-categoria',
  standalone: true,
  imports: [],
  templateUrl: './card-categoria.component.html',
  styleUrl: './card-categoria.component.scss'
})
export class CardCategoriaComponent {
  @Input() imageSrc: string = "";
  @Input() nomeCategoria: string = "";

}
