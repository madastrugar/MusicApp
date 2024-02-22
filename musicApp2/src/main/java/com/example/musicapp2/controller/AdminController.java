package com.example.musicapp2.controller;


import com.example.musicapp2.dto.CreateAccount;
import com.example.musicapp2.dto.FindByUserNameAndPassword;
import com.example.musicapp2.dto.FindByUsername;
import com.example.musicapp2.model.*;
import com.example.musicapp2.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable Long id){
        return new ResponseEntity<Admin>(adminService.getAdmin(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Admin> saveAdmin(@Valid @RequestBody Admin admin){
         return new ResponseEntity<Admin>((Admin) adminService.saveAdmin(admin),HttpStatus.CREATED);
    }
    @PostMapping("/addAdmin")
    public ResponseEntity addAdmin(@RequestBody CreateAccount createAccount){
        Admin admin =  new Admin(createAccount.getUsername(), createAccount.getEmail(), createAccount.getPassword());
        adminService.saveAdmin(admin);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAdmin(@PathVariable Long id){
         adminService.deleteAdmin(id);
         return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/login")
    public ResponseEntity findByUsernameAndPassword(@RequestBody FindByUserNameAndPassword findBy){
        Admin admin = adminService.findByUsernameAndPassword(findBy.getUsername(), findBy.getPassword());
        if(admin != null){
            return new ResponseEntity(admin,HttpStatus.OK);
        }
        else return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

}
