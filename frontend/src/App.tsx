import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloClient, NormalizedCacheObject, gql } from "@apollo/client";
import { Layout } from "antd";

import "antd/dist/antd.css";
import "./App.css";

import LoginPage from "./pages/login";
import BikeListPage from "./pages/bikes";
import RequireAuth from "./components/require-auth";
export interface AppProps {
  client: ApolloClient<NormalizedCacheObject>;
}

const App: React.FC<AppProps> = ({ client }: AppProps) => {
  const { Header, Footer, Content } = Layout;
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("auth-token")
  );

  useEffect(() => {
    // @ts-ignore
    const unsubscribe = client.onClearStore(() => {
      if (loggedIn) {
        setLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header>Bikey</Header>
        <Content>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route
              path="/bikes"
              element={
                <RequireAuth>
                  <BikeListPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Content>
        <Footer>©2022 Created by Burak KIRBAĞ</Footer>
      </Layout>
    </div>
  );
};

export default App;
