import { Mail } from "@/pages/Teste/mail";
import { accounts, mails } from "@/pages/Teste/data";

export default function MailPage() {
    const cookies = document.cookie.split(";");

    const layout: string | undefined = cookies.find((cookie) => cookie.trim().startsWith("react-resizable-panels:layout="))?.split("=")[1];
    const collapsed: string | undefined = cookies
        .find((cookie) => cookie.trim().startsWith("react-resizable-panels:collapsed="))
        ?.split("=")[1];

    const defaultLayout: number[] | undefined = layout ? JSON.parse(layout) : undefined;
    const defaultCollapsed: boolean | undefined = collapsed ? (collapsed === "undefined" ? undefined : JSON.parse(collapsed)) : undefined;

    return (
        <>
            <div className="hidden flex-col md:flex h-screen">
                <Mail
                    accounts={accounts}
                    mails={mails}
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                    navCollapsedSize={4}
                />
            </div>
        </>
    );
}
