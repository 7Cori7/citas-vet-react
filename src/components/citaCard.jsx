import deleteIcon from '/delete-icon.svg'; 
import editIcon from '/edit-icon.svg';

export default function CitaCard({cita, borrarCita, editarCita}){

    return <div key={cita.id} className='cita-tarjeta'>

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
}