import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from "src/pages/join/landing.tsx";
import { Login } from "src/pages/join/login.tsx";
import { Redirection } from "./pages/join/redirection.tsx";
import { Permission } from "src/pages/join/permission.tsx";
import { Nickname } from "./pages/join/nickname.tsx";
import { Main } from "./pages/home/main.tsx";
import { CreateInfo } from "./pages/home/createInfo.tsx";
import { ContributeInfo } from "./pages/home/contributeInfo.tsx";
import { Create } from "./pages/home/create.tsx";
import { Detail } from "./pages/home/detail.tsx";
import { Profile } from "./pages/setting/profile.tsx";
import { NicknameEdit } from "./pages/setting/nicknameEdit.tsx";
import { Notification } from "./pages/setting/notification.tsx";
import { Notice } from "./pages/setting/notice.tsx";
import { NoticeDetail } from "./pages/setting/noticeDetail.tsx";
import { Withdraw } from "./pages/setting/withdraw.tsx";
import { ChatList } from "./pages/chat/list.tsx";
import { ChatRoom } from "./pages/chat/room.tsx";
import { TokenTest } from "./pages/tokentest.tsx";
import { Loading } from "./pages/setting/loading.tsx";

export const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/redirection" element={<Redirection />} />
      <Route path="/permission" element={<Permission />} />
      <Route path="/nickname" element={<Nickname />} />
      <Route path="/" element={<Main />} />
      <Route path="/createInfo" element={<CreateInfo />} />
      <Route path="/contributeInfo" element={<ContributeInfo />} />
      <Route path="/create" element={<Create />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/nicknameEdit" element={<NicknameEdit />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/noticeDetail/:id" element={<NoticeDetail />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/chatlist" element={<ChatList />} />
      <Route path="/chatroom/:id" element={<ChatRoom />} />
      <Route path="/tokentest" element={<TokenTest />} />
      <Route path="/loading" element={<Loading />} />
    </Routes>
  );
};

export default MainRouter;
