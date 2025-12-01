package duocuc.cl.rodrigo.carniverocrud.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table( name="compras")
public class CompraDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_purchase", updatable = false, nullable = false)
    private Integer id;
    @Column(name = "id_user", nullable = false,length = 50)
    private String idUser;
    @Column(name = "id_planta", nullable = false)
    private Integer idPlanta;
    @Column(name = "price", nullable = false)
    private int price;
    @Column(name = "quantity", nullable = false)
    private int quantity;
    @Column(name = "total_purchase", nullable = false)
    private int total;
    @Column(name = "purchase_date")
    private LocalDateTime purchasedate;

    public CompraDB() {
        this.purchasedate = LocalDateTime.now();
    }

}
