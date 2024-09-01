import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service'; // Adjust the path based on your project structure
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

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
  selectedStatus: string = ''; 
  selectedGender: string = ''; 
  selectedName: string = ''; 
  statusOptions: string[] = ['Alive', 'Dead', 'unknown', 'Default'];
  genderOptions: string[] = ['Male', 'Female', 'Genderless', 'unknown', 'Default']; 

  
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

  loadCharacters2(page: number = 1) {
    console.log("Cambios 2");
    const { name, status, species, gender } = this.filters;
    console.log(this.filters);
    if (name == '' && (status == '' || status == "Default" ) && (gender == '' || gender == "Default"  )){
      console.log("Vacio")
      this.loadCharacters(page);
      return
    }
    let params = new HttpParams()
    if (name) {
      params = params.set('name', name);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (species) {
      params = params.set('species', species);
    }
    if (gender) {
      params = params.set('gender', gender);
    }
      const url = "https://rickandmortyapi.com/api/character?page="+ page+ "&" + params
      this.rmService.getPage(url)
      .subscribe(response => {
        console.log(response);
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.currentPage = page;
        this.next = response.info.next
        this.prev = response.info.prev
      });
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
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.currentPage = page;
        this.next = response.info.next
        this.prev = response.info.prev
      });
  }
}