import { Button } from "@/components/ui/button";

interface BulkActionsProps {
    selectedCount: number;
    onDelete?: () => void;
}

export default function BulkActions({
    selectedCount,
    onDelete,
}: BulkActionsProps) {
    if (selectedCount === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-4 p-4 mb-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
            <span className="text-sm font-medium">
                {selectedCount} selected
            </span>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={onDelete}
                >
                    Delete Selected
                </Button>
            </div>
        </div>
    );
}