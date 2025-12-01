package duocuc.cl.rodrigo.carniverocrud.controller.request;

import lombok.*;
@Getter
@Setter
@Data
@NoArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
}
