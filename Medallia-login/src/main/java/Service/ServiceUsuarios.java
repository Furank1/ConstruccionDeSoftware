package Service;

import documentos.Usuarios;
import repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServiceUsuarios {

    @Autowired
    private RepositorioUsuario usuarioRepositorio;

    public Optional<Usuarios> login(String email, String password) {
        Usuarios usuario = usuarioRepositorio.findByEmail(email);
        if (usuario != null && usuario.getPassword().equals(password)) {
            return Optional.of(usuario);
        }
        return Optional.empty();
    }
}
