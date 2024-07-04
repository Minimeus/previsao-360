import React, { useState, useEffect } from 'react';

export default function MinhasAlertas() {
    const [alertas, setAlertas] = useState([]);

    useEffect(() => {
        // Obter os dados do localStorage do usuario individual
        const storedAlertas = JSON.parse(localStorage.getItem('alertas')) || [];
        setAlertas(storedAlertas);
    }, []);

    return (
        <div>
            <h2>As Minhas Alertas Meteorológicas</h2>
            {alertas.length > 0 ? (
                <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Localidade</th>
                    </tr>
                </thead>
                <tbody>
                    {alertas.map((alerta, index) => (
                        <tr key={index}>
                            <td>{alerta.email}</td>
                            <td>{alerta.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <p>Não há alertas guardados.</p>
            )}
        </div>
    );
}
