import { ScrollArea } from "@/components/ui/scroll-area";

import LogProducts from "@/pages/Balanco/LogsHistory";
import { HistoryReadProps } from "@/pages/Balanco/types";
import { useEffect } from "react";

export default function HistoryRead({
    setTotalRead,
    logsProducts,
    setLogsProducts,
    conferenceProducts,
    setConferenceProducts,
    BoxAviso,
}: HistoryReadProps): JSX.Element {
    useEffect(() => {
        if (logsProducts && logsProducts.length > 0) {
            const totalRead = logsProducts.reduce((total, productCurrent) => {
                return total + productCurrent.quantityRead;
            }, 0);
            setTotalRead(totalRead);
            return;
        }
        setTotalRead(0);
    }, [logsProducts]);

    return (
        <fieldset className="rounded-lg border bg-card p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Log de leituras</legend>
            <ScrollArea className="h-36 min-[1360px]:h-[103px] min-[1400px]:h-96">
                <table className="min-w-full">
                    <tbody className="divide-y">
                        {logsProducts
                            ?.slice()
                            .reverse()
                            .map((log, index) => (
                                <LogProducts
                                    index={index}
                                    logs={logsProducts}
                                    setLogs={setLogsProducts}
                                    log={log}
                                    key={index}
                                    conferenceProducts={conferenceProducts}
                                    setConferenceProducts={setConferenceProducts}
                                    BoxAviso={BoxAviso}
                                />
                            ))}
                    </tbody>
                </table>
            </ScrollArea>
        </fieldset>
    );
}
