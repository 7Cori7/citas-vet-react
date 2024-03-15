import { useState } from "react";

export default function FormVet({setCitas, mostrarMensaje, mostrarMensajeError}){

    const [pet, setPet] = useState('');
    const [owner, setOwner] = useState('');
    const [telf, setTelf] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [sintomas, setSintomas] = useState('');

    const hoy = new Date().toISOString().split('T')[0];
    const h = new Date().getHours().toString();
    const m = new Date().getMinutes().toString();

    let time = `${h}:${m}`;

    function addCita(e){

        e.preventDefault();

        if(!pet || !owner || !telf || !fecha || !hora){

            mostrarMensajeError('Todos los campos deben estar llenos');

        }else if(fecha < hoy){

            mostrarMensajeError('No puedes hacer una cita para fechas pasadas');

        }else if((fecha === hoy && time === hora) || (fecha === hoy && time > hora)){

            mostrarMensajeError('Hora inválida');

        }else if(hora.split(':')[0] < '07' || hora.split(':')[0] > '17'){

            mostrarMensajeError('Trabajamos de 7:00 a 17:00');

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

            mostrarMensaje('Se ha creado la cita!');
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

    return <form onSubmit={(e)=>addCita(e)}>

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
}