import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.scss']
})
export class LocateComponent implements OnInit {
  locations: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  displayedColumns: string[] = ['name', 'type', 'dimension', 'residents', 'save'];

  constructor(private rmService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(page: number = 1): void {
    this.rmService.getLocations(page).subscribe((data: any) => {
      this.locations = data.results;
      this.totalPages = data.info.pages;
      this.currentPage = page;
    });
  }

  prevPag(): void {
    if (this.currentPage > 1) {
      this.loadLocations(this.currentPage - 1);
    }
  }

  postPag(): void {
    if (this.currentPage < this.totalPages) {
      this.loadLocations(this.currentPage + 1);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 2); // Start 3 pages before current
    const endPage = Math.min(this.totalPages, this.currentPage + 2); // End 3 pages after current
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }

}