package duocuc.cl.rodrigo.carniverocrud.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CompraRequest {
    private String idUser;
    private Integer idPlanta;
    private int quantity;

}
