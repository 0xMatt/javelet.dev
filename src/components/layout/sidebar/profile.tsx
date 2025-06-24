import {UserProfile} from "@/components/layout/sidebar/profile/user";
import {GuestProfile} from "@/components/layout/sidebar/profile/guest";
import {useSession} from "@/lib/session-context";

export default function Profile() {
    const session = useSession();
    if (session && session.user) {
        return (<UserProfile user={session.user}/>)
    }
    return (<GuestProfile/>)
}
