package com.example.musicapp2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Entity
//@DiscriminatorValue("admin")
@Table(name = "admins")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Admin{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "Email is not valid")
    private String username;
    @Email(message = "Email it not valid")
    private String email;
    @NotBlank(message = "Password is not valid")
    private String password;

    public Admin(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
