/*
 * @Description: 
 * @Author: doctor
 * @Date: 2020-06-29 16:52:51
 * @LastEditTime: 2020-06-29 17:01:00
 * @LastEditors: doctor
 */ 
// app1: App.js
import React from "react";
const RemoteButton = React.lazy(() => import("app2/Button"));

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;