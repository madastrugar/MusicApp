package com.example.musicapp2.service;

import com.example.musicapp2.model.Playlist;
import com.example.musicapp2.model.Song;

import java.util.List;
import java.util.Set;

public interface PlaylistService {
//    public Set<Song> getSongsFromPlaylist(Long id);

    Playlist getPlaylist(Long id);

    List<Playlist> getPlaylists();

    Playlist addSongToPlaylist(Long playlistId, Long songId);

    Playlist deleteSongFromPlaylist(Long playlistId, Long songId);

    Playlist savePlaylist(Playlist playlist);

    Playlist updatePlaylist(Playlist playlist);

    void deletePlaylist(Long id);
}
