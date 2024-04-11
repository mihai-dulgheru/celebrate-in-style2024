import BirthdayInvitation from "@/components/BirthdayInvitation";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <Head>
        <title>Invitație Zi de Naștere</title>
      </Head>
      <BirthdayInvitation />
      <Toaster />
    </main>
  );
}
