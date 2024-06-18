import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { FaCheck } from "react-icons/fa";

export default function HistoryRead(): JSX.Element {
    const logs = [
        { id: 1, code: 322, name: "Conjunto Mamma Mia" },
        { id: 2, code: 586, name: "Bracelete Lince" },
        { id: 1, code: 322, name: "Conjunto Mamma Mia" },
        { id: 2, code: 586, name: "Bracelete Lince" },
        { id: 1, code: 322, name: "Conjunto Mamma Mia" },
        { id: 2, code: 586, name: "Bracelete Lince" },
        { id: 1, code: 322, name: "Conjunto Mamma Mia" },
        { id: 2, code: 586, name: "Bracelete Lince" },
        { id: 1, code: 322, name: "Conjunto Mamma Mia" },
        { id: 2, code: 586, name: "Bracelete Lince" },
        { id: 1, code: 322, name: "Conjunto Mamma Mia" },
        { id: 2, code: 586, name: "Bracelete Lince" },
        { id: 1, code: 322, name: "Conjunto Mamma Mia" },
        { id: 2, code: 586, name: "Bracelete Lince" },
    ];

    return (
        <fieldset className="rounded-lg border bg-card p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Log de leituras</legend>
            <ScrollArea className="h-36 min-[1360px]:h-[103px] min-[1400px]:h-96">
                <table className="min-w-full">
                    <tbody className="divide-y">
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaCheck className="mr-2 cursor-pointer" color="#21A747" />
                                        <span className="text-sm">{`1 x ${log.code} - ${log.name}`}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap flex justify-end">
                                    <Trash2 className="cursor-pointer" color="#DF3447" width={16} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ScrollArea>
        </fieldset>
    );
}
