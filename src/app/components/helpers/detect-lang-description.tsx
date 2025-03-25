"use client";

import { Book } from "@/app/models/book.model";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { franc } from "franc";
import { Type } from "lucide-react";
import { useTranslateDescription } from "../book/hooks/translate-description";
import { useState } from "react";
import { Loading } from "@/components/ui/loading";

type DetectLangDescriptionProps = {
    book: Book;
    description: string;
}

export function DetectLangDescription({ book, description }: DetectLangDescriptionProps) {
    const [descriptionTranslated, setDescriptionTranslated] = useState<string | null>(null);

    const { mutate: translateDescription, isPending, } = useTranslateDescription();

    function language() {
        const languageCode = franc(description ?? '')
        return languageCode;
    }

    async function translate() {
        translateDescription({ ...book, description }, {
            onSuccess: (response: { data: string }) => {
                setDescriptionTranslated(response.data ?? '');
            }
        });
    }

    return (
        <div className="prose max-w-none">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                {language() === 'por' ? '' : (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={translate}
                                    id="translate-description"
                                    disabled={isPending}
                                >
                                    <Type className="h-4 w-4" />
                                    <span className="sr-only">Translated</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Traduzir descrição
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            {isPending ? <Loading /> : (
                <p className="whitespace-pre-line">
                    {descriptionTranslated || description}
                </p>
            )}
        </div>
    )
}