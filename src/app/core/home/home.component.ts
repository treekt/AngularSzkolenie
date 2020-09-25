import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Artist} from '../../shared/artist';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artistQuery: string;
  artists: Artist[] = [];

  modelChanged: Subject<string> = new Subject<string>();

  constructor(private spotifyService: SearchService, private router: Router) {
    this.configureDebounce();
  }

  ngOnInit(): void {
  }

  configureDebounce() {
    this.modelChanged
      .pipe(
        debounceTime(300), distinctUntilChanged())
      .subscribe((model) => {
        console.log(model);
        if (!!model) {
          this.searchArtists(model);
        }
      });
  }

  searchArtists(query: string) {
    this.spotifyService
      .search('artist', query)
      .subscribe((data: any) => {
        this.artists = data.artists.items.map((item) => {
          const image = item.images.length > 0 ? item.images[0].url : '';
          const artist: Artist = item as Artist;
          artist.image = image;
          return artist;
        });
        console.log(this.artists);
      });
  }

  searchQueryChanged(text: any) {
    this.modelChanged.next(text);
  }


  openArtistPage(artist: Artist) {
    this.router.navigateByUrl(`artists/${artist.id}`, {
      state: { artist}
    });
  }
}
