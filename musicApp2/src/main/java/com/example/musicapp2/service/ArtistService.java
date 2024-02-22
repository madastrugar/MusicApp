package com.example.musicapp2.service;

import com.example.musicapp2.model.Artist;
import com.example.musicapp2.model.Song;
import com.example.musicapp2.model.User;

import java.util.List;
import java.util.Set;

public interface ArtistService{
    List<Artist> getArtists();
    Artist getArtist(Long id);
    Artist getByUserName(String username);
    Artist findByUsername(String username);
    Artist findByUsernameAndPassword(String username, String password);
    Artist checkArtist(String username, String email, String password);
    Artist saveArtist(Artist artist);
    Artist updateArtist(Artist artist);
    void deleteArtist(Long id);
    Set<String> artistGenres(Long id);

}
