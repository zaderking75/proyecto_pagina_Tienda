package duocuc.cl.rodrigo.carniverocrud.controller;


import duocuc.cl.rodrigo.carniverocrud.controller.request.AuthRequest;
import duocuc.cl.rodrigo.carniverocrud.controller.request.RegisterRequest;
import duocuc.cl.rodrigo.carniverocrud.controller.response.AuthResponse;
import duocuc.cl.rodrigo.carniverocrud.repository.UsuarioDB;
import duocuc.cl.rodrigo.carniverocrud.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/user/api")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest loginRequest) {
        try {
            String jwtToken = usuarioService.login(loginRequest);
            UsuarioDB usuario = usuarioService.getUsuarioByEmail(loginRequest.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("user", usuario);
            response.put("message", "Login exitoso");
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Credenciales incorrectas o usuario no encontrado."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error de autenticación: " + e.getMessage()));
        }
    }
    @PostMapping("/register")
    public ResponseEntity<UsuarioDB> register(@RequestBody RegisterRequest request) {
        try {
            UsuarioDB nuevoUsuario = usuarioService.registrarUsuario(request);
            return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


}
