package duocuc.cl.rodrigo.carniverocrud.models;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Planta {
    private int id;
    private String name;
    private int price;
    private String image;
    private String size;
    private String  planting;
    private String description;
    private int stock;
}
