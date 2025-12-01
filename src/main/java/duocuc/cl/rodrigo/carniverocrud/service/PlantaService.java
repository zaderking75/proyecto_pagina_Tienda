package duocuc.cl.rodrigo.carniverocrud.service;

import duocuc.cl.rodrigo.carniverocrud.controller.request.PlantaRequest;
import duocuc.cl.rodrigo.carniverocrud.models.Planta;
import duocuc.cl.rodrigo.carniverocrud.repository.PlantaDB;
import duocuc.cl.rodrigo.carniverocrud.repository.PlantaJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlantaService {
    @Autowired
    private PlantaJpaRepository plantaJpaRepository;

    public PlantaJpaRepository getPlantaJpaRepository() {
        return plantaJpaRepository;
    }

    public PlantaDB registerNewPlanta(PlantaRequest planta) {
        Optional<PlantaDB> plantabuscar=plantaJpaRepository.findByName(planta.getName());
        if(plantabuscar.isPresent()) {
            throw new RuntimeException("Planta ya existe");
        }
        PlantaDB plantaDB = new PlantaDB();
        plantaDB.setName(planta.getName());
        plantaDB.setPrice(planta.getPrice());
        plantaDB.setDescription(planta.getDescription());
        plantaDB.setImage(planta.getImage());
        plantaDB.setPlanting(planta.getPlanting());
        plantaDB.setSize(planta.getSize());
        plantaDB.setStock(planta.getStock());
        return plantaJpaRepository.save(plantaDB);
    }
    public PlantaDB addstockplanta(int stock,int plantaid) {
        PlantaDB planta = plantaJpaRepository.findById(plantaid)
                .orElseThrow(() -> new RuntimeException("Planta no encontrada con id: " + plantaid));
        int nuevoStock = planta.getStock() + stock;
        planta.setStock(nuevoStock);

        return plantaJpaRepository.save(planta);
    }
    public List<PlantaDB> getAllPlantas() {
        return plantaJpaRepository.findAll();
    }
    public PlantaDB getPlantaById(int id) {
        return plantaJpaRepository.findById(id).orElseThrow(() -> new RuntimeException("Planta no encontrada con id: " + id));

    }
    public boolean deletePlantaById(int id) {
        Optional<PlantaDB> plantabuscar=plantaJpaRepository.findById(id);
        if(plantabuscar.isPresent()) {
            plantaJpaRepository.delete(plantabuscar.get());
            return true;
        }
        return false;
    }
}
