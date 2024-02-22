package com.example.musicapp2.repository;

import com.example.musicapp2.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    List<Song> findSongByTitle(String title);
    List<Song> findSongByGenre(String genre);
    List<Song> findSongByTitleContaining(String keyword);

    List<Song> findSongByArtist(String artist);
}
