package duocuc.cl.rodrigo.carniverocrud.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlantaResponse {
    private int id;
    private String name;
    private int price;
    private String image;
    private String size;
    private String  planting;
    private String description;
    private int stock;
}
