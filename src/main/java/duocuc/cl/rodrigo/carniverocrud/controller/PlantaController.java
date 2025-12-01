package duocuc.cl.rodrigo.carniverocrud.controller;

import duocuc.cl.rodrigo.carniverocrud.controller.request.PlantaRequest;
import duocuc.cl.rodrigo.carniverocrud.controller.response.PlantaResponse;
import duocuc.cl.rodrigo.carniverocrud.repository.PlantaDB;
import duocuc.cl.rodrigo.carniverocrud.service.PlantaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/planta/api")
@CrossOrigin(origins = "*")
public class PlantaController {
    @Autowired
    private PlantaService plantaService;

    @PutMapping("/{id}/{stock}")
    public ResponseEntity<?> addStock(@PathVariable int id,@PathVariable int stock){
        try{
            PlantaDB plantaactualizada= plantaService.addstockplanta(stock,id);
            return ResponseEntity.ok(plantaactualizada);

        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<PlantaResponse>> getAllPlanta(){
        List<PlantaDB> plantas=plantaService.getAllPlantas();
        List<PlantaResponse> plantasResponse=plantas.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(plantasResponse);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPlantaById(@PathVariable int id){
        try{
            PlantaDB planta=plantaService.getPlantaById(id);
            return ResponseEntity.ok(mapToResponse(planta));
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PostMapping
    public ResponseEntity<?> registerPlanta(@RequestBody PlantaRequest request) {
        try {
            PlantaDB planta = plantaService.registerNewPlanta(request);
            return new ResponseEntity<>(planta, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanta(@PathVariable Integer id) {
        boolean deleted = plantaService.deletePlantaById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }





    private PlantaResponse mapToResponse(PlantaDB db) {
        return new PlantaResponse(
                db.getId(),
                db.getName(),
                db.getPrice(),
                db.getImage(),
                db.getSize(),
                db.getPlanting(),
                db.getDescription(),
                db.getStock()
        );
    }


}
