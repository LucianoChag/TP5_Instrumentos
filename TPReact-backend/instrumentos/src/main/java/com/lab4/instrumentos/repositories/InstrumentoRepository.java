package com.lab4.instrumentos.repositories;

import com.lab4.instrumentos.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {
}
