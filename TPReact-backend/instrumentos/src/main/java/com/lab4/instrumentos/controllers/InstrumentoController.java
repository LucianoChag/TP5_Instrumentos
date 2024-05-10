package com.lab4.instrumentos.controllers;
import com.lab4.instrumentos.entities.Categoria;
import com.lab4.instrumentos.entities.Instrumento;
import com.lab4.instrumentos.services.InstrumentoService;
import com.lab4.instrumentos.services.CategoriaService; // Importar el servicio de Categoria
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/instrumentos")
public class InstrumentoController {

    @Autowired
    private InstrumentoService instrumentoService;

    @Autowired
    private CategoriaService categoriaService; // Inyectar el servicio de Categoria

    @GetMapping
    public List<Instrumento> obtenerTodosInstrumentos() {
        return instrumentoService.obtenerInstrumentos();
    }

    @GetMapping("/{id}")
    public Instrumento obtenerInstrumentoPorId(@PathVariable Long id) {
        return instrumentoService.obtenerInstrumentoPorId(id)
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado con ID: " + id));
    }

    @PostMapping
    public Instrumento crearInstrumento(@RequestBody Instrumento instrumento) {
        return instrumentoService.guardarInstrumento(instrumento);
    }

    @PutMapping("/{id}")
    public Instrumento actualizarInstrumento(@PathVariable Long id, @RequestBody Instrumento instrumentoActualizado) {
        return instrumentoService.actualizarInstrumento(id, instrumentoActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarInstrumento(@PathVariable Long id) {
        instrumentoService.eliminarInstrumentoPorId(id);
    }

    // Endpoint para buscar instrumentos por categoría
    @GetMapping("/por-categoria")
    public List<Instrumento> buscarPorCategoria(@RequestParam Long categoriaId) {
        // Obtener la categoría por su ID utilizando el servicio de Categoria
        Categoria categoria = categoriaService.obtenerCategoriaPorId(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + categoriaId));
        return instrumentoService.buscarPorCategoria(categoria);
    }
}
