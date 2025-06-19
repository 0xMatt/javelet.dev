import {useEffect, useState} from "react";
import {createClient} from '@/services/supabase/client';
import {GuestProfile} from "@/components/layout/top/profile/guest";
import {UserProfile} from "@/components/layout/top/profile/user";

export function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const {data: {user: userData}} = await createClient().auth.getUser();
            // @ts-expect-error remove
            setUser(userData);
        };

        fetchUser();
    }, []);

    if (user) {
        return (<UserProfile user={user}/>)
    }

    return (<GuestProfile/>)
}
