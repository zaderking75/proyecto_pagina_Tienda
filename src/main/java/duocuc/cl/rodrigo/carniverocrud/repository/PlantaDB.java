package duocuc.cl.rodrigo.carniverocrud.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="plantas")
public class PlantaDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Integer id;
    @Column(name = "name", nullable = false,length = 50)
    private String name;
    @Column(name = "price", nullable = false)
    private int price;
    @Column(name = "image", nullable = false, length = 100)
    private String image;
    @Column(name = "size",nullable = false, length = 100)
    private String size;
    @Column(name = "planting", nullable = false, length = 100)
    private String  planting;
    @Column(name = "description", nullable = false, length = 200)
    private String description;
    @Column(name = "stock", nullable = false)
    private Integer stock;
}
