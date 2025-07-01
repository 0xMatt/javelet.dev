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
    return (await prisma.session.findFirst({
      where: {
        sid: sessionCookie,
      },
      include: {
        user: true,
      },
    })) as SessionType;
  } catch (error) {
    console.log(error);
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
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
  const { browser, os, device, isBot, engine } = userAgent({ headers: headersList });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sid = await encrypt({ id: Math.random(), expiresAt });

  const session = await prisma.session.create({
    data: {
      sid,
      device: device.type || 'unknown',
      browser: browser.name || 'unknown',
      os: os.name || 'unknown',
      engine: engine.name || 'unknown',
      expiresAt: expiresAt,
      location: '',
      ip: ip,
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

export async function updateSession(pathname: string) {
  let session = await getSession();
  if (!session) {
    session = await createSession();
  }
  const payload = await decrypt(session.sid);

  if (!session || !payload) {
    return null;
  }

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
  const { browser, os, device, isBot, engine } = userAgent({ headers: headersList });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.session.update({
    where: {
      sid: session.sid,
    },
    data: {
      device: device.type || 'unknown',
      browser: browser.name || 'unknown',
      os: os.name || 'unknown',
      engine: engine.name || 'unknown',
      expiresAt: expiresAt,
      lastClick: new Date(),
      location: pathname,
      ip: ip,
      isBot,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set('session', session.sid, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
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
