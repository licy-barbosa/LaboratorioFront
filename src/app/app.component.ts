import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from './template/menu/menu.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MenuComponent, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})

export class AppComponent {
title ="Salud";
}