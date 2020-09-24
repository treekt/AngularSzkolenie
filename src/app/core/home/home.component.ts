import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {SearchArtist} from '../../shared/search-artist';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artistQuery: string;
  artists: SearchArtist[] = [];

  modelChanged: Subject<string> = new Subject<string>();

  constructor(private spotifyService: SpotifyService, private router: Router) {
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
          const artist: SearchArtist = item as SearchArtist;
          artist.image = image;
          return artist;
        });
        console.log(this.artists);
      });
  }

  searchQueryChanged(text: any) {
    this.modelChanged.next(text);
  }


  openArtistPage(id: string) {
    this.router.navigate([`artists/${id}`]);
  }
}
