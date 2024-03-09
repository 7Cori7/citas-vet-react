
export default function Edit({cita, citas, setCitas, handleUpdate}){

    //? En el caso de las validaciones de hora y fecha, se harían por backend :P

    function handleEdit(e){

        const newcita = citas.map(i => (
            i.id === cita.id ? {...i, [e.target.name]: e.target.value} : i
        ));

        setCitas(newcita);
    }

    return(<>
        
        <div className="edit-contenedor">
            <input type="text" name='mascota' value={cita.mascota} placeholder='Nombre de Mascota' onChange={handleEdit} />

            <input type="text" name='dueño' value={cita.dueño} placeholder='Nombre del Dueño' onChange={handleEdit} />

            <input type="tel" name='telf' value={cita.telf} placeholder='Número de Teléfono' onChange={handleEdit} />

            <input type="date" name='fecha' value={cita.fecha} onChange={handleEdit} />

            <input type="time" name='hora' value={cita.hora} onChange={handleEdit} />

            <textarea name='sintomas' placeholder='Escriba los síntomas' value={cita.sintomas} onChange={handleEdit} />

            <div>
                <button onClick={handleUpdate}>Actualizar Cita</button>
            </div>
        </div>
        
    </>);
}