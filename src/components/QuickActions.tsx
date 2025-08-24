import { Building, Calculator, FileText, HelpCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Dispatch, SetStateAction } from "react";

export const actions = [
  {
    icon: Building,
    label: "Register Business",
    query: "How do I register my business in Nigeria?",
  },
  {
    icon: Calculator,
    label: "Tax Questions",
    query: "What's the tax structure in Nigeria?",
  },
  {
    icon: FileText,
    label: "Trade License",
    query: "Tell me about business licensing in Nigeria.",
  },
  { icon: HelpCircle, label: "General Help", query: "" },
];

const QuickActions = ({
  setPrompt,
}: {
  setPrompt: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full mt-8">
      <h3 className="text-sm font-semibold text-neutral-400 mb-4 text-center">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Card
            key={action.label}
            className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-amber-600/30 hover:bg-amber-600/10 bg-neutral-700 border-neutral-600"
            onClick={() => setPrompt(action.query)}
          >
            <CardContent className="p-4 text-center">
              <action.icon className="w-6 h-6 mx-auto mb-2 text-amber-600" />
              <p className="text-sm font-medium text-neutral-300">
                {action.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
