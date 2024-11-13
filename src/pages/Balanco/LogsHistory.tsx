import { Trash2 } from "lucide-react";
import { FaCheck } from "react-icons/fa";

import { LogProductsProps } from "@/pages/Balanco/types";

export default function LogProducts({ index, logs, setLogs, log, conferenceProducts, setConferenceProducts, BoxAviso }: LogProductsProps) {
    function removeTask() {
        const product = logs.filter((p) => p.id === log.id)[0];
        setLogs(logs.filter((i) => i.id !== log.id));

        const currentQuantity = conferenceProducts[log.id_bling].quantity;
        conferenceProducts[log.id_bling].quantity = currentQuantity - log.quantityRead;
        setConferenceProducts((prevProducts) => ({
            ...prevProducts,
            [log.id_bling]: { quantity: currentQuantity - log.quantityRead, code: log.code, name: log.name },
        }));
        BoxAviso("Produto excluido", `${product.quantityRead} unidade(s) do produto ${product.name} excluido(s)`);
    }

    return (
        <tr key={index}>
            <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex items-center">
                    <FaCheck className="mr-2 cursor-pointer" color="#21A747" />
                    <span className="text-sm">{`${log.quantityRead} x ${log.code} - ${log.name}`}</span>
                </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap flex justify-end" onClick={removeTask}>
                <Trash2 className="cursor-pointer" color="#DF3447" width={16} />
            </td>
        </tr>
    );
}
