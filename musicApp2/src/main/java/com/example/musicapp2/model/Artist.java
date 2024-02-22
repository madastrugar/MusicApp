package com.example.musicapp2.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "artists")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Artist{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "Email is not valid")
    private String username;
    @Email(message = "Email it not valid")
    private String email;
    @NotBlank(message = "Password is not valid")
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    //@JsonManagedReference
    private List<Playlist> playlists;

    @OneToMany(cascade = CascadeType.ALL)
   // @JsonManagedReference
    private List<Song> songs;

    public Artist(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
