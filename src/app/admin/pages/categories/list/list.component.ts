import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories: Category[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(id: string) {

  }

  onDelete(id: string) {
    
  }

}
