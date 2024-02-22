package com.example.musicapp2.service.impl;

import com.example.musicapp2.model.Playlist;
import com.example.musicapp2.model.Song;
import com.example.musicapp2.model.User;
import com.example.musicapp2.repository.UserRepository;
import com.example.musicapp2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Primary
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent())
            return user.get();
        else
            throw new RuntimeException("User not found with id : " + id);
    }

    @Override
    public User getByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username,password);
    }

    @Override
    public User checkUser(String username, String email, String password) {
        return userRepository.findByUsernameAndPasswordAndEmail(username, password, email);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }


    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
          userRepository.deleteById(id);
    }

    @Override
    public Set<String> userGenres(Long id) {
        Set<String> genresList = new HashSet<>();

        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            List<Playlist> playlists = optionalUser.get().getPlaylists();

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
