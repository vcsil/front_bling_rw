export function formatMoeda(valor: number): string {
    const formatValor = valor / 100;
    return formatValor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function formatPercentToString(value: number): string {
    const roundValue = value / 100;

    return `${roundValue}%`.replace(".", ",");
}
