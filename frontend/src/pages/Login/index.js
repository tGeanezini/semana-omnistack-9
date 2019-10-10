import React, { useState } from 'react';
import api from '../../services/api';

// Exportando um componente 'React' vazio
export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        
        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        // Storage do browser
        localStorage.setItem('user', _id);

        // Enviar o usuário para a rota 'Dashboard'
        history.push('/dashboard');
    }
    
    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                type="email" 
                id="email" 
                placeholder="Digite seu e-mail"
                value={email}
                onChange={ event => setEmail(event.target.value) } // Pega o valor digitado e atualiza o state            
            />

            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    );
}