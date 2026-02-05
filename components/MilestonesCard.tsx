import { counterItems } from "@/lib";
import { Card, CardContent } from "./ui/card";

export default function MilestonesCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {counterItems.map((item, index) => (
        <Card
          key={index}
          className="group transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
        >
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            {/* The Big Number */}
            <div className="text-4xl font-bold tracking-tighter sm:text-5xl">
              <span className="text-primary group-hover:animate-pulse">
                {item.value}
              </span>
              <span>{item.suffix}</span>
            </div>

            {/* The Label */}
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              {item.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}