export function formatNumber(number: number): string {
    // Usa um operador ternário para verificar se o número é menor que 10
    // Se for, adiciona um zero à esquerda, senão, apenas converte para string
    const cleanValue = Number(number) % 100;

    return cleanValue > 0 && cleanValue < 10 ? `0${cleanValue}` : cleanValue === 0 ? "" : `${cleanValue}`;
}
