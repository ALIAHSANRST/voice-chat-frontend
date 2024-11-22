'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../admin/layout.module.css";
import { AdminProvider } from "@/context/adminContext";
import { useEffect } from "react";

const AdminLayout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const token = sessionStorage.getItem('token')
        if (JSON.parse(token)) {
            if (user.user.role !== 'admin') {
                router.push('/')
            }
        } else {
            router.push('/login')
        }
    }, [])

    const routes = [
        { path: "/admin/dashboard", name: "Dashboard" },
        { path: "/admin/email", name: "Send Email" },
        { path: "/admin/scores", name: "View All Scores" },
    ];

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        {routes.map((route) => (
                            <li
                                key={route.path}
                                className={router.pathname === route.path ? styles.active : ""}
                            >
                                <Link href={route.path}>{route.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <AdminProvider>
                <main className={styles.content}>{children}</main>
            </AdminProvider>
        </div>
    );
};

export default AdminLayout;
