package com.lab4.instrumentos.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table (name = "categoria")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String denominacion;

    public Categoria(String denominacion) {
        this.denominacion = denominacion;
    }
}
