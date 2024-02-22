package com.example.musicapp2.controller;

import com.example.musicapp2.dto.*;
import com.example.musicapp2.model.*;
import com.example.musicapp2.service.PlaylistService;
import com.example.musicapp2.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PlaylistService playlistService;

    @GetMapping
    public ResponseEntity getUsers(){
        return new ResponseEntity(userService.getUsers(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id){
        return new ResponseEntity<User>((User) userService.getUser(id), HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<User> findByUsername(@RequestBody FindByUsername findByUsername){
        return new ResponseEntity<>(userService.getByUserName(findByUsername.getUsername()),HttpStatus.OK);

    }
    @GetMapping("/genres/{id}")
    public ResponseEntity getUserGenres(@PathVariable Long id){
        return new ResponseEntity(userService.userGenres(id),HttpStatus.OK);

    }

    @PostMapping("/login")
    public ResponseEntity findByUsernameAndPassword(@RequestBody FindByUserNameAndPassword findBy){
        User user = userService.findByUsernameAndPassword(findBy.getUsername(), findBy.getPassword());
        if(user != null){
            return new ResponseEntity(user,HttpStatus.OK);
        }
        else return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity addUser(@RequestBody CreateAccount createAccount){
        User user =  new User(createAccount.getUsername(), createAccount.getEmail(), createAccount.getPassword());
        userService.saveUser(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/checkUser")
    public ResponseEntity checkUser(@RequestBody CheckUserInDatabase checkUserInDatabase){
        User user = userService.checkUser(checkUserInDatabase.getUsername(), checkUserInDatabase.getEmail(), checkUserInDatabase.getPassword());
        System.out.println(user);
        if(user != null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        else return new ResponseEntity(user, HttpStatus.OK);
    }

    @PostMapping("/playlists/{id}")
    public ResponseEntity savePlaylist(@PathVariable Long id, @RequestBody CreatePlaylist createPlaylist){
        User user = userService.getUser(id);
        Playlist playlist = new Playlist(createPlaylist.getName());
        playlistService.savePlaylist(playlist);
        user.setId(id);
        user.getPlaylists().add(playlist);
        userService.saveUser(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/playlists/{id}")
    public ResponseEntity getPlaylists(@PathVariable Long id){
        User user = userService.getUser(id);
        List<Playlist> playlistList = user.getPlaylists();
        if(playlistList != null){
            return new ResponseEntity(playlistList,HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody CreateAccount createAccount){
        User user = new User(createAccount.getUsername(), createAccount.getEmail(), createAccount.getPassword());
        user.setId(id);
        userService.updateUser(user);
       return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id){
        User user = userService.getUser(id);
        user.getPlaylists().clear();
        userService.updateUser(user);
        userService.deleteUser(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
