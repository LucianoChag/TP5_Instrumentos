package com.lab4.instrumentos.services;

import com.lab4.instrumentos.entities.Categoria;
import com.lab4.instrumentos.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    // Método para guardar una categoría
    public Categoria guardarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Método para obtener todas las categorías
    public List<Categoria> obtenerTodasCategorias() {
        return categoriaRepository.findAll();
    }

    // Método para obtener una categoría por su ID
    public Optional<Categoria> obtenerCategoriaPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    // Método para actualizar una categoría
    public Categoria actualizarCategoria(Long id, Categoria categoriaActualizada) {
        if (categoriaRepository.existsById(id)) {
            categoriaActualizada.setId(id);
            return categoriaRepository.save(categoriaActualizada);
        } else {
            throw new RuntimeException("La categoría no se puede actualizar porque no existe.");
        }
    }

    // Método para eliminar una categoría por su ID
    public void eliminarCategoriaPorId(Long id) {
        if (categoriaRepository.existsById(id)) {
            categoriaRepository.deleteById(id);
        } else {
            throw new RuntimeException("La categoría no se puede eliminar porque no existe.");
        }
    }
}
