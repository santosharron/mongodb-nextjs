"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  completedClassName?: string;
  nonCompletedClassName?: string;
  thumbClassName?: string;
  stepMarks?: number[];
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, completedClassName, nonCompletedClassName, thumbClassName, stepMarks = [], ...props }, ref) => {
    const [value, setValue] = React.useState<number[]>([0]);

    React.useEffect(() => {
      if (props.value) {
        setValue(props.value as number[]);
      }
    }, [props.value]);

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
        onValueChange={(val) => {
          setValue(val);
          if (props.onValueChange) {
            (props.onValueChange as any)(val);
          }
        }}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Range
            className={cn(
              "absolute h-full",
              value[1] === 12 ? completedClassName : nonCompletedClassName
            )}
          />
          {stepMarks.map((mark) => (
            <div
              key={mark}
              className="absolute h-1.5 bg-gray-300"
              style={{ left: `${(mark / 12) * 100}%`, width: "1px" }}
            />
          ))}
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            thumbClassName
          )}
        />
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
