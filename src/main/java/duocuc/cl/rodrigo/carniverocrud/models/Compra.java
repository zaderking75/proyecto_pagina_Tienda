package duocuc.cl.rodrigo.carniverocrud.models;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Compra {
    private Integer id;
    private String idUser;
    private Integer idPlanta;
    private int price;
    private int quantity;
    private int total;
    private LocalDateTime purchasedate;
}
