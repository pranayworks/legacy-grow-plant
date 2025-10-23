import { useEffect, useState } from "react";
import { TreePine, Wind, Droplets } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const Counter = ({ end, duration = 2000, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span className="font-heading font-bold text-4xl md:text-5xl text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsCounter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center p-8 bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow animate-counter">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <TreePine className="h-8 w-8 text-primary" />
        </div>
        <Counter end={15420} suffix="+" />
        <p className="text-muted-foreground mt-2 font-medium">Trees Planted</p>
      </div>

      <div className="text-center p-8 bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow animate-counter" style={{ animationDelay: "0.1s" }}>
        <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wind className="h-8 w-8 text-secondary" />
        </div>
        <Counter end={92} suffix=" tons" />
        <p className="text-muted-foreground mt-2 font-medium">CO₂ Absorbed</p>
      </div>

      <div className="text-center p-8 bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow animate-counter" style={{ animationDelay: "0.2s" }}>
        <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Droplets className="h-8 w-8 text-accent" />
        </div>
        <Counter end={308} suffix="K L" />
        <p className="text-muted-foreground mt-2 font-medium">Water Saved</p>
      </div>
    </div>
  );
};
