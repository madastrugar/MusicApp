package com.example.musicapp2.dto;

public class CreatePlaylistBuilder {
    private String name;

    public CreatePlaylistBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public CreatePlaylist build() {
        return new CreatePlaylist(name);
    }
}
