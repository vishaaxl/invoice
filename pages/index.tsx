import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";

import { database } from "firebaseConfig";
const dbInstance = collection(database, "invoices");

import Header from "@src/components/home/Header";
import ListItem from "@src/components/home/ListItem";
import Transitions from "@src/components/global/Transition";

import { useAppContext } from "@src/context";

const container = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const Home: NextPage = () => {
  const context = useAppContext();
  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(
        query(dbInstance, where("username", "==", session?.user?.email)),
        (snapshot) => {
          context?.saveInvoices(
            snapshot.docs.map((invoice) => ({
              ...invoice.data(),
              id: invoice.id,
            }))
          );
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Transitions key="home">
      <Head>
        <title>Invoices | Web app</title>
        <meta
          name="description"
          content="Web app to store and manage all your invoices"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗿</text></svg>"
        />
      </Head>
      <Header />

      {context && (
        <motion.div variants={container} initial="hidden" animate="show">
          {context?.invoices.map((invoice) => (
            <ListItem data={invoice} key={invoice.id} />
          ))}
        </motion.div>
      )}
    </Transitions>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
