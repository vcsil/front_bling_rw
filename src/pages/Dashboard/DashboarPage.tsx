import styled from "styled-components";

import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";

export default function DashboardPage() {
    return (
        <>
            <Titulo>Dashboard</Titulo>
            <Subtitulo>
                Ultima atualização há: <span>30 minutos</span>
            </Subtitulo>
            <Dashboard />
            <h1>iuu</h1>
        </>
    );
}

const Titulo = styled.h1`
    width: 208px;
    font-weight: 700;
    font-size: 40px;
`;

const Subtitulo = styled.p`
    span {
        color: #d88225;
    }
`;
