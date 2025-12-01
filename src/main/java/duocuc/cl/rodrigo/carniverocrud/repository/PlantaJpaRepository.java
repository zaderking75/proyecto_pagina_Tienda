package duocuc.cl.rodrigo.carniverocrud.repository;


import duocuc.cl.rodrigo.carniverocrud.models.Planta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlantaJpaRepository extends JpaRepository<PlantaDB, Integer> {
    Optional<PlantaDB> findByName(String name);
}
