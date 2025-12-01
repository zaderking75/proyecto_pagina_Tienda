package duocuc.cl.rodrigo.carniverocrud.service;

import duocuc.cl.rodrigo.carniverocrud.controller.request.CompraRequest;
import duocuc.cl.rodrigo.carniverocrud.repository.CompraDB;
import duocuc.cl.rodrigo.carniverocrud.repository.CompraJpaRepository;
import duocuc.cl.rodrigo.carniverocrud.repository.PlantaDB;
import duocuc.cl.rodrigo.carniverocrud.repository.PlantaJpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompraService {
    @Autowired
    private CompraJpaRepository compraJpaRepository;
    @Autowired
    private PlantaJpaRepository plantaJpaRepository;

    @Transactional
    public CompraDB registerPurchase(CompraRequest request) {
        PlantaDB planta = plantaJpaRepository.findById(request.getIdPlanta())
                .orElseThrow(() -> new RuntimeException("Planta no encontrada"));
        if (planta.getStock() < request.getQuantity()) {
            throw new RuntimeException("Stock insuficiente.");
        }
        int nuevoStock = planta.getStock() - request.getQuantity();
        planta.setStock(nuevoStock);

        plantaJpaRepository.save(planta);

        CompraDB nuevaCompra = new CompraDB();
        nuevaCompra.setIdUser(request.getIdUser());
        nuevaCompra.setIdPlanta(request.getIdPlanta());
        nuevaCompra.setQuantity(request.getQuantity());
        nuevaCompra.setPrice(planta.getPrice());
        nuevaCompra.setTotal(planta.getPrice() * request.getQuantity());

        return compraJpaRepository.save(nuevaCompra);
    }

    public CompraDB getPurchase(Integer id) {
        return compraJpaRepository.findById(id).orElseThrow(()-> new RuntimeException("Compra  con el id: " + id + " no existe."));
    }

}
