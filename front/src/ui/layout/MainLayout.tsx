import React from "react";
import {useCurrentUser} from "../../features/auth/authModel.ts";
import clsx from "clsx";
import {Menu, Transition} from "@headlessui/react";
import {Link, NavLink} from "react-router-dom";
import {logout} from "../../features/auth/api/logoutUser.ts";
import {PATH_PAGE} from "../../lib/react-router";
import {useQueryClient} from "@tanstack/react-query";
import logo from '../../assets/react.svg';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type NavigationItem = {
    name: string;
    to: string;
    icon: IconDefinition;
}

type UserNavigationItemProps = {
    name: string;
    to: string;
    onClick?: () => void;
};

const UserNavigationItem = ({name, to, onClick}: UserNavigationItemProps) => {
    return <Menu.Item>
        {({active}) => (
            <Link
                onClick={onClick}
                to={to}
                className={clsx(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                {name}
            </Link>
        )}
    </Menu.Item>
}

const UserNavigation = () => {
    const user = useCurrentUser();
    const queryClient = useQueryClient();

    const useLogout = () => {
        logout(queryClient)
    }

    if (!user) return <></>

    const userNavigation = [
        // {name: 'Your Profile', to: './profile'},
        {
            name: 'Выйти',
            to: PATH_PAGE.login,
            onClick: () => {
                useLogout();
            },
        },
    ].filter(Boolean) as UserNavigationItemProps[];

    return <Menu as="div" className="ml-3 relative">
        {({open}) => (
            <>
                <div>
                    <Menu.Button
                        className={clsx("whitespace-nowrap bg-gray-200 py-2 px-4 flex items-center rounded-full",
                            "text-gray-500 text-lg",
                            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500")}>
                        {user.fullName}
                    </Menu.Button>
                </div>
                <Transition
                    show={open}
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {
                            userNavigation.map(item => (
                                <UserNavigationItem key={item.name} name={item.name} to={item.to}
                                                    onClick={item.onClick}/>))
                        }
                    </Menu.Items>
                </Transition>
            </>
        )}

    </Menu>
}

type AppNavigationProps = {
    navigation: NavigationItem[]
}

const AppNavigationItem = (nav: NavigationItem) => {
    return <NavLink
        to={nav.to}
        //clsx("max-w-xs bg-gray-200 py-2 px-4 flex items-center text-sm rounded-full",
        //                         "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500")
        className={({isActive}) => clsx(
            "max-w-xs bg-gray-200 py-2 px-4 flex items-center rounded-full border transition-colors",
            "hover:border-indigo-500 hover:text-indigo-500",
            "active:bg-gray-300",
            isActive ? "border-indigo-500 text-indigo-500" : "border-transparent",
            "space-x-2 px-3 py-1 text-lg text-gray-500"
        )}
    >
        <FontAwesomeIcon icon={nav.icon}/>
        <span>{nav.name}</span>
    </NavLink>;
}

const AppNavigation = ({navigation}: AppNavigationProps) => {
    return <div className="flex items-center space-x-3">
        {navigation.map(nav => (<AppNavigationItem key={nav.name} name={nav.name} to={nav.to} icon={nav.icon}/>))}
    </div>;
}

type MainLayoutProps = {
    children: React.ReactNode;
    navigation: NavigationItem[];
}

export const MainLayout = ({children, navigation}: MainLayoutProps) => {
    return <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="flex flex-col w-screen flex-1 overflow-hidden">
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                <Link className="flex ml-4 items-center" to=".">
                    <img src={logo} alt="logo"/>
                    {/*<span className="text-gray-600 ml-4">Name</span>*/}
                </Link>

                <div className="flex ml-6 items-center text-gray-900 justify-start w-full">
                    <AppNavigation navigation={navigation}/>
                </div>

                <div className="flex-1 px-4 flex justify-end">
                    <div className="ml-4 flex items-center md:ml-6">
                        <UserNavigation/>
                    </div>
                </div>
            </div>
            <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
        </div>
    </div>
}