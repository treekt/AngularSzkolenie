import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Album} from '../../../shared/album';
import {AlbumService} from '../../../services/album.service';
import {Track} from '../../../shared/track';

@Component({
  selector: 'app-songs-dialog',
  templateUrl: './songs-dialog.component.html',
  styleUrls: ['./songs-dialog.component.css']
})
export class SongsDialogComponent implements OnInit {

  tracks: Track[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public album: Album, private albumService: AlbumService, private dialogRef: MatDialogRef<SongsDialogComponent>) {
  }

  ngOnInit(): void {
    this.fetchTracks();
  }

  fetchTracks() {
    this.albumService.getTracks(this.album.id)
      .subscribe((result) => {
        this.tracks = result.items.map(track => {
          track.artists.map(artist => artist.name);
          return track as Track;
        });
      });
  }

  selectTrack(track: Track) {
    this.dialogRef.close(track);
  }


}

