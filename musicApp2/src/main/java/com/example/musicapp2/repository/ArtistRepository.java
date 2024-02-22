package com.example.musicapp2.repository;

import com.example.musicapp2.model.Artist;
import com.example.musicapp2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Artist findByUsername(String username);
    Artist findByUsernameAndPassword(String username, String password);

    Artist findByUsernameAndPasswordAndEmail(String username, String email, String password);
}
