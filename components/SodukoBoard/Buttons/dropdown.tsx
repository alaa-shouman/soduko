import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Difficulty } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";

interface DropdownButtonProps {
  onGenerate: (difficulty: Difficulty) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ onGenerate }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button className="bg-gray-700 text-white hover:bg-gray-800">
          Generate Puzzle
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-white shadow-md rounded-md p-2">
        <DropdownMenu.Item
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onGenerate("easy")}
        >
          Easy
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onGenerate("medium")}
        >
          Medium
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onGenerate("hard")}
        >
          Hard
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropdownButton;
