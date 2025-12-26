import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Content = any;

const ContentContext = createContext<{ content: Content | null; loading: boolean }>({
  content: null,
  loading: true,
});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/content.json");
        const json = await res.json();
        setContent(json);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return <ContentContext.Provider value={{ content, loading }}>{children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);
