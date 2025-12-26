import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
