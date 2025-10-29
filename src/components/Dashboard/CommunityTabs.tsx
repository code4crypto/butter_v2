import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CommunityTabsProps {
  communities: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddCommunity: () => void;
}

export function CommunityTabs({ communities, activeTab, onTabChange, onAddCommunity }: CommunityTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-[1920px] mx-auto px-4">
        <div className="flex items-center gap-2">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="flex-shrink-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex-1 overflow-x-auto scrollbar-hide"
          >
            <div className="flex gap-2 py-3">
              {communities.map((community) => (
                <button
                  key={community}
                  onClick={() => onTabChange(community)}
                  className={`flex-shrink-0 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === community
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {community}
                </button>
              ))}
              <button
                onClick={onAddCommunity}
                className="flex-shrink-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="flex-shrink-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
