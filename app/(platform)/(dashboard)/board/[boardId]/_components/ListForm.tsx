import { createList } from "@/actions/create-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderCircle, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { ListWithCards } from "./ListContainer";

const ListForm = ({
  boardId,
  onListCreated,
}: {
  boardId: string;
  onListCreated: (newList: ListWithCards) => void;
}) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createList({ title, boardId });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      setTitle("");
      onListCreated(res.newList);
      toast.success("New List created");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsFormOpen(false);
    }
  };

  return (
    <Popover open={isFormOpen} onOpenChange={setIsFormOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="bg-slate-200 py-6 flex items-center justify-start gap-2 w-[250px] text-base"
        >
          <Plus className="w-4" />
          Add a list
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <input
            required
            placeholder="type here..."
            className="outline-none border p-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" className="flex items-center justify-center">
            {loading ? <LoaderCircle className="animate-spin" /> : "Add"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListForm;
