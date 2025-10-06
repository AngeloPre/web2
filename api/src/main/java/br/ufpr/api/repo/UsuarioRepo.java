package br.ufpr.api.repo;

import org.springframework.data.repository.CrudRepository;

import br.ufpr.api.model.Usuario;

public interface UsuarioRepo extends CrudRepository<Usuario, Integer> {
	
}
