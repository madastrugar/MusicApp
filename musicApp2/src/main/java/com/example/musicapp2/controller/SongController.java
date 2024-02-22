package com.example.musicapp2.controller;

import com.example.musicapp2.dto.AdaugareCantec;
import com.example.musicapp2.dto.FindSong;
import com.example.musicapp2.dto.UpdateSong;
import com.example.musicapp2.model.Artist;
import com.example.musicapp2.model.Playlist;
import com.example.musicapp2.model.Song;
import com.example.musicapp2.service.ArtistService;
import com.example.musicapp2.service.PlaylistService;
import com.example.musicapp2.service.SongService;
import com.example.musicapp2.service.impl.SongServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private ArtistService artistService;

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSong(@PathVariable Long id){
       return new ResponseEntity<Song>(songService.getSong(id),HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<List<Song>> getSongs(){
        return new ResponseEntity<List<Song>>(songService.getSongs(), HttpStatus.OK);}

    @PostMapping("")
    public ResponseEntity addSong(@RequestBody AdaugareCantec adaugareCantec){
        Song song = new Song(adaugareCantec.getTitle(),adaugareCantec.getGenre(),adaugareCantec.getArtist());
        songService.saveSong(song);
        Artist a = artistService.getByUserName(adaugareCantec.getArtist());
        if(a!=null) {
            a.getSongs().add(song);
            artistService.updateArtist(a);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity updateSong(@PathVariable Long id, @RequestBody UpdateSong updateSong) {
        Song song = new Song(updateSong.getTitle(), updateSong.getPlayed_no(), updateSong.getGenre(), updateSong.getArtist());
        song.setId(id);
        songService.updateSong(song);
        return new ResponseEntity(HttpStatus.OK);
    }
    @PutMapping("/play/{id}")
    public ResponseEntity playSong(@PathVariable Long id){
        Song song = songService.getSong(id);
        song.setPlayed_no(song.getPlayed_no() + 1);
        songService.updateSong(song);
        return new ResponseEntity(HttpStatus.OK);
    }
    //localhost:8080/songs?id=3
    @DeleteMapping("/{id}")
    public ResponseEntity deleteSong(@PathVariable Long id){
          Song song = songService.getSong(id);
          Artist artist = artistService.getByUserName(song.getArtist());
          if(artist!=null){
              artist.getSongs().remove(song);
              artistService.updateArtist(artist);
          }
          for (Playlist playlist : playlistService.getPlaylists()){
              if(playlist.getSongs().contains(song)){
                  playlistService.deleteSongFromPlaylist(playlist.getId(), song.getId());
              }
          }
          songService.deleteSong(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/filterByTitle")
    public ResponseEntity getSongsByTitle(@RequestBody FindSong findSong){
        return new ResponseEntity(songService.getSongsByTitle(findSong.getKeyword()),HttpStatus.OK);
    }

    @PostMapping("/filterByGenre")
    public ResponseEntity getSongsByGenre(@RequestBody FindSong findSong){
        return new ResponseEntity(songService.getSongsByGenre(findSong.getKeyword()),HttpStatus.OK);
    }
    @PostMapping("/filterByKeyword")
    public ResponseEntity getSongsByKeyword(@RequestBody FindSong findSong){
        return new ResponseEntity(songService.getSongsByKeyword(findSong.getKeyword()),HttpStatus.OK);
    }

    @PostMapping("/filterByArtist")
    public ResponseEntity getSongsByArtist(@RequestBody FindSong findSong){
        return new ResponseEntity(songService.getSongsByArtist(findSong.getKeyword()),HttpStatus.OK);
    }

}
