import React from 'react'

type TabOption = 'recent' | 'popular' | 'recommended'

interface TabsProps {
  activeTab: TabOption
  setActiveTab: (tab: TabOption) => void
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: TabOption[] = ['recent', 'popular', 'recommended']

  return (
    <div className="flex justify-center space-x-4 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default Tabs
