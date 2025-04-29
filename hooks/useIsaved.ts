import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JobCTO } from "../types/types";
import { toast } from "@mosespace/toast";
import { NewProps } from "@/components/front-end/jobs/job-card";

interface CreateProps {
  items: NewProps[];
  handleSave: (item: NewProps) => void;
  handleRemoveSave: (id: string) => void;
}

export const useIsaved = create<CreateProps>()(
  persist(
    (set, get) => ({
      items: [],
      handleSave: (item) => {
        const allItems = get().items;
        const alreadySavedItem = allItems.find((Item) => Item.id === item.id);

        if (alreadySavedItem) {
          //   toast.error("Error", "Job already saved");
          get().handleRemoveSave(alreadySavedItem.id);
        } else {
          // Create a new item with isSaved set to true
          const updatedItem = { ...item, isSaved: true };
          const updatedItems = get().items;
          set({ items: [...updatedItems, updatedItem] });
          toast.success("Success", "Job saved successfully");
        }
      },
      handleRemoveSave: (id) => {
        const jobs = get().items;
        const filterItems = jobs.filter((job) => job.id !== id);
        set({ items: [...filterItems] });
        toast.success("Success", "Job Removed from the saved.");
      },
    }),

    { name: "jobs-storage" }
  )
);
