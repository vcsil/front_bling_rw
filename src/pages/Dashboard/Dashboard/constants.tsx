// Define os dados do gráfico
function gerarNumeroAleatorio(max: number): number {
    return Math.floor(Math.random() * (max + 1)); // Retorna um número inteiro entre 0 e 4000
}

interface DataType {
    date: number;
    value: number;
}

const data: DataType[] = [];
for (let j = 1; j < 3; j++) {
    for (let i = 1; i < 30; i++) {
        data.push({
            date: new Date(2021, 1 + j, i).getTime(),
            value: gerarNumeroAleatorio(4000),
        });
    }
}

const mid_cards_data = [
    {
        name: "Faturamento sem frete",
        value: 37362.76,
        percent: 0.0236,
    },
    {
        name: "Preço de compra",
        value: 4109.71,
        percent: 0.3368,
    },
    {
        name: "Margem bruta",
        value: 33253.05,
        percent: -0.0052,
    },
    {
        name: "Percentual",
        value: 0.89,
        percent: -0.0281,
    },
];

export { data, mid_cards_data };
