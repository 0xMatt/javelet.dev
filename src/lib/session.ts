import 'server-only';

import { jwtVerify, SignJWT } from 'jose';
import { cookies, headers } from 'next/headers';
import prisma from '@/services/prisma';
import { userAgent } from 'next/server';
import { SessionType } from '@/types/session';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { id: number; expiresAt: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session', error);
  }
}

export async function getSession(): Promise<SessionType | undefined | null> {
  const sessionCookie = (await cookies()).get('session')?.value;
  if (!sessionCookie) {
    return;
  }

  try {
    return prisma.session.findFirst({
      where: {
        sid: sessionCookie,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function addUserToSession(userId: number) {
  const session = await getSession();
  if (!session) {
    throw new Error('Session does not exist');
  }
  await prisma.session.update({
    where: {
      sid: session.sid,
    },
    data: {
      userId: userId,
    },
  });
}

export async function createSession() {
  const { browser, os, device, isBot, engine } = userAgent({ headers: await headers() });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sid = await encrypt({ id: Math.random(), expiresAt });

  const session = await prisma.session.create({
    data: {
      sid,
      device: device.type || 'unknown',
      browser: browser.name as string,
      os: os.name as string,
      engine: engine.name as string,
      expiresAt: expiresAt,
      location: '',
      ip: '',
      isBot,
    },
  });

  // 3. Store the session in cookies for optimistic auth checks
  const cookieStore = await cookies();
  cookieStore.set('session', sid, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return session;
}

export async function updateSession() {
  let session = await getSession();
  if (!session) {
    session = await createSession();
  }
  const payload = await decrypt(session.sid);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('session', session.sid, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSessionOld() {
  const session = (await cookies()).get('session')?.value;

  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const session = await getSession();
  if (!session) {
    return;
  }
  await prisma.session.delete({
    where: {
      sid: session.sid,
    },
  });

  const cookieStore = await cookies();
  cookieStore.delete('session');
}
