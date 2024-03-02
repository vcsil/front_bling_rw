export function formatMoeda(valor: number): string {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function formatPercent(value: number): string {
    const roundValue = Math.round(value * 10000) / 100;

    return `${roundValue}%`.replace(".", ",");
}
