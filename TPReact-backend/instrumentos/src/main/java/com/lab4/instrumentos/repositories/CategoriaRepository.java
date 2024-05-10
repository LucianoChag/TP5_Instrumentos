package com.lab4.instrumentos.repositories;

import com.lab4.instrumentos.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
