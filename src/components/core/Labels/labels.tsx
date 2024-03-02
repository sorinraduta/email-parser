import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Info from "@/components/SVGs/info";
import { Label } from "@/types";

interface ILabelsProps {
  selectedLabel: Label | null;
  labels: Label[];
  onLabelClick: (label: Label) => void;
}

const Labels: FC<ILabelsProps> = (props) => {
  const { selectedLabel, labels, onLabelClick } = props;

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <div className="flex items-center mt-10 scroll-m-20 border-b pb-2  mb-2  tracking-tight transition-colors first:mt-0">
            <div className="text-3xl font-semibold mr-2">Labels</div>
            <TooltipTrigger>
              <Info height={"20"} width={"20"} />
            </TooltipTrigger>
          </div>
          <TooltipContent>
            <p>The label that contains your emails to parse.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div>
        {labels.map((label) => {
          return (
            <Badge
              key={label?.id}
              onClick={() => onLabelClick(label)}
              className="cursor-pointer mr-2 mb-1"
              variant={selectedLabel?.name === name ? "default" : "outline"}
            >
              {label?.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default Labels;
