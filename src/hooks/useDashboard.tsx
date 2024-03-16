import { createContext, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

interface DateRangeTimeT {
    from: number;
    to: number;
}

interface DashboardDataT {
    situationsSales: string[];
    dateRange: DateRangeTimeT;
}

interface DashboardContextT {
    dashboardData: DashboardDataT;
    setDashboardData: React.Dispatch<React.SetStateAction<DashboardDataT>>;
}

const initialDateFrom = new Date(2023, 11, 1);
const initialDateTo = new Date(2023, 11, 31);
initialDateTo.setHours(23, 59, 59, 999);
const initialValues: DashboardDataT = {
    situationsSales: ["9", "79027"],
    dateRange: { from: initialDateFrom.getTime(), to: initialDateTo.getTime() },
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const DashboardContext = createContext<DashboardContextT>({ dashboardData: initialValues, setDashboardData: () => {} });
export default DashboardContext;

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [dashboardData, setDashboardData] = useLocalStorage("dashboardData", initialValues);

    useEffect(() => {
        setDashboardData(initialValues);
    }, []);

    return <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>{children}</DashboardContext.Provider>;
}
