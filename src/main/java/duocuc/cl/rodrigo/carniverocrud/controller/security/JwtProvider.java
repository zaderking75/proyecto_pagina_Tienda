package duocuc.cl.rodrigo.carniverocrud.controller.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

    // Se carga desde application.properties
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;


    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // El usuario (email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L)) // Calcula expiración
                .signWith(getSigningKey(), SignatureAlgorithm.HS512) // Firma el token con la clave secreta
                .compact();
    }


    public String getEmailFromJwt(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            // Error si la firma es incorrecta (token manipulado)
            return false;
        } catch (MalformedJwtException e) {
            // Error si el token no tiene el formato correcto
            return false;
        } catch (ExpiredJwtException e) {
            // Error si el token ha expirado (el más común)
            return false;
        } catch (UnsupportedJwtException e) {
            return false;

        } catch (IllegalArgumentException e) {
            // Error si el token es nulo o vacío
            return false;
        }
    }
}
