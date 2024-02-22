package com.example.musicapp2.service;


import com.example.musicapp2.model.Admin;

import java.util.List;

public interface AdminService{
    List<Admin> getAdmins();
    Admin getAdmin(Long id);
   // Admin getByUserName(String username);
    Admin findByUsernameAndPassword(String username, String password);
    Admin saveAdmin(Admin admin);
    Admin update(Admin admin);
    void deleteAdmin(Long id);

}
