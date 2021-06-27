import React, { useState } from 'react';
import SubTitle from '../Components/Common/SubTitle';
import SearchBar from '../Components/Common/SearchBar';
import SearchBox from '../Components/Common/SearchBox';
import SearchResult from '../Components/Common/SearchResult';

import '../Components/Statistics/scss/StatisticsPage.scss';

const StatisticsPage = () => {
  const [doSearch, setDoSearch] = useState(false);
  return (
    <div className="statisticsPage">
      <SubTitle title="통계" />
      <SearchBar setDoSearch={setDoSearch} flag="statistics" />
      {doSearch ? <SearchResult flag="statistic" /> : <SearchBox />}
    </div>
  );
};

export default StatisticsPage;
