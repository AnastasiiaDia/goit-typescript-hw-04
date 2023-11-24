import React, { useEffect, useRef } from "react";

// Опишіть Props
// Встановіть правильні типи пропсів для цього компонента.
// У ньому є дві властивості: children і onContentEndVisible.
//  children - це будь-який валідний React вузол,
//  а onContentEndVisible - це функція без аргументів, що повертає void.
type Props = {
  children: React.ReactElement;
  onContentEndVisible: () => void;
};
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу,
  //  в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);
  //приклад з конспекту  onSave: (value: string) => void;
  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
