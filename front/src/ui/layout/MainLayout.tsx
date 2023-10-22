import React from "react";
import {useCurrentUser} from "../../features/auth/authModel.ts";
import clsx from "clsx";
import {Menu, Transition} from "@headlessui/react";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../features/auth/api/logoutUser.ts";
import {PATH_PAGE} from "../../lib/react-router";
import {useQueryClient} from "@tanstack/react-query";

type NavigationItem = {
    name: string;
    to: string;
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
    const navigate = useNavigate();

    const useLogout = () => {
        logout(queryClient)
        navigate(PATH_PAGE.login);
    }

    if (!user) return <></>

    const userNavigation = [
        // {name: 'Your Profile', to: './profile'},
        {
            name: 'Выйти',
            to: '',
            onClick: () => {
                useLogout();
            },
        },
    ].filter(Boolean) as UserNavigationItemProps[];

    return <Menu as="div" className="ml-3 relative">
        {({open}) => (
            <>
                <div>
                    <Menu.Button className={clsx("max-w-xs bg-gray-200 p-2 flex items-center text-sm rounded-full",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500")}>
                        <span className="text-gray-500">{user.fullName}</span>
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

// type NavigationProps = {
//     navigation: NavigationItem[]
// }

// const Navigation = ({ navigation }: NavigationProps) => {
//
// }

type MainLayoutProps = {
    children: React.ReactNode;
    navigation: NavigationItem[];
}

export const MainLayout = ({children}: MainLayoutProps) => {
    return <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="flex flex-col w-screen flex-1 overflow-hidden">
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
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