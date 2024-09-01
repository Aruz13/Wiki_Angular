
import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { HttpClient } from '@angular/common/http';

interface Category {
  title: string;
  description: string;
  icon: string;
  link: string;
  apiEndpoint: string;
  count?: number;
  items: Array<{              
    id: number;               
    name: string;             
    image: string;
  }>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [
    {
      title: 'Personajes',
      description: 'Explora todos los personajes de Rick and Morty.',
      icon: 'person',
      link: '/personajes',
      count: 0,
      apiEndpoint: 'https://rickandmortyapi.com/api/character',
      items: [],
    },
    {
      title: 'Top Capítulos',
      description: 'Descubre los capítulos más populares de la serie.',
      icon: 'star',
      link: '/capitulos',
      count: 0,
      apiEndpoint: 'https://rickandmortyapi.com/api/episode',
      items: [],
    },
    {
      title: 'Localizaciones',
      description: 'Conoce las diversas localizaciones del multiverso.',
      icon: 'location_on',
      link: '/localizaciones',
      count: 0,
      apiEndpoint: 'https://rickandmortyapi.com/api/location',
      items: [],
    }
  ];

  constructor(private rmService: RickAndMortyService, private http: HttpClient) { }
  

  ngOnInit(): void {
    this.getDataCounts();
    this.categories.forEach((category) => {
      this.fetchCategoryData(category);
    });
  }

  fetchCategoryData(category: any): void {
    this.http.get(category.apiEndpoint).subscribe((response: any) => {
      category.items = response.results.slice(0, 5); // Fetch top 5 items
    });
  }

  getDataCounts(): void {
    // Obtener el número de personajes
    this.rmService.getCharacters().subscribe(data => {
      this.categories[0].count = data.info.count;
    });

    // Obtener el número de episodios
    this.rmService.getEpisodes().subscribe(data => {
      this.categories[1].count = data.info.count;
    });

    // Obtener el número de localizaciones
    this.rmService.getLocations().subscribe(data => {
      this.categories[2].count = data.info.count;
    });
  }



  // Method to handle mouse enter event
  onMouseEnter(category: any) {
    // Logic to handle what happens when mouse enters the category card
    // For example, you can change the style or log the category
    console.log(`Mouse entered: ${category.name}`);
  }

  // Method to handle mouse leave event
  onMouseLeave(category: any) {
    // Logic to handle what happens when mouse leaves the category card
    // For example, you can revert the style changes
    console.log(`Mouse left: ${category.name}`);
  }

}