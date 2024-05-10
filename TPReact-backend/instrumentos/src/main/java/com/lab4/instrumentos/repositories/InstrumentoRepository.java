package com.lab4.instrumentos.repositories;

import com.lab4.instrumentos.entities.Categoria;
import com.lab4.instrumentos.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {

    // Método para buscar instrumentos por categoría
    List<Instrumento> findByCategoria(Categoria categoria);
}
