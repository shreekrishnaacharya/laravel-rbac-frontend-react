import { Suspense } from "react";
import RoleList from "./components/RoleList";
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ROLE_ACCESS, ROLE_ADD, ROLE_LIST, ROLE_UPDATE } from "./links";
import RoleAdd from "./components/RoleAdd";
import './App.css'
import AccessList from "./components/AccessList";
import { Space } from 'antd';

function App() {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', padding: '40px', height: '100%', backgroundColor: '#eee' }}>
      <HashRouter>
        <Suspense fallback={() => "loading..."}>
          <Routes>
            <Route exact path={ROLE_ADD} element={<RoleAdd isNewRecord={true} />} />
            <Route exact path={ROLE_UPDATE} element={<RoleAdd />} />
            <Route exact path={ROLE_LIST} element={<RoleList />} />
            <Route exact path={ROLE_ACCESS} element={<AccessList />} />

            {/* <Route exact path="/contact/:id" render={(props) => (
              <Contact {...props} />
            )} />
            <Route exact path="/edit/:id" render={(props) => (
              <UpdateContact {...props} updateContactHandler={updateContact} />
            )} /> */}
          </Routes>
        </Suspense>
      </HashRouter>
    </Space>
  );
}

export default App;
