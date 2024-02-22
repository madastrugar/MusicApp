package com.example.musicapp2.service.impl;

import com.example.musicapp2.model.Playlist;
import com.example.musicapp2.model.Song;
import com.example.musicapp2.repository.PlaylistRepository;
import com.example.musicapp2.repository.SongRepository;
import com.example.musicapp2.service.PlaylistService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PlaylistServiceImpl implements PlaylistService {
    @Autowired
    private PlaylistRepository playlistRepository;
    @Autowired
    private SongRepository songRepository;

    @Override
    public Playlist getPlaylist(Long id) {
        Optional<Playlist> playlist = playlistRepository.findById(id);
        if(playlist.isPresent()){
            return playlist.get();
        }
        throw new RuntimeException("Playlist not found with id : " + id);
    }

    @Override
    public List<Playlist> getPlaylists() {
        return playlistRepository.findAll();
    }

    @Transactional
    public Playlist addSongToPlaylist(Long playlistId, Long songId) {
        // Retrieve the playlist and song
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found with id: " + playlistId));

        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new EntityNotFoundException("Song not found with id: " + songId));
        // Add the song to the playlist and the playlist to the song
        if (!playlist.getSongs().contains(song)) {
            playlist.getSongs().add(song);
            // Save or update the playlist entity
        }
        // Save the changes to the database
        return playlistRepository.save(playlist);
    }

    @Override
    public Playlist deleteSongFromPlaylist(Long playlistId, Long songId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found with id: " + playlistId));
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new EntityNotFoundException("Song not found with id: " + songId));
        playlist.getSongs().remove(song);
        return playlistRepository.save(playlist);
    }

    @Override
    public Playlist savePlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @Override
    public Playlist updatePlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @Override
    public void deletePlaylist(Long id) {
        playlistRepository.deleteById(id);
    }
}
