import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import styled from "styled-components";

import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import useGetLastUpdateTime from "@/hooks/api/useGetLastUpdateTime";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [updateTime, setUpdateTime] = useState<string>("");

    const { lastUpdateTime, lastUpdateTimeLoading } = useGetLastUpdateTime();

    useEffect(() => {
        if (!lastUpdateTimeLoading) {
            setUpdateTime(formatDistanceToNow(new Date(lastUpdateTime), { includeSeconds: true, addSuffix: true, locale: ptBR }));
        }
    }, [lastUpdateTimeLoading]);

    return (
        <>
            <Titulo>Dashboard</Titulo>
            <Subtitulo>
                Ultima atualização: <span>{updateTime}</span>
            </Subtitulo>
            <Dashboard />
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
