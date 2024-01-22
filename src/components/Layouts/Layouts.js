import "./Layouts.scss";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import SideBar from "../SideBar/SideBar";
import MainHeader from "../MainHeader/MainHeader";

const Layouts = ({ groups }) => (
    <Layout className="home-layout">
      <SideBar />
      <Layout>
        <Content className="main-section">
          <MainHeader />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
);

export default Layouts;
