import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-vista-listas',
  templateUrl: './vista-listas.component.html',
  styleUrl: './vista-listas.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class VistaListasComponent {

  characters: any[] = [];
  locations: any[] = [];
  episodes: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  next: string =""
  prev: string =""


  filtersP = {
    name: '',
    status: '',
    species: '',
    gender: ''
  };
  selectedStatus: string = ''; 
  selectedGender: string = ''; 
  selectedNameP: string = ''; 
  statusOptions: string[] = ['Alive', 'Dead', 'unknown', 'Default'];
  genderOptions: string[] = ['Male', 'Female', 'Genderless', 'unknown', 'Default']; 


  displayedColumnsL: string[] = ['name', 'type', 'dimension', 'residents', 'save'];
  filtersL = {
    name: '',
    dimension: '',
    type: ''
  };
  selectedNameL: string = ''; 
  selectedDimension: string = ''; 
  selectedType: string = '';
  typeOptions: string[] = ["Default","Planet", "Cluster", "Space station", 
    "Microverse", "TV", "Resort", "Fantasy town", "Dream", "unknown", 
    "Menagerie", "Game", "Customs", "Daycare", "Dwarf planet (Celestial Dwarf)", 
    "Teenyverse", "Box", "Spacecraft", "Spa", "Artificially generated world", 
    "Machine", "Arcade", "Quadrant", "Quasar", "Mount", "Liquid", "Convention", 
    "Woods", "Diegesis", "Nightmare", "Non-Diegetic Alternative Reality", 
    "Diegesis"]


  displayedColumnsC: string[] = ['id', 'name', 'air_date', 'episode', 'actions'];

  filtersC = {
    name: '',
    sea: '',
    cap:''
  }
  selectedNameC: string = "";
  selectedSeason: string = "";
  selectedCap: string = "";
  seaOptions: string[] = [ "S01", "S02", "S03", "S04", "S05", "Default"];
  capOptions: string[] = [ "E01", "E02", "E03", "E04", "E05",
    "E06", "E07", "E08", "E09", "E10", "Default"
  ];

  constructor(private rmService: RickAndMortyService, private route: ActivatedRoute) {}

  selectedSection: string = 'personajes'; 

  filtrosAbiertos: boolean = true;

  toggleFiltros() {
    this.filtrosAbiertos = !this.filtrosAbiertos;
  }

  showSection(section: string) {
    this.selectedSection = section;

    if (section == "personajes"){
      this.loadCharacters()
    } else if (section == "episodios"){
      this.loadEpisodes()
    } else if (section == "locacion"){
      this.loadLocations()
    }

    
    this.selectedNameC = "";
    this.selectedSeason = "";
    this.selectedCap = "";
    this.selectedNameL = "";
    this.selectedDimension = "";
    this.selectedGender = "";
    this.selectedNameP = "";
    this.selectedStatus = "";
    this.selectedType = ""
  }


  ngOnInit(): void {
    this.loadCharacters();

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    const { name, status, species, gender } = this.filtersP;
    console.log(this.filtersP);
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

  applyFiltersP() {
    console.log("Cambios");
    this.currentPage = 1; // Reset to first page on filter change
    this.filtersP.status = this.selectedStatus;
    this.filtersP.gender = this.selectedGender;
    if (this.filtersP.status == "Default"){
      this.filtersP.status = ""
    }
    if (this.filtersP.gender == "Default"){
      this.filtersP.gender = ""
    }
    this.loadCharacters2();
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  applyFiltersL() {
    console.log("Cambios");
    this.currentPage = 1;
    this.filtersL.type = this.selectedType;
    if (this.filtersL.type == "Default"){
      this.filtersL.type = ""
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
    
    const { name, dimension, type } = this.filtersL;

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




applyFiltersC() {
  console.log("Cambios");
  this.currentPage = 1;
  this.filtersC.sea = this.selectedSeason;
  this.filtersC.cap = this.selectedCap;
  if (this.filtersC.sea == "Default"){
    this.filtersC.sea = ""
  }
  if (this.filtersC.cap == "Default"){
    this.filtersC.cap = ""
  }
  this.loadEpisodes2();
}

loadEpisodes(page: number = 1): void {
  this.rmService.getEpisodes(page).subscribe((data: any) => {
    this.episodes = data.results;
    this.totalPages = data.info.pages;
    this.currentPage = page;
    this.next = data.info.next
    this.prev = data.info.prev
  });
}

loadEpisodes2(page: number = 1): void {
  const { name, sea, cap } = this.filtersC;

  if (name == '' && sea == '' && cap == ''){
    this.loadEpisodes(page);
    return
  }
  let params = new HttpParams()
  if (name) {
    params = params.set('name', name);
  }
  let episode = sea+cap 
  if (episode) {
    params = params.set('episode', episode);
  }
    const url = "https://rickandmortyapi.com/api/episode?page="+ page+ "&" + params

    this.rmService.getPage(url)
    .subscribe(response => {
      console.log(response);
      this.episodes = response.results;
      this.totalPages = response.info.pages;
      this.currentPage = page;
      this.next = response.info.next
      this.prev = response.info.prev
    });

}





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 3); // Start 3 pages before current
    const endPage = Math.min(this.totalPages, this.currentPage + 3); // End 3 pages after current
  
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

      if (this.selectedSection == "personajes"){
            this.rmService.getPage(url)
          .subscribe(response => {
            console.log(response);
            this.characters = response.results;
            this.totalPages = response.info.pages;
            this.currentPage = page;
            this.next = response.info.next
            this.prev = response.info.prev
          });
      } else if (this.selectedSection == "episodios"){
        this.rmService.getPage(url)
      .subscribe(response => {
        console.log(response);
        this.episodes = response.results;
        this.totalPages = response.info.pages;
        this.currentPage = page;
        this.next = response.info.next
        this.prev = response.info.prev
      });
      } else if (this.selectedSection == "locacion"){
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

}
