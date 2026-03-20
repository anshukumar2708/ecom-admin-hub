import { useEffect, useState } from 'react';
import { Download, Filter, Plus, Search, Upload } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { ICategoryFilter } from '@/types/product.category.type';

interface IProps {
    setFilter: React.Dispatch<React.SetStateAction<ICategoryFilter>>;
    openForm: () => void;
}

const ActionBar = ({ setFilter, openForm }: IProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {

        const timer = setTimeout(() => {
            setFilter((prev) => ({
                ...prev,
                search: searchQuery,

            }))
        }, 300);

        return () => clearTimeout(timer);

    }, [searchQuery, setFilter]);

    const handleStatusFilter = (value: string) => {
        setFilter((prev) => ({
            ...prev,
            isActive: value === "all" ? null : value === "active" ? true : false
        }))
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>
                <Select
                    defaultValue="all"
                    onValueChange={handleStatusFilter}
                >
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inActive">InActive</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import
                </Button>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
                <Button className="gap-2" onClick={openForm}>
                    <Plus className="h-4 w-4" />
                    Add Product Category
                </Button>
            </div>
        </div>

    )
}

export default ActionBar