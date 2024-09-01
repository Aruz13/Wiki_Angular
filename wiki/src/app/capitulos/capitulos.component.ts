import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-capitulos',
  templateUrl: './capitulos.component.html',
  styleUrl: './capitulos.component.scss'
})
export class CapitulosComponent implements OnInit {
  episodes: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  displayedColumns: string[] = ['id', 'name', 'air_date', 'episode', 'characters', 'actions'];

  constructor(private rmService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadEpisodes();
  }

  loadEpisodes(page: number = 1): void {
    this.rmService.getEpisodes(page).subscribe((data: any) => {
      this.episodes = data.results;
      this.totalPages = data.info.pages;
      this.currentPage = page;
    });
  }

  viewCharacters(characterUrls: string[]): void {
    // Logic to view characters or navigate to a character details page
  }

  saveEpisodeId(episodeId: number): void {
    console.log('Saved Episode ID:', episodeId);
    // Logic to save the episode ID
  }

  

  prevPag(): void {
    if (this.currentPage > 1) {
      this.loadEpisodes(this.currentPage - 1);
    }
  }

  postPag(): void {
    if (this.currentPage < this.totalPages) {
      this.loadEpisodes(this.currentPage + 1);
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