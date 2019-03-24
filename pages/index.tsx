import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './index.css';

const Homepage = () => (
  <>
    <Head>
      <title>Learn RxJS: Homepage</title>
    </Head>
    <main>
      <ul>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/timer"><a>Timer</a></Link></li>
      </ul>
    </main>
  </>
);

export default Homepage;
