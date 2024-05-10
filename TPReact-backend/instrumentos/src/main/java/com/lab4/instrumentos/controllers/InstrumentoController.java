package com.lab4.instrumentos.controllers;

import com.lab4.instrumentos.entities.Instrumento;
import com.lab4.instrumentos.services.InstrumentoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/instrumentos")
public class InstrumentoController {

    @Autowired
    private InstrumentoService instrumentoService;

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

}
