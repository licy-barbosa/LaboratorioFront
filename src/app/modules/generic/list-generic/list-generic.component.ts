import { Component, Input } from '@angular/core';
import { LoadingComponent } from "../../../template/loading/loading.component";

@Component({
  selector: 'app-list-generic',
  imports: [LoadingComponent],
  templateUrl: './list-generic.component.html',
  styleUrl: './list-generic.component.css'
})
export class ListGenericComponent {
    @Input({ required: true })
    list: any;
}