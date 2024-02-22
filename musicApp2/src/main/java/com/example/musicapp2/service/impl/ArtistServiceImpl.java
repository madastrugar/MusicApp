package com.example.musicapp2.service.impl;

import com.example.musicapp2.model.*;
import com.example.musicapp2.repository.ArtistRepository;
import com.example.musicapp2.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ArtistServiceImpl implements ArtistService {
    @Autowired
    ArtistRepository artistRepository;


    @Override
    public List<Artist> getArtists() {
        return artistRepository.findAll();
    }

    @Override
    public Artist getArtist(Long id) {
        Optional<Artist> artist = artistRepository.findById(id);
        if(artist.isPresent())
            return artist.get();
        else
            throw new RuntimeException("Artist not found with id : " + id);
    }

    @Override
    public Artist getByUserName(String username) {
        return artistRepository.findByUsername(username);
    }

    @Override
    public Artist findByUsername(String username) {
        return artistRepository.findByUsername(username);
    }

    @Override
    public Artist findByUsernameAndPassword(String username, String password) {
        return artistRepository.findByUsernameAndPassword(username,password);
    }

    @Override
    public Artist checkArtist(String username, String email, String password) {
        return artistRepository.findByUsernameAndPasswordAndEmail(username,email,password);
    }

    @Override
    public Artist saveArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    @Override
    public Artist updateArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    @Override
    public void deleteArtist(Long id) {
      artistRepository.deleteById(id);
    }

    @Override
    public Set<String> artistGenres(Long id) {
        Set<String> genresList = new HashSet<>();

        Optional<Artist> optionalArtist = artistRepository.findById(id);
        if(optionalArtist.isPresent()){
            List<Playlist> playlists = optionalArtist.get().getPlaylists();

            for(Playlist playlist : playlists) {
                Set<Song> songs = playlist.getSongs();
                for (Song song : songs) {
                    genresList.add(song.getGenre());
                }
            }
            return genresList;
        }
        else
            throw new RuntimeException("User not found with id : " + id);

    }
}
