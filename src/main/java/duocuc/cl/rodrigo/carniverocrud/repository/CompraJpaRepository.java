package duocuc.cl.rodrigo.carniverocrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CompraJpaRepository extends JpaRepository<CompraDB,Integer> {

}
