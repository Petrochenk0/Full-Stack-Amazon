import React, { FormEvent } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { callData } from '../utils/CallApi';

import { ISuggestions } from '../types';

export default function Search() {
  const [suggestions, setSuggestions] = React.useState<ISuggestions[] | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categorySearch, setCategorySearch] = React.useState('All');

  const navigate = useNavigate();

  const onHandleSubmitSearch = (event: FormEvent) => {
    event.preventDefault();

    navigate({
      // we add additional parameters to our url address
      pathname: 'search',
      search: `${createSearchParams({
        categorySearch: `${categorySearch}`,
        searchTerm: `${searchTerm}`,
      }).toString()}`,
    });

    setSearchTerm('');
    setCategorySearch('All');
  };

  const getSuggestionItems = () => {
    callData(`data/suggestions.json`).then((suggestionsResult) => {
      setSuggestions(suggestionsResult);
    });
  };

  React.useEffect(() => {
    getSuggestionItems();
  }, []);

  return (
    <div className="w-[100%]">
      <div className="flex items-center h-10 bg-amazonColors-yellows rounded">
        <select
          onChange={(e) => setCategorySearch(e.target.value)}
          className="text-black bg-gray-300 hover:bg-gray-200 h-10 rounded-l cursor-pointer">
          <option>All</option>
          <option>Deals</option>
          <option>Amazon</option>
          <option>Fashion</option>
          <option>Computers</option>
          <option>Home</option>
          <option>Mobiles</option>
        </select>
        <input
          className="flex items-center h-[100%] text-black pl-2 grow"
          type="text"
          placeholder="Search Amazon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={onHandleSubmitSearch}
          className="w-[44px] cursor-pointer hover:bg-yellow-600 h-10 rounded-r">
          <MagnifyingGlassIcon className="h-[30px] m-auto text-black items-center" />
        </button>
      </div>
      {suggestions && (
        <div className="bg-white w-full z-30 absolute text-black">
          {suggestions
            .filter((suggestion: ISuggestions) => {
              const currentSearchTerm = searchTerm.toLowerCase();
              const title = suggestion.title.toLowerCase();
              return (
                currentSearchTerm &&
                title.startsWith(currentSearchTerm) &&
                title !== currentSearchTerm
              );
            })
            .slice(0, 10)
            .map((suggestion: ISuggestions) => {
              return (
                <div key={suggestion.title} onClick={() => setSearchTerm(suggestion.title)}>
                  {suggestion.title}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
