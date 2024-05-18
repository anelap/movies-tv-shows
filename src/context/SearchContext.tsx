import { ReactNode, createContext, useContext, useState } from 'react';

interface SearchContextProps {
    children: ReactNode;
}

interface SearchContextValue {
    searchQuery: string;
    activeTab: string;
    setSearchQuery: (query: string) => void;
    setActiveTab: (tab: string) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchContextProvider = ({ children }: SearchContextProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('movie');

    return (
        <SearchContext.Provider value={{ searchQuery, activeTab, setSearchQuery, setActiveTab }}>
            {children}
        </SearchContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchContextProvider');
    }
    return context;
};
