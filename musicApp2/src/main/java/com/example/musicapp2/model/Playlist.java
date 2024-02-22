package com.example.musicapp2.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "playlists")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "Name is not valid")
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Song> songs = new HashSet<>();

    public Playlist(String name) {
        this.name = name;
    }
}
