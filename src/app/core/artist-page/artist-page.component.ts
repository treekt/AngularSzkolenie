import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Artist} from '../../shared/artist';
import {ArtistService} from '../../services/artist.service';
import {Album} from '../../shared/album';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {

  artist: Artist = new Artist();

  albums: Album[] = [];

  constructor(private route: ActivatedRoute, private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.artist.id = params.id);

    const pushedArtist = window.history.state.artist;

    if (pushedArtist) {
      this.artist = pushedArtist;
      console.log('z parenta');
    } else {
      this.artistService
        .getArtist(this.artist.id)
        .subscribe((fetchedArtist) => {
          this.artist = fetchedArtist;
          console.log('z api');
        });
    }

    this.artistService
      .getArtistAlbums(this.artist.id)
      .subscribe((fetchedAlbums) => {
        console.log(fetchedAlbums);
        this.albums = fetchedAlbums.items;
        console.log(this.albums);
      });
  }

}
