package repositorio;

import documentos.Usuarios;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioUsuario extends MongoRepository<Usuarios, String> {
    // Método para encontrar un usuario por su email
    Usuarios findByEmail(String email);
}
