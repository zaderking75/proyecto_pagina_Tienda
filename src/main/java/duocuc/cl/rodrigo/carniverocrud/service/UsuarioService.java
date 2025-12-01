package duocuc.cl.rodrigo.carniverocrud.service;

import duocuc.cl.rodrigo.carniverocrud.controller.request.AuthRequest;
import duocuc.cl.rodrigo.carniverocrud.controller.request.RegisterRequest;
import duocuc.cl.rodrigo.carniverocrud.controller.security.JwtProvider;
import duocuc.cl.rodrigo.carniverocrud.repository.UsuarioDB;
import duocuc.cl.rodrigo.carniverocrud.repository.UsuarioJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioJpaRepository usuarioJpaRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    public String login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2. Si la autenticación fue exitosa, la guarda en el contexto
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Genera el JWT usando el email (Subject)
        return jwtProvider.generateToken(request.getEmail());
    }
    public UsuarioDB registrarUsuario(RegisterRequest request) {

        if (usuarioJpaRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 1. Creamos la Entidad (UsuarioDB) y mapeamos los campos
        UsuarioDB usuario = new UsuarioDB();
        usuario.setName(request.getName());
        usuario.setLastname(request.getLastname());
        usuario.setEmail(request.getEmail());
        usuario.setPhone(request.getPhone());
        usuario.setAddress(request.getAddress());
        usuario.setCommune(request.getCommune());

        // 2. Encriptamos y guardamos la clave
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));

        // 3. Establecer defaults (Role, Activo)
        usuario.setRole("CLIENTE");

        return usuarioJpaRepository.save(usuario);
    }

    public UsuarioDB getUsuarioById(Integer id) {
        return usuarioJpaRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    public UsuarioDB getUsuarioByEmail(String email) {
        return usuarioJpaRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email no encontrado"));
    }


}
