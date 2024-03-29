import Header from "@/Layout/Header";
import Sidebar from "@/Layout/Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="flex h-screen border-collapse overflow-hidden">
                <Sidebar className="" />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1 px-4">{children}</main>
            </div>
        </>
    );
};
