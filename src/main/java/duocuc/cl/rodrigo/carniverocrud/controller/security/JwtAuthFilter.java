package duocuc.cl.rodrigo.carniverocrud.controller.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserDetailsService userDetailsService; // Necesitas la clase UserDetailsServiceImpl que crearemos después

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // 1. Obtener el token del encabezado 'Authorization'
        String authHeader = request.getHeader("Authorization");
        String jwt = null;
        String userEmail = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7); // "Bearer " tiene 7 caracteres
            try {
                // 2. Extraer el email del token (usando el JwtProvider que creamos antes)
                userEmail = jwtProvider.getEmailFromJwt(jwt);
            } catch (Exception e) {
                logger.error("No se pudo obtener el email del token o el token está expirado/inválido.");
            }
        }

        // 3. Si encontramos el email y el usuario AÚN NO está autenticado en el contexto
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 4. Cargar los detalles del usuario desde la BD
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            // 5. Si el token es válido (usando el método validateToken de JwtProvider)
            if (jwtProvider.validateToken(jwt)) {

                // 6. Crear el objeto de autenticación de Spring Security
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities() // Aquí irían los roles (ADMIN/USER)
                );

                // 7. Establecer detalles de la autenticación web
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 8. AUTENTICAR: Guardar la autenticación en el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 9. Continuar con la cadena de filtros (dejar pasar la solicitud)
        filterChain.doFilter(request, response);
    }
}
