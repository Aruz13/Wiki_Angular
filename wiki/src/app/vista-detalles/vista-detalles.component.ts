import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { Character } from '../interfaces/character'
//import { Episode } from '../interfaces/episode'
import { Location } from '../interfaces/location'

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

@Component({
  selector: 'app-vista-detalles',
  templateUrl: './vista-detalles.component.html',
  styleUrl: './vista-detalles.component.scss'
})
export class VistaDetallesComponent {
  url2: string = "";

  entity: any;
  aux1: any;
  aux2: any;
  episodios: Episode[] = [];
  personaje: Character[] = [];
  localizacion: Location[] = [];
  type: string = '';
  origenId: string = ""
  actID: string = ""
  
  displayedColumns: string[] = ['name', 'details'];

  loading: boolean = true;

  constructor(private rmService: RickAndMortyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const url = this.route.snapshot.url[0].path;
      this.type = url;
      console.log(this.type, id)

      if (this.type === 'location') {
        this.url2 = 'https://rickandmortyapi.com/api/location/'+id
        this.locations();
      } else if (this.type === 'character') {
        this.url2 = 'https://rickandmortyapi.com/api/character/'+id
        this.characters();
      } else if (this.type === 'episode') {
        this.url2 = 'https://rickandmortyapi.com/api/episode/'+id
        this.episodes();
      }
    });
  }

    characters() {
      this.rmService.getPage(this.url2).subscribe(
        data => {
          this.entity = data;
          if (this.entity && Array.isArray(this.entity.episode)) {
            const episodeRequests = this.entity.episode.map((episodeUrl: string) =>
              this.rmService.getPage(episodeUrl).toPromise()
            );
            
            let auxs: string[] = this.entity.location.url.split('/');
            this.actID = auxs[auxs.length -1];
            let aux: string[] = this.entity.origin.url.split('/');
            this.origenId = aux[aux.length -1];
            
            Promise.all(episodeRequests).then((episodeDataArray: Episode[]) => {
              this.episodios = episodeDataArray;
              this.loading = false; 
              console.log(this.episodios.length)
            }).catch(error => {
              console.error('Error al obtener episodios:', error);
              this.loading = false; 
            });
          } else {
            console.error('La propiedad "episode" no es un array o no está definida.');
            this.loading = false;
          }
          
        },
        error => {
          console.error('Error al obtener datos:', error);
          this.loading = false;
        }
      );
      console.log(this.episodios.length)

      this.loading = false;
      console.log(this.actID)


    }


  locations(){
    
    this.rmService.getPage(this.url2).subscribe(
      data => {
        this.entity = data;
        if (this.entity && Array.isArray(this.entity.residents)) {
          const charactersRequests = this.entity.residents.map((characterUrl: string) =>
            this.rmService.getPage(characterUrl).toPromise()
          );
          Promise.all(charactersRequests).then((characterDataArray: Character[]) => {
            this.personaje = characterDataArray;
            this.loading = false; 
            console.log(this.personaje.length)
          }).catch(error => {
            console.error('Error al obtener personajes:', error);
            this.loading = false; 
          });
        } else {
          console.error('La propiedad "personajes" no es un array o no está definida.');
          this.loading = false;
        }
      },
      error => {
        console.error('Error al obtener datos:', error);
        this.loading = false;
      }
    );
    console.log(this.entity)
    
  }

  episodes(){
    this.rmService.getPage(this.url2).subscribe(
      data => {
        this.entity = data;
        if (this.entity && Array.isArray(this.entity.characters)) {
          const charactersRequests = this.entity.characters.map((characterUrl: string) =>
            this.rmService.getPage(characterUrl).toPromise()
          );
          Promise.all(charactersRequests).then((characterDataArray: Character[]) => {
            this.personaje = characterDataArray;
            this.loading = false; 
            console.log(this.personaje.length)
          }).catch(error => {
            console.error('Error al obtener personajes:', error);
            this.loading = false; 
          });
        } else {
          console.error('La propiedad "personajes" no es un array o no está definida.');
          this.loading = false;
        }
      },
      error => {
        console.error('Error al obtener datos:', error);
        this.loading = false;
      }
    );
    console.log(this.personaje.length)
  }

}
