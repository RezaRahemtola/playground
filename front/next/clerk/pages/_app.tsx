import '@/styles/globals.css';
import { ClerkProvider, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ClerkProvider>
    <SignedIn>
      <UserButton />
      <Component {...pageProps} />
    </SignedIn>
    <SignedOut>
      <div className='centered'>
        <SignUp appearance={{
        baseTheme: dark
      }}/>
      </div>
    </SignedOut>
  </ClerkProvider>
  )
}
