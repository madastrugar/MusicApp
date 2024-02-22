package com.example.musicapp2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSong {
    private String title;
    private int played_no;
    private String genre;
    private String artist;
}
