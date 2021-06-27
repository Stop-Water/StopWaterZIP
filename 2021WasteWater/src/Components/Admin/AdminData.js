import React, { useState } from 'react';

import SubTitle from '../Common/SubTitle';
import SearchBar from '../Common/SearchBar';
import SearchBox from '../Common/SearchBox';
import SearchResult from '../Common/SearchResult';

const AdminData = () => {
  const [dosearch, setDosearch] = useState();
  return (
    <div className="admin2Wrap">
      <SubTitle title="데이터 관리" />
      <SearchBar setDoSearch={setDosearch} flag="adminData" />
      {dosearch ? <SearchResult flag="adminData" /> : <SearchBox />}
    </div>
  );
};

export default AdminData;
