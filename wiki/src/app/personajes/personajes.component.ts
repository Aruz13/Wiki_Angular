import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service'; // Adjust the path based on your project structure
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})
export class PersonajesComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  next: string = "";
  prev: string = "";
  filters = {
    name: '',
    status: '',
    species: '',
    gender: ''
  };
  selectedStatus: string = ''; // Agrega esta propiedad
  selectedGender: string = ''; // Agrega esta propiedad
  selectedName: string = ''; // Agrega esta propiedad
  statusOptions: string[] = ['Alive', 'Dead', 'unknown', 'Default']; // Añade las opciones disponibles según la API
  genderOptions: string[] = ['Male', 'Female', 'Genderless', 'unknown', 'Default']; // Añade las opciones disponibles según la API

  
  constructor(private rmService: RickAndMortyService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.loadCharacters();
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        console.log('URL has query parameters:', params);
        // Handle query parameters here
      } else {
        console.log('URL does not have query parameters');
      }
    });

  }

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 3); // Start 3 pages before current
    const endPage = Math.min(this.totalPages, this.currentPage + 3); // End 3 pages after current
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }

  loadCharacters(page: number = 1): void {
    this.rmService.getCharacters(page).subscribe((data: any) => {
      this.characters = data.results;
      this.totalPages = data.info.pages;
      this.currentPage = page;
      this.next = data.info.next
      this.prev = data.info.prev
    });
  }

  loadCharacters2() {
    console.log("Cambios 2");
    const { name, status, species, gender } = this.filters;
    console.log(this.filters);
    this.rmService.getCharacters2(name, status, species, gender, this.currentPage)
      .subscribe(response => {
        console.log(response)
        this.characters = response.results;
        this.totalPages = response.info.pages;
      });
      console.log("Cambios 3");
  }

  applyFilters() {
    console.log("Cambios");
    this.currentPage = 1; // Reset to first page on filter change
    this.filters.status = this.selectedStatus;
    this.filters.gender = this.selectedGender;
    if (this.filters.status == "Default"){
      this.filters.status = ""
    }
    if (this.filters.gender == "Default"){
      this.filters.gender = ""
    }
    this.loadCharacters2();
  }

  prevPag(): void {
    if (this.currentPage > 1) {
      this.loadCharacters(this.currentPage - 1);
    }
  }

  postPag(): void {
    if (this.currentPage < this.totalPages) {
      this.loadCharacters(this.currentPage + 1);
    }
  }
}