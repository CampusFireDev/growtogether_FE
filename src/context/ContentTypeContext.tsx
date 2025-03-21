import { createContext, useContext, useState, ReactNode } from "react";

type contentType= "bootcamp" | "study";

interface contentTypeContextType {
    contentType: contentType;
    setcontentType: (type: contentType) => void;
}

const contentTypeContext = createContext<contentTypeContextType | undefined>(undefined);

interface ContentTypeProviderProps {
    children: ReactNode;
}

export const ContentTypeProvider = ({ children }: ContentTypeProviderProps) =>{
    const [contentType, setcontentType] = useState<contentType>("study");

    return (
        <contentTypeContext.Provider value={{ contentType, setcontentType }}>
          {children}
        </contentTypeContext.Provider>
    );
};

export const useContentType = () => {
    const context = useContext(contentTypeContext);
    if (!context) {
      throw new Error('useContentType must be used within a ContentTypeProvider');
    }
    return context;
};