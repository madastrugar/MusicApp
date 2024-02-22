package com.example.musicapp2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "songs")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Song{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "Title is not valid")
    private String title;
    private int played_no;
    @NotBlank(message = "Genre is not valid")
    private String genre;

    public Song(String title, String genre, String artist) {
        this.title = title;
        this.played_no = 0 ;
        this.genre = genre;
        this.artist = artist;
    }
    public Song(String title,int played_no, String genre, String artist) {
        this.title = title;
        this.played_no = played_no ;
        this.genre = genre;
        this.artist = artist;
    }
    @NotBlank(message = "Artist is not valid")
    private String artist;

}
