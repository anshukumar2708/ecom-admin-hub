import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DataTable({
    columns,
    data,
    selectedRows = [],
    rowKey,
    toggleSelect,
    toggleSelectAll,
    onView,
    onEdit,
    onDelete,
}) {

    return (
        <div className="rounded-xl border bg-card shadow-soft overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">

                        {toggleSelect && (
                            <TableHead className="w-12">
                                <Checkbox onCheckedChange={toggleSelectAll} />
                            </TableHead>
                        )}

                        {columns.map((col) => (
                            <TableHead key={col.key}>{col.title}</TableHead>
                        ))}

                        {(onView || onEdit || onDelete) && (
                            <TableHead className="w-12">Actions</TableHead>
                        )}

                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.map((row, index) => {
                        const id = String(row[rowKey]);

                        return (
                            <TableRow
                                key={index}
                                className={cn(
                                    "group transition-colors",
                                    selectedRows.includes(id) && "bg-primary/5"
                                )}
                            >
                                {toggleSelect && (
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.includes(id)}
                                            onCheckedChange={() => toggleSelect(id)}
                                        />
                                    </TableCell>
                                )}

                                {columns.map((col) => (
                                    <TableCell key={col.key}>
                                        {col.render
                                            ? col.render(
                                                col.dataIndex ? row[col.dataIndex] : null,
                                                row
                                            )
                                            : col.dataIndex
                                                ? String(row[col.dataIndex])
                                                : null}
                                    </TableCell>
                                ))}

                                {(onView || onEdit || onDelete) && (
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="transition-opacity"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">

                                                {onView && (
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() => onView(row)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                )}

                                                {onEdit && (
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() => onEdit(row)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                )}

                                                {onDelete && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="gap-2 text-destructive"
                                                            onClick={() => {
                                                                onDelete(row)
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </>
                                                )}

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                )}

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

        </div>
    );
}