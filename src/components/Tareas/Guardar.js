import React from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { Redirect } from "react-router-dom";

class Guardar extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma,
    } = this.props;

    if ((usu_id, tar_id)) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }

  cambioUsuarioId = (e) => {
    this.props.cambioUsuarioId(e.target.value);
  };

  cambioTitulo = (e) => {
    this.props.cambioTitulo(e.target.value);
  };

  guardar = () => {
    const {
      usuario_id,
      titulo,
      agregar,
      tareas,
      editar,
      match: {
        params: { usu_id, tar_id },
      },
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id,
      };

      editar(tarea_editada);
    } else {
      agregar(nueva_tarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;

    if (cargando) {
      return true;
    }

    if (!usuario_id || !titulo) {
      return true;
    }

    return false;
  };

  mostrarAccion = () => {
    const { error, cargando } = this.props;

    if (cargando) {
      return <Spinner />;
    }

    if (error) {
      return <Fatal mensaje={error} />;
    }
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar tareas</h1>
        Usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        Título:
        <input value={this.props.titulo} onChange={this.cambioTitulo} />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);