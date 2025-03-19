import { ChangeTheme } from "./helpers/change-theme";

export function Header() {
    return (
        <header>
            <div className="container mx-auto px-4 relative top-[5vh] flex items-center justify-end">
                <ChangeTheme />
            </div>
        </header>
    )
}