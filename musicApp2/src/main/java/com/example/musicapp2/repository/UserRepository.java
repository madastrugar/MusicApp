package com.example.musicapp2.repository;

import com.example.musicapp2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);

    User findByUsernameAndPasswordAndEmail(String username, String email, String password);
}
