import { useSearchContext } from '../../context/SearchContext';

const Tabs = () => {
    const { activeTab, setActiveTab } = useSearchContext();

    return (
        <div className="tabs">
            <button className={activeTab === 'movie' ? 'active' : ''} onClick={() => setActiveTab('movie')}>MOVIES</button>
            <button className={activeTab === 'tv' ? 'active' : ''} onClick={() => setActiveTab('tv')}>SHOWS</button>
        </div>);
}

export default Tabs