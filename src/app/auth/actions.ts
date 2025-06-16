'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from "@/services/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const {error} = await supabase.auth.signInWithPassword(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/account')
}

export async function register(formData: FormData) {
    const supabase = await createClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const {error} = await supabase.auth.signUp(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/account')
}

export async function logout() {
    const supabase = await createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser()
    if (user) {
        await supabase.auth.signOut()
    }
    revalidatePath('/', 'layout')
    revalidatePath('/', 'page')
    redirect('/')
}