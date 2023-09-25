import { useEffect, useState } from "react";

export const useTypewriter = (texts: string[], interval: number) => {
  const [index, setIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? interval / 2 : interval;
    let timer: NodeJS.Timeout | null = null;

    if (!isDeleting && message === texts[index]) {
      timer = setTimeout(() => setIsDeleting(true), 500);
    } else if (isDeleting && message === "") {
      setIsDeleting(false);
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else {
      timer = setTimeout(() => {
        setMessage((prevValue) => {
          if (isDeleting) {
            return prevValue.substring(0, prevValue.length - 1);
          }
          return texts[index].substring(0, prevValue.length + 1);
        });
      }, typeSpeed);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [message, isDeleting, index, interval, texts]);

  return message;
};
