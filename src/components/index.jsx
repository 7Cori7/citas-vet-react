import './citasV.css';
import { useState } from 'react';
import Edit from './Edit.jsx';
import CitaCard from './citaCard.jsx';
import FormVet from './form.jsx';

export default function CitasVet(){

    const [citas, setCitas] = useState([]);
    const [update, setUpdate] = useState('');
    const [alert, setAlert] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alertColor, setAlertColor] = useState('red');

    function editarCita(id){

        setUpdate(u => u = id);
    }

    function borrarCita(id){

        const confirmar = confirm('¿Está seguro de que desea borrar la cita?');

        if(confirmar){
            const updateCita = citas.filter(i => i.id !== id);
            setCitas(updateCita);
            mostrarMensaje('Se ha borrado la cita correctamente!');
        }
    }

    function handleUpdate(e){
        e.preventDefault();
        setUpdate('');
        mostrarMensaje('Se ha editado la cita con éxito!');
    }

    function mostrarMensajeError(texto){

        setAlert(a => a = true);
        setMensaje(m => m = texto);  
        quitarAlert();
    }

    function mostrarMensaje(texto){

        setAlert(a=>a=true);
        setMensaje(m => m = texto);
        setAlertColor(c=>c='rgb(0, 177, 0)');
        quitarAlert();
    }

    function quitarAlert(){

        setTimeout(()=>{
            setAlert(a=>a=false);
            setAlertColor(c=>c='red');
        },2000);
    }

    return(<>

        <div className='citas-body'>

            {
                alert ?
                <div className='mensaje' style={{backgroundColor: alertColor}}>
                    <p>{mensaje}</p>
                </div>
                :null
            }
            
            <h1>Citas Veterinarias</h1>

            <div className='citas-form'>

                <FormVet setCitas={setCitas} mostrarMensajeError={mostrarMensajeError} mostrarMensaje={mostrarMensaje}  />

                <div className='bandeja-citas'>

                    <h3>Administre sus citas</h3>

                    {
                        citas && citas.length && citas.length > 0
                        ? citas.map((cita, index) => (

                            update === cita.id

                            ? <div key={index} className='cita-tarjeta'><Edit cita={cita} citas={citas} setCitas={setCitas} handleUpdate={handleUpdate} /></div>

                            : <CitaCard key={index} cita={cita} borrarCita={borrarCita} editarCita={editarCita} />
                            
                        ))
                        : null
                    }
                </div>

            </div>

        </div>

    </>);
};