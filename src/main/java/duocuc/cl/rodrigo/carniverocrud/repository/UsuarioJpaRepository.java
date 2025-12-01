package duocuc.cl.rodrigo.carniverocrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioJpaRepository  extends JpaRepository<UsuarioDB, Integer> {
    Optional<UsuarioDB> findByEmail(String email);
    Optional<UsuarioDB> findByEmailAndPassword(String email, String password);

}
