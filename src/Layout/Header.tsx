// import { signIn, useSession } from "next-auth/react";
import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";

import { cn } from "@/lib/utils";

import { MobileSidebar } from "@/Layout/MobiliSidebar";
import { ModeToggle } from "@/components/mode-toggle";
// import { UserNav } from "@/Layout/UserNav";

import { Button } from "@/components/ui/button";

export default function Header() {
    const sessionData = false;
    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <Link to={"#"} className="hidden items-center justify-between gap-2 md:flex">
                    <Boxes className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">Renata Wist Acessórios</h1>
                </Link>
                <div className={cn("block md:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    {sessionData?.user ? (
                        <UserNav user={sessionData.user} />
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => {
                                // void signIn();
                                console.log("Tentando login");
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </nav>
        </div>
    );
}
