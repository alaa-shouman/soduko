"use client";
import SudokuBoard from "@/components/SodukoBoard/sodukoboard";
import Title from "@/components/SodukoBoard/Title";
import { ToastProvider } from "@/components/ToastProvider";


export default function Home() {
  return (
    <ToastProvider>
      <Title>Soduko</Title>
      <SudokuBoard />
    </ToastProvider>
  );
}
