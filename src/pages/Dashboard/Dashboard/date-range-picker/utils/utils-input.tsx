export function formatNumber(number: number): string {
    // Usa um operador ternário para verificar se o número é menor que 10
    // Se for, adiciona um zero à esquerda, senão, apenas converte para string
    return number < 10 && number > 0 ? `0${number}` : `${number}`;
}
