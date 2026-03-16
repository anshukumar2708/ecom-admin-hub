import { Button } from "@/components/ui/button";

interface Props {
    page: number;
    total: number;
    limit: number;
    onPrev: () => void;
    onNext: () => void;
}

export default function TablePagination({
    page,
    total,
    limit,
    onPrev,
    onNext,
}: Props) {
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
            <p className="text-sm text-muted-foreground">
                Showing {start}-{end} of {total}
            </p>

            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onPrev}>
                    Previous
                </Button>

                <Button variant="outline" size="sm" onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}