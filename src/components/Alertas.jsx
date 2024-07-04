import React, { useState, useEffect } from 'react';

export default function Alertas() {

    const [alertar, setAlertar] = useState(false);
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [validado, setValidado] = useState(false);

    /* USeeffect para obter e guardar no local storage */
    useEffect(() => {
        
        const storedAlertar = localStorage.getItem("Alertar") === 'true';
        /* se nao exister valores entao da um string vazio > evita erros de codigo se localstorage estiver vazio. Nao apagar. */
        const storedEmail = localStorage.getItem("email") || "";
        const storedLocation = localStorage.getItem("location") || "";

        setAlertar(storedAlertar);
        setEmail(storedEmail);
        setLocation(storedLocation);
    
    }, []);

    useEffect(() => {
        /* toString para poder utilizar checkbox informacao no localStorage que guarda so strings */
        localStorage.setItem("Alertar", alertar.toString()); 
        localStorage.setItem("email", email);
        localStorage.setItem("location", location);
    }, [alertar, email, location]);

    /* Obter e guardar os dados das alertas no localStorage */
    const handleSubmit = (event) => {

        event.preventDefault(); /* necessario prevent o default se nao continua sem guardar */

        /* JSON.Parse para repassar de string a um objeto com array */
        const storedAlertas = JSON.parse(localStorage.getItem('alertas')) || [];

        let alertaJaExiste = false ;

        for (let i = 0; i < storedAlertas.length; i++) {
            if (storedAlertas[i].email === email && storedAlertas[i].location === location) {
                alertaJaExiste = true;
                break;
            }
        }

        if (alertaJaExiste) {
            alert('Alerta já existe para este email e localidade!');
            setValidado(false);
        } else {
            /* cria o novo array com o email e location indicado e validado */
            const novaAlerta = {email, location};
            /* Atualizar localstorage com a alerta */
            storedAlertas.push(novaAlerta);
            localStorage.setItem('alertas', JSON.stringify(storedAlertas));
            setValidado(true);
        }
    };

    return (
        <div>
            {validado ? (
                <p>Receberá a sua primeira alerta brevemente!</p>
            ) : (
            <form method="post" action="/my-alertas" onSubmit={handleSubmit} className="formulario">
                <label>
                <input 
                    type="checkbox" 
                    checked={alertar} 
                    onChange={event => setAlertar(event.target.checked)} />
                Quero receber alertas meteorológicos para a minha localidade !
                </label>


                {alertar && (
                <div className="campos-alerta">
                    <input 
                        type="email" 
                        name="email"
                        value={email} 
                        onChange={event => setEmail(event.target.value)} 
                        aria-label="Email"
                        placeholder="Email"
                        required />
                    <input 
                        type="text" 
                        name="location"
                        value={location} 
                        onChange={event => setLocation(event.target.value)} 
                        aria-label="Localidade"
                        placeholder="Localidade"
                        required />
                    <div id="Validar">
                        <button type="submit">Validar dados</button>
                    </div>
                </div>
                )}
            </form>

            )}
        </div>
    );
}