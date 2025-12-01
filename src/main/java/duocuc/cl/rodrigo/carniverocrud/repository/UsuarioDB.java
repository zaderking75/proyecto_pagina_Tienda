package duocuc.cl.rodrigo.carniverocrud.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="usuarios")
public class UsuarioDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Integer id;
    @Column(name = "name", nullable = false,length = 50)
    private String name;
    @Column(name = "lastname", nullable = false,length = 50)
    private String lastname;
    @Column(name = "email", nullable = false,length = 50)
    private String email;
    @Column(name = "password", nullable = false,length = 100)
    private String password;
    @Column(name = "role", nullable = false,length = 50)
    private String role;
    @Column(name = "phone", nullable = false,length = 50)
    private String phone;
    @Column(name = "address", nullable = false,length = 50)
    private String address;
    @Column(name = "commune", nullable = false,length = 50)
    private String commune;
}
