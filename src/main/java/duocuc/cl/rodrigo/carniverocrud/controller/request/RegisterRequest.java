package duocuc.cl.rodrigo.carniverocrud.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String commune;
}
