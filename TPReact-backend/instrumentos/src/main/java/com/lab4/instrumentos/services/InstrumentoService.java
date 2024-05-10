package com.lab4.instrumentos.services;

import com.lab4.instrumentos.entities.Categoria;
import com.lab4.instrumentos.entities.Instrumento;
import com.lab4.instrumentos.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstrumentoService {
    
    @Autowired
    private InstrumentoRepository instrumentoRepository;
    
    public InstrumentoService (InstrumentoRepository instrumentoRepository) {
        this.instrumentoRepository = instrumentoRepository;
    }

    // Método para guardar una categoría
    public Instrumento guardarInstrumento(Instrumento instrumento) {
        return instrumentoRepository.save(instrumento);
    }

    // Método para obtener todas las categorías
    public List<Instrumento> obtenerInstrumentos() {
        return instrumentoRepository.findAll();
    }

    // Método para obtener una categoría por su ID
    public Optional<Instrumento> obtenerInstrumentoPorId(Long id) {
        return instrumentoRepository.findById(id);
    }

    // Método para actualizar una categoría
    public Instrumento actualizarInstrumento(Long id, Instrumento instrumentoActualizada) {
        if (instrumentoRepository.existsById(id)) {
            return instrumentoRepository.save(instrumentoActualizada);
        } else {
            throw new RuntimeException("La categoría no se puede actualizar porque no existe.");
        }
    }

    // Método para eliminar una categoría por su ID
    public Instrumento eliminarInstrumentoPorId(Long id) {
        if (instrumentoRepository.existsById(id)) {
            Optional<Instrumento> instrumentoEliminado = obtenerInstrumentoPorId(id);
            instrumentoEliminado.get().setActivo(false);
            return instrumentoRepository.save(instrumentoEliminado.get());
        } else {
            throw new RuntimeException("La categoría no se puede eliminar porque no existe.");
        }
    }

    // Método para buscar instrumentos por categoría
    public List<Instrumento> buscarPorCategoria(Categoria categoria) {
        return instrumentoRepository.findByCategoria(categoria);
    }
    
}
