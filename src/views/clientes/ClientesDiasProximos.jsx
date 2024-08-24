import React from 'react'
import { Card } from 'reactstrap';

const ClientesDiasProximos = ({
    proxDay
}) => {

    const dateFormat = (date) => {
        let fechaObj = new Date(proxDay.fecha_nac)
        let day = fechaObj.getDate();
        let months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        let month = months[fechaObj.getMonth()]
        return `${day} de ${month}`
    }
    return (

        <Card className="p-2">
            Nombre: {proxDay.nombre_completo}
            <br />
            Cumpleaños: { dateFormat(proxDay.fecha_nac) }
            🥳
        </Card>
    )
}

export default ClientesDiasProximos