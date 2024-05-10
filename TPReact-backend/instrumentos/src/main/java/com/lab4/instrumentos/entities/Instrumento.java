package com.lab4.instrumentos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "instrumento")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String instrumento;
    @Column
    private String marca;
    @Column
    private String modelo;
    @Column
    private String imagen;
    @Column
    private double precio;
    @Column
    private String costoEnvio;
    @Column
    private int cantidadVendida;
    @Column
    private String descripcion;
    @Column
    private boolean activo;
    @ManyToOne
    @JoinColumn(name = "categoria_fk")
    private Categoria idCategoria;
}
