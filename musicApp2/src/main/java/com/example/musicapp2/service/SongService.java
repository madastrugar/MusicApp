package com.example.musicapp2.service;

import com.example.musicapp2.model.Song;
import com.example.musicapp2.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface SongService {
    List<Song> getSongs();
    Song getSong(Long id);
    Song saveSong(Song song);
    Song updateSong(Song song);
    void deleteSong(Long id);

    List<Song> getSongsByTitle(String title);
    List<Song> getSongsByGenre(String genre);
    List<Song> getSongsByKeyword(String keyword);
    List<Song> getSongsByArtist(String artist);



}
