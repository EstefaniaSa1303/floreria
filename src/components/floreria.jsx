import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/style.css'

const floreria = () => {
    const [floreria, setflor] = useState([])
    const [nombre_flor_fany, setnomflor] = useState('');
    const [tipo_flor_fany, setTipo] = useState('');
    const [precio_flor_fany, setprecio] = useState('');
    const [id_floreria_fany, setidfloreria] = useState('');
    const [mostraBoton, setMostrarBoton] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3003/floreria')
            .then((response) => response.json())
            .then((data) => setflor(data))
            .catch((error) => console.log('Error al obtener productos', error))

    }, [])


    const eliminar = async (id_floreria_fany) => {
        fetch(`http://localhost:3003/eliminar/${id_floreria_fany}`, {
            method: 'DELETE',
        })
            .then(data => {
                console.log(data)
            })
            .catch((error) => console.log('Error al eliminar bebida', error))
        window.location.reload(true)

    }
    const guardarDatos = (data) => {
        console.log(data.nombre_flor_fany);
        setnomflor(data.nombre_flor_fany)
        setTipo(data.tipo_flor_fany)
        setprecio(data.precio_flor_fany)
    }
    const editar = (id_floreria_fany) => {
        setidfloreria(id_floreria_fany)
        setMostrarBoton(true)
        fetch(`http://localhost:3003/floreria/${id_floreria_fany}`)
            .then((response) => response.json())
            .then((data) => guardarDatos(data[0]))
            .catch((error) => console.log('Error al obtener productos', error))
    }

    const volverCargar = () => {
        window.location.reload(true)
    }

    const insertar = (e) => {
        e.preventDefault()
        console.log(nombre_flor_fany, tipo_flor_fany, precio_flor_fany)

        const data = {
            nombre_flor_fany: nombre_flor_fany,
            tipo_flor_fany: tipo_flor_fany,
            precio_flor_fany: precio_flor_fany
        };

        fetch('http://localhost:3003/agregarB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar la cita');
                }
                return response.json();
            })
            .then(result => {
                console.log(result.message);
            })
            .catch(error => {
                console.error('Error al agregar la cita', error);
            });
        volverCargar()

    }

    const editarDatos = (e) => {
        e.preventDefault();
        console.log(nombre_flor_fany, tipo_flor_fany, precio_flor_fany)
        const data = {
            nombre_flor_fany: nombre_flor_fany,
            tipo_flor_fany: tipo_flor_fany,
            precio_flor_fany: precio_flor_fany
        };

        fetch(`http://localhost:3003/editar/${id_floreria_fany}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la cita');
                }
                return response.json();
            })
            .then(result => {
                console.log(result.message);
            })
            .catch(error => {
                console.error('Error al actualizar la cita', error);
            });
        volverCargar()
    }

    return (
        <div >
            <div className="capa"></div>
            <div className="titu" >

                <h1 className='titulo'>FLORERIA</h1>
          
            </div>
            <div className='formu'>
                <div>
                    <h3 className='tiuform'>Floreria</h3>
                </div>
                <div class="form-group">
                    <input type="text" className='nombe' placeholder='Nombre Flor'
                        value={nombre_flor_fany}
                        onChange={(e) => setnomflor(e.target.value)}
                    />
                </div>
                <div class="form-group">
                    <input type="text" className='tipo' placeholder='Tipo'
                        value={(tipo_flor_fany)}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                </div>
                <div class="form-group">
                </div>
                <div class="form-group">
                    <input type="text" className='precio' placeholder='Precio'
                        value={precio_flor_fany}
                        onChange={(e) => setprecio(e.target.value)}
                    />
                </div>

                {!mostraBoton ? <button onClick={insertar} className='nuevaflor'>Cita Nueva</button> : null}

                {mostraBoton ? <button onClick={editarDatos} className='editflor'>Editar Cita</button> : null}



            </div>
            <div className='textt'>
                <div className='titfor'>
                    <h2 className='regis'>FLORES</h2>
                </div>
            </div>
           


            {
                floreria.map((florer) => {

                    return (

                        <div>
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"></link>


                            <div className='cita'>

                                <div>
                                    <div className='contenido'>
                                        <h2 className='flo'> Flor</h2>
                                        <h2 className='idflo'>{florer.id_floreria_fany}</h2>
                                        <h2 className='nom'> {florer.nombre_flor_fany}</h2>
                                        <h2 className='tip'> {florer.tipo_flor_fany}</h2>
                                        <h2 className='pre'> {florer.precio_flor_fany}</h2>
                                        <button className='btnedit' onClick={() => editar(florer.id_floreria_fany)}>Editar</button>
                                        <button className='btnelim' onClick={() => eliminar(florer.id_floreria_fany)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                }


                )
            }

        </div>



    )
}

export default Bebidas