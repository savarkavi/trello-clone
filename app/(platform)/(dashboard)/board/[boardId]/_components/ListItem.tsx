import { ListWithCards } from "./ListContainer";
import ListOptions from "./ListOptions";

const ListItem = ({ list }: { list: ListWithCards }) => {
  return (
    <div className="bg-slate-100 p-3 rounded-lg font-semibold w-[250px]">
      <div className="flex items-center justify-between gap-2">
        <div>{list.title}</div>
        <ListOptions list={list} />
      </div>
    </div>
  );
};

export default ListItem;
