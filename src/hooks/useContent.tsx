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
        const url = `${import.meta.env.BASE_URL}content.json`;
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setContent(json);
        } else {
          setContent({});
          console.error("Failed to load content.json:", res.status, res.statusText);
        }
      } catch (e) {
        setContent({});
        console.error("Error loading content.json:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return <ContentContext.Provider value={{ content, loading }}>{children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);
