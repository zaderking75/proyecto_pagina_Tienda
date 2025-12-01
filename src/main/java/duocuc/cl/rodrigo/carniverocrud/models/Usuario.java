package duocuc.cl.rodrigo.carniverocrud.models;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Usuario {
    private int id;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private String phone;
    private String address;
    private String commune;
}
