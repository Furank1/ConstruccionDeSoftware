package controller;

import documentos.Usuarios;
import domain.CuentaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repositorio.RepositorioUsuario;

@RestController
@RequestMapping("/Usuarios")
public class ControladorUsuario {

    @Autowired
    private RepositorioUsuario usuarioRepo;
    @CrossOrigin(origins = "*")

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody CuentaDTO cuentaDTO) {
        System.out.println("flag");
        try {
            Usuarios usuario = usuarioRepo.findByEmail(cuentaDTO.getEmail());

            if (usuario == null) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            if (!usuario.getPassword().equals(cuentaDTO.getPassword())) {
                return new ResponseEntity<>("Contraseña incorrecta", HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}