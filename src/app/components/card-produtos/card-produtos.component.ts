import { Component } from '@angular/core';

@Component({
  selector: 'app-card-produtos',
  standalone: true,
  imports: [],
  templateUrl: './card-produtos.component.html',
  styleUrl: './card-produtos.component.scss'
})
export class CardProdutosComponent {
  imageSrc: string = "assets/notebook.webp";
}
