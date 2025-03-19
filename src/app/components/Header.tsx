import { ChangeTheme } from "./helpers/change-theme";

export function Header() {
    return (
        <header>
            <div className="container mx-auto my-2 flex items-center justify-end">
                <ChangeTheme />
            </div>
        </header>
    )
}