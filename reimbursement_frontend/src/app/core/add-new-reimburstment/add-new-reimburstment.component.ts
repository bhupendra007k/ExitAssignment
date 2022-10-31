import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-add-new-reimburstment',
  templateUrl: './add-new-reimburstment.component.html',
  styleUrls: ['./add-new-reimburstment.component.css']
})
export class AddNewReimburstmentComponent implements OnInit {
  @Input() show:any;

  constructor() { }

  ngOnInit(): void {
  }

}
