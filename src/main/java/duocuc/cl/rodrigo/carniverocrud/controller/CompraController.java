package duocuc.cl.rodrigo.carniverocrud.controller;

import duocuc.cl.rodrigo.carniverocrud.controller.request.CompraRequest;
import duocuc.cl.rodrigo.carniverocrud.models.Compra;
import duocuc.cl.rodrigo.carniverocrud.repository.CompraDB;
import duocuc.cl.rodrigo.carniverocrud.repository.CompraJpaRepository;
import duocuc.cl.rodrigo.carniverocrud.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/purchase/api")
@CrossOrigin(origins = "*")
public class CompraController {
    @Autowired
    private CompraService compraService;
    @Autowired
    private CompraJpaRepository compraJpaRepository;
    @PostMapping
    public ResponseEntity<?> createPurchase(@RequestBody CompraRequest compraRequest) {
        try{
            CompraDB nuevaCompra = compraService.registerPurchase(compraRequest);

            return ResponseEntity.ok(nuevaCompra);
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPurchasebyId(@PathVariable Integer id) {
        try{
            CompraDB nuevaCompra = compraService.getPurchase(id);
            return ResponseEntity.ok(nuevaCompra);

        }catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<?> getAllPurchases() {
        return ResponseEntity.ok(compraJpaRepository.findAll());
    }

}
