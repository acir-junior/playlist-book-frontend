import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { truncateString } from "@/lib/utils";

type TruncateTooltipProps = {
    text: string;
    length?: number;
}

export function TruncateTooltip({ text, length }: TruncateTooltipProps) {
    const truncatedText = truncateString(text, length ?? 50);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="cursor-help">
                        { truncatedText }
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    { text }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}