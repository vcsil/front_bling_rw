import { createContext, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { getPresetRange } from "@/pages/Dashboard/Dashboard/date-range-picker/utils/utils-picker";

interface DateRangeTimeT {
    from: number;
    to: number;
}

interface DashboardDataT {
    situationsSales: string[];
    dateRangeMain: DateRangeTimeT;
    dateRangeCompare: DateRangeTimeT;
}

interface DashboardContextT {
    dashboardData: DashboardDataT;
    setDashboardData: React.Dispatch<React.SetStateAction<DashboardDataT>>;
}

const rangeMain = getPresetRange("thisMonth");
const rangeCompare = getPresetRange("lastMonth");

const initialValues: DashboardDataT = {
    situationsSales: ["9", "79027"],
    dateRangeMain: { from: rangeMain.from.getTime(), to: rangeMain.to.getTime() },
    dateRangeCompare: { from: rangeCompare.from.getTime(), to: rangeCompare.to.getTime() },
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const DashboardContext = createContext<DashboardContextT>({ dashboardData: initialValues, setDashboardData: () => {} });
export default DashboardContext;

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [dashboardData, setDashboardData] = useLocalStorage("dashboardData", initialValues);

    useEffect(() => {
        setDashboardData(initialValues);
    }, [dashboardData]);

    return <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>{children}</DashboardContext.Provider>;
}
