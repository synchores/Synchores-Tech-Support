import { Plus } from "lucide-react";

export function NewTicketButton({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center gap-2 px-4 py-2 rounded-lg ml-auto" 
      style={{ background: "#3b82f6", color: "white", fontSize: "13px", fontWeight: 600 }}
    >
      <Plus size={15} /> New Ticket
    </button>
  );
}

export default NewTicketButton;
