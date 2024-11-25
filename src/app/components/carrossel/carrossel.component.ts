import { Component } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.scss'
})
export class CarrosselComponent {
  primeiroBanner : String = "assets/banner.webp";
  segundoBanner : String = "assets/banner2.webp";
  terceiroBanner : String = "assets/banner3.webp";
}
