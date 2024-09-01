import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.scss']
})
export class LocateComponent implements OnInit {
  locations: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  next: string =""
  prev: string =""
  displayedColumns: string[] = ['name', 'type', 'dimension', 'residents', 'save'];
  filters = {
    name: '',
    dimension: '',
    type: ''
  };
  selectedName: string = ''; 
  selectedDimension: string = ''; 
  selectedType: string = '';
  typeOptions: string[] = ["Default","Planet", "Cluster", "Space station", 
    "Microverse", "TV", "Resort", "Fantasy town", "Dream", "unknown", 
    "Menagerie", "Game", "Customs", "Daycare", "Dwarf planet (Celestial Dwarf)", 
    "Teenyverse", "Box", "Spacecraft", "Spa", "Artificially generated world", 
    "Machine", "Arcade", "Quadrant", "Quasar", "Mount", "Liquid", "Convention", 
    "Woods", "Diegesis", "Nightmare", "Non-Diegetic Alternative Reality", 
    "Diegesis"]

  constructor(private rmService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  applyFilters() {
    console.log("Cambios");
    this.currentPage = 1;
    this.filters.type = this.selectedType;
    if (this.filters.type == "Default"){
      this.filters.type = ""
    }
    this.loadLocations2();
  }

  loadLocations(page: number = 1): void {
    this.rmService.getLocations(page).subscribe((data: any) => {
      this.locations = data.results;
      this.totalPages = data.info.pages;
      this.currentPage = page;
      this.next = data.info.next
      this.prev = data.info.prev
    });
  }

  
  loadLocations2(page: number = 1): void {
    
    const { name, dimension, type } = this.filters;

    if (name == '' && dimension == '' && type == ''){
      this.loadLocations(page);
      return
    }
    let params = new HttpParams()
    if (name) {
      params = params.set('name', name);
    }
    if (dimension) {
      params = params.set('dimension', dimension);
    }
    if (type) {
      params = params.set('type', type);
    }
      const url = "https://rickandmortyapi.com/api/location?page="+ page+ "&" + params

    this.rmService.getPage(url)
      .subscribe(response => {
        console.log(response);
        this.locations = response.results;
        this.totalPages = response.info.pages;
        this.currentPage = page;
        this.next = response.info.next
        this.prev = response.info.prev
      });
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


  
  prevPag(): void {
    console.log("Cambio de pagina")
    if (this.currentPage > 1) {
      console.log(this.prev)
      this.getData(this.prev, this.currentPage-1);
      this.getPages()
    }
  }

  postPag(): void {
    console.log("Cambio de pagina")
    if (this.currentPage < this.totalPages) {
      console.log(this.next)
      this.getData(this.next, this.currentPage+1);
      this.getPages()
    }
  }

  getData(url: any, page: number = 1){
    console.log(url)
    this.rmService.getPage(url)
      .subscribe(response => {
        console.log(response);
        this.locations = response.results;
        this.totalPages = response.info.pages;
        this.currentPage = page;
        this.next = response.info.next
        this.prev = response.info.prev
      });
  }

}