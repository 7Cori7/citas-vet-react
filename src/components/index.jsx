import './citasV.css';
import { useState } from 'react';
import deleteIcon from '/delete-icon.svg'; 
import editIcon from '/edit-icon.svg';
import Edit from './Edit.jsx';

export default function CitasVet(){

    const [citas, setCitas] = useState([]);
    const [pet, setPet] = useState('');
    const [owner, setOwner] = useState('');
    const [telf, setTelf] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [update, setUpdate] = useState('');
    const [alert, setAlert] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alertColor, setAlertColor] = useState('red');

    const hoy = new Date().toISOString().split('T')[0];
    const h = new Date().getHours().toString();
    const m = new Date().getMinutes().toString();

    let time = `${h}:${m}`;

    let text;

    function addCita(e){

        e.preventDefault();

        if(!pet || !owner || !telf || !fecha || !hora){

            text = 'Todos los campos deben estar llenos';
            mostrarMensajeError(text);

        }else if(fecha < hoy){

            text = 'No puedes hacer una cita para fechas pasadas';
            mostrarMensajeError(text);

        }else if((fecha === hoy && time === hora) || (fecha === hoy && time > hora)){

            text = 'Hora inválida';
            mostrarMensajeError(text);

        }else if(hora.split(':')[0] < '07' || hora.split(':')[0] > '17'){

            text = 'Trabajamos de 7:00 a 17:00';
            mostrarMensajeError(text);

        }else{

            const obj = {
                id: crypto.randomUUID(),
                mascota: pet,
                dueño: owner,
                telf: telf,
                fecha: fecha,
                hora: hora,
                sintomas: sintomas
            }

            setCitas(c => [...c, obj]);

            resetForm();

            text = 'Se ha creado la cita!';

            mostrarMensaje(text);
        }
    }

    function resetForm(){
        setPet('');
        setOwner('');
        setTelf('');
        setFecha('');
        setHora('');
        setSintomas('');
    }

    function editarCita(id){

        setUpdate(u => u = id);
    }

    function borrarCita(id){

        const confirmar = confirm('¿Está seguro de que desea borrar la cita?');

        if(confirmar){
            const updateCita = citas.filter(i => i.id !== id);
            setCitas(updateCita);
            text = 'Se ha borrado la cita correctamente!';
            mostrarMensaje(text);
        }
    }

    function handleUpdate(e){
        e.preventDefault();
        setUpdate('');
        text = 'Se ha editado la cita con éxito!'
        mostrarMensaje(text);
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

                <form onSubmit={(e)=>addCita(e)}>

                    <h3>Haga su cita</h3>
                    
                    <div className='row'>
                        <label htmlFor="mascota">Nombre Mascota:</label>
                        <input type="text" name='mascota' value={pet} onChange={(e)=>setPet(p=>p=e.target.value)} placeholder='Nombre de Mascota' />
                    </div>

                    <div className='row'>
                        <label htmlFor="dueño">Dueño:</label>
                        <input type="text" name='dueño' value={owner} onChange={(e)=>setOwner(o=>o=e.target.value)} placeholder='Nombre del Dueño' />
                    </div>

                    <div className='row'>
                        <label htmlFor="telf">Teléfono:</label>
                        <input type="tel" name='telefono' value={telf} onChange={(e)=>setTelf(t=>t=e.target.value)} placeholder='Número de Teléfono' />
                    </div>

                    <div className='row'>
                        <label htmlFor="fecha">Fecha:</label>
                        <input type="date" min={hoy} name='fecha' value={fecha} onChange={(e)=>setFecha(f=>f=e.target.value)} />
                    </div>

                    <div className='row'>
                        <label htmlFor="hora">Hora:</label>
                        <input type="time" name='hora' value={hora} onChange={(e)=>setHora(h=>h=e.target.value)} />
                    </div>

                    <div className='row-text-area'>
                        <label htmlFor="sintomas">Síntomas:</label>
                        <textarea name='sintomas' placeholder='Escriba los síntomas' value={sintomas} onChange={(e)=>setSintomas(s=>s=e.target.value)} />
                    </div>

                    <div className='btn-row'>
                        <button type='submit'>Crear Cita</button>
                    </div>
    
                </form>

                <div className='bandeja-citas'>

                    <h3>Administre sus citas</h3>

                    {
                        citas && citas.length && citas.length > 0
                        ? citas.map(cita => (

                            update === cita.id

                            ? <div className='cita-tarjeta'><Edit cita={cita} citas={citas} setCitas={setCitas} handleUpdate={handleUpdate} /></div>

                            :<div key={cita.id} className='cita-tarjeta'>

                                <h2>{cita.mascota}</h2>
                                <p>Dueño: <span>{cita.dueño}</span></p>
                                <p>Fecha: <span>{cita.fecha}</span></p>
                                <p>Hora: <span>{cita.hora}</span></p>
                                <p>Síntomas: <span>{cita.sintomas}</span></p>

                                <div className='btns-row'>
                                    <button className='eliminar' onClick={()=>borrarCita(cita.id)}>Eliminar <img src={deleteIcon} width={'30'} /></button>
                                    <button className='editar' onClick={()=>editarCita(cita.id)}>Editar <img src={editIcon} width={'30'}  /></button>
                                </div>

                            </div>
                        ))
                        : null
                    }
                </div>

            </div>

        </div>

    </>);
};