package duocuc.cl.rodrigo.carniverocrud.controller.response;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String message;
}
