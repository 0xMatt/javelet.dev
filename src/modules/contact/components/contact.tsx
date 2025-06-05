import Social from "@/modules/contact/components/social";
import Meet from "@/modules/contact/components/meet";
import Form from "@/modules/contact/components/form";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";


const Contact = () => {
    return (
        <>
            <Social/>
            <div className="border-sidebar-border/90 dark:border-sidebar-border relative h-5 overflow-hidden rounded-xl border hover:scale-101">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-400/20 dark:stroke-neutral-100/20" />
            </div>
            <Meet/>
            <div className="border-sidebar-border/90 dark:border-sidebar-border relative h-5 overflow-hidden rounded-xl border hover:scale-101">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-400/20 dark:stroke-neutral-100/20" />
            </div>
            <Form/>
        </>
    );
};

export default Contact;