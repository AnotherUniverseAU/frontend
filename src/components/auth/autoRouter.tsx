import React from 'react';
import { Landing } from 'src/pages/join/landing.tsx';
import { Login } from 'src/pages/join/login.tsx';
import { Redirection } from 'src/pages/join/redirection.tsx';
import { Permission } from 'src/pages/join/permission.tsx';
import { Nickname } from 'src/pages/join/nickname.tsx';
import { Main } from 'src/pages/home/main.tsx';
import { CreateInfo } from 'src/pages/home/createInfo.tsx';
import { ContributeInfo } from 'src/pages/home/contributeInfo.tsx';
import { Create } from 'src/pages/home/create.tsx';
import { Detail } from 'src/pages/home/detail.tsx';
import { Profile } from 'src/pages/setting/profile.tsx';
import { NicknameEdit } from 'src/pages/setting/nicknameEdit.tsx';
import { Notification } from 'src/pages/setting/notification.tsx';
import { Notice } from 'src/pages/setting/notice.tsx';
import { NoticeDetail } from 'src/pages/setting/noticeDetail.tsx';
import { Withdraw } from 'src/pages/setting/withdraw.tsx';
import { ChatList } from 'src/pages/chat/list.tsx';
import { ChatRoom } from 'src/pages/chat/room.tsx';
import { TokenTest } from 'src/pages/tokentest.tsx';
import { Loading } from 'src/pages/setting/loading.tsx';
import { EachNicknameEdit } from 'src/pages/chat/eachNicknameEdit.tsx';
import { Admin } from 'src/pages/home/admin.tsx';
// import { Error } from "src/pages/join/error.tsx";

import { Navigate, Route, Routes } from 'react-router-dom';

type RouterItem = {
    path: string;
    element: JSX.Element;
    withAuthorization: boolean;
};

interface AuthorizationProps {
    redirectTo: string;
    children: React.ReactNode;
}

const Authorization = ({ redirectTo, children }: AuthorizationProps) => {
    const isAuthenticated: string | null | undefined = localStorage.getItem('refreshToken');
    if (isAuthenticated) {
        return <>{children}</>;
    } else {
        return <Navigate to={redirectTo} />;
    }
};

// const RouterInfoWithRefToken: RouterItem[] = [
//     { path: '/landing', element: <Landing />, withAuthorization: true },
//     { path: '/login', element: <Login />, withAuthorization: false },
//     { path: '/redirection', element: <Redirection />, withAuthorization: false },
//     // { path: "/permission", element: <Permission />, withAuthorization: true },
//     { path: '/nickname', element: <Nickname />, withAuthorization: true },
//     { path: '/createInfo', element: <CreateInfo />, withAuthorization: true },
//     {
//         path: '/contributeInfo',
//         element: <ContributeInfo />,
//         withAuthorization: true,
//     },
//     { path: '/create', element: <Create />, withAuthorization: true },
//     { path: '/detail/:id', element: <Detail />, withAuthorization: true },
//     { path: '/profile', element: <Profile />, withAuthorization: true },
//     { path: '/nicknameEdit', element: <NicknameEdit />, withAuthorization: true },
//     { path: '/notification', element: <Notification />, withAuthorization: true },
//     { path: '/notice', element: <Notice />, withAuthorization: true },
//     { path: '/withdraw', element: <Withdraw />, withAuthorization: true },
//     { path: '/chatlist', element: <ChatList />, withAuthorization: true },
//     { path: '/tokentest', element: <TokenTest />, withAuthorization: true },
//     { path: '/loading', element: <Loading />, withAuthorization: false },
//     {
//         path: '/eachNicknameEdit',
//         element: <EachNicknameEdit />,
//         withAuthorization: true,
//     },
//     { path: '/au_admin_2023', element: <Admin />, withAuthorization: true },
//     { path: '/', element: <Main />, withAuthorization: true },
//     {
//         path: '/noticeDetail',
//         element: <NoticeDetail />,
//         withAuthorization: true,
//     },
//     { path: '/chatroom/:id', element: <ChatRoom />, withAuthorization: true },
//     // { path: "/error", element: <Error />, withAuthorization: false },
// ];

const RouterInfo: RouterItem[] = [
    { path: '/landing', element: <Landing />, withAuthorization: true },
    { path: '/login', element: <Login />, withAuthorization: false },
    { path: '/redirection', element: <Redirection />, withAuthorization: false },
    // { path: "/permission", element: <Permission />, withAuthorization: true },
    { path: '/nickname', element: <Nickname />, withAuthorization: true },
    { path: '/createInfo', element: <CreateInfo />, withAuthorization: true },
    {
        path: '/contributeInfo',
        element: <ContributeInfo />,
        withAuthorization: true,
    },
    { path: '/create', element: <Create />, withAuthorization: true },
    { path: '/detail/:id', element: <Detail />, withAuthorization: false },
    { path: '/profile', element: <Profile />, withAuthorization: true },
    { path: '/nicknameEdit', element: <NicknameEdit />, withAuthorization: true },
    { path: '/notification', element: <Notification />, withAuthorization: true },
    { path: '/notice', element: <Notice />, withAuthorization: true },
    { path: '/withdraw', element: <Withdraw />, withAuthorization: true },
    { path: '/chatlist', element: <ChatList />, withAuthorization: true },
    { path: '/tokentest', element: <TokenTest />, withAuthorization: true },
    { path: '/loading', element: <Loading />, withAuthorization: false },
    {
        path: '/eachNicknameEdit',
        element: <EachNicknameEdit />,
        withAuthorization: true,
    },
    { path: '/au_admin_2023', element: <Admin />, withAuthorization: true },
    { path: '/', element: <Main />, withAuthorization: true },
    {
        path: '/noticeDetail',
        element: <NoticeDetail />,
        withAuthorization: true,
    },
    { path: '/chatroom/:id', element: <ChatRoom />, withAuthorization: true },
    // { path: "/error", element: <Error />, withAuthorization: false },
];

const AutoRouter = (refreshToken: any) => {
    return (
        <Routes>
            {RouterInfo.map((route) => {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            route.withAuthorization ? (
                                <Authorization redirectTo="/login">{route.element}</Authorization>
                            ) : (
                                route.element
                            )
                        }
                    ></Route>
                );
            })}
        </Routes>
    );
};

export default AutoRouter;
