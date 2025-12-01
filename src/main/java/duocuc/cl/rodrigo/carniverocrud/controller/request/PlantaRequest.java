package duocuc.cl.rodrigo.carniverocrud.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PlantaRequest {
    private String name;
    private int price;
    private String image;
    private String size;
    private String  planting;
    private String description;
    private int stock;
}
