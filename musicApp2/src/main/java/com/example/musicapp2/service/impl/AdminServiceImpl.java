package com.example.musicapp2.service.impl;

import com.example.musicapp2.model.Admin;
import com.example.musicapp2.repository.AdminRepository;
import com.example.musicapp2.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl  implements AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Override
    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin getAdmin(Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if(admin.isPresent())
            return adminRepository.findById(id).get();
        else
            throw new RuntimeException("Admin not found with id : " + id);
    }

    @Override
    public Admin findByUsernameAndPassword(String username, String password) {
        return adminRepository.findByUsernameAndPassword(username,password);
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin update(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public void deleteAdmin(Long id) {
         adminRepository.deleteById(id);
    }
}
