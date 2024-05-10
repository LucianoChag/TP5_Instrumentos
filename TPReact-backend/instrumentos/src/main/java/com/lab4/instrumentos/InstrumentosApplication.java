package com.lab4.instrumentos;

import com.lab4.instrumentos.entities.Categoria;
import com.lab4.instrumentos.entities.Instrumento;
import com.lab4.instrumentos.services.CategoriaService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InstrumentosApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstrumentosApplication.class, args);
	}

	/*@Bean
	public CommandLineRunner initData(CategoriaService categoriaService) {
		return args -> {
			Categoria cuerda = new Categoria("Cuerda");
			Categoria viento = new Categoria("Viento");
			Categoria percusion = new Categoria("Percusión");
			Categoria teclado = new Categoria("Teclado");
			Categoria electronico = new Categoria("Electrónico");

			categoriaService.guardarCategoria(cuerda);
			categoriaService.guardarCategoria(viento);
			categoriaService.guardarCategoria(percusion);
			categoriaService.guardarCategoria(teclado);
			categoriaService.guardarCategoria(electronico);
		};
	}*/

}
