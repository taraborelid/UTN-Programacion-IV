package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiante;
import utn.estudiantes.repositorio.EstudianteRepositorio;

import java.util.List;

public class EstudianteServicio implements IEstudianteServicio {

    @Override
    public List<Estudiante> listarEstudiantes() {
        return List.of();
    }

    @Override
    public Estudiante buscarEstudiantePorId(Integer idEstudiante) {
        return null;
    }

    @Override
    public void guardarEstudiante(Estudiante estudiante) {

    }

    @Override
    public void eliminarEstudiante(Estudiante estudiante) {

    }
}
