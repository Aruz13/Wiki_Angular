import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-capitulos',
  templateUrl: './capitulos.component.html',
  styleUrl: './capitulos.component.scss'
})
export class CapitulosComponent implements OnInit {
  episodes: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  next: string =""
  prev: string =""
  displayedColumns: string[] = ['id', 'name', 'air_date', 'episode', 'actions'];

  filters = {
    name: '',
    sea: '',
    cap:''
  }
  selectedName: string = "";
  selectedSeason: string = "";
  selectedCap: string = "";
  seaOptions: string[] = [ "S01", "S02", "S03", "S04", "S05", "Default"];
  capOptions: string[] = [ "E01", "E02", "E03", "E04", "E05",
    "E06", "E07", "E08", "E09", "E10", "Default"
  ];

  constructor(private rmService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadEpisodes();
  }

  applyFilters() {
    console.log("Cambios");
    this.currentPage = 1;
    this.filters.sea = this.selectedSeason;
    this.filters.cap = this.selectedCap;
    if (this.filters.sea == "Default"){
      this.filters.sea = ""
    }
    if (this.filters.cap == "Default"){
      this.filters.cap = ""
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
    const { name, sea, cap } = this.filters;

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

  viewCharacters(characterUrls: string[]): void {
    // Logic to view characters or navigate to a character details page
  }

  saveEpisodeId(episodeId: number): void {
    console.log('Saved Episode ID:', episodeId);
    // Logic to save the episode ID
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
        this.episodes = response.results;
        this.totalPages = response.info.pages;
        this.currentPage = page;
        this.next = response.info.next
        this.prev = response.info.prev
      });
  }

}