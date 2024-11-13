import { ProductReadProps } from "@/pages/Balanco/types";

export default function ProductRead({ codeProduct, nameProduct, reads, totalDeposit }: ProductReadProps): JSX.Element {
    const diference = reads && totalDeposit ? reads - totalDeposit : undefined;

    return (
        <fieldset className="rounded-lg border bg-card p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Produto lido</legend>
            <table className="min-w-full divide-y">
                <thead>
                    <tr>
                        <th className="px-2 pt-1 pb-3 text-left text-xs font-medium  uppercase tracking-wider">Código</th>
                        <th className="px-2 pt-1 pb-3 text-left text-xs font-medium  uppercase tracking-wider">Nome do produto</th>
                        <th className="px-2 pt-1 pb-3 text-center text-xs font-medium  uppercase tracking-wider">Lidos</th>
                        <th className="px-2 pt-1 pb-3 text-center text-xs font-medium  uppercase tracking-wider">Em estoque</th>
                        <th className="px-2 pt-1 pb-3 text-center text-xs font-medium  uppercase tracking-wider">Diferença</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-2 pt-4 pb-1 whitespace-nowrap text-sm font-medium">{codeProduct}</td>
                        <td className="px-2 pt-4 pb-1 whitespace-nowrap text-sm ">{nameProduct}</td>
                        <td className="px-2 pt-4 pb-1 whitespace-nowrap text-sm  text-center">{reads}</td>
                        <td className="px-2 pt-4 pb-1 whitespace-nowrap text-sm  text-center">{totalDeposit}</td>
                        <td className="px-2 pt-4 pb-1 whitespace-nowrap text-sm  text-center">{diference}</td>
                    </tr>
                </tbody>
            </table>
        </fieldset>
    );
}
