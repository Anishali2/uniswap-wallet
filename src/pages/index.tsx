import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import WalletModal from '@/components/WalletModal';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletModal pendingTransactions={[]} confirmedTransactions={[]} />
    </div>
  );
}
