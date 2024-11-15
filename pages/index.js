import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobTable from "../components/JobTable";
import ActionCards from "../components/ActionCards";

export default function Home() {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Head>
        <title>Firelab Slurm Job Manager</title>
        <meta name="description" content="Manage your Slurm jobs with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main style={{ flex: "1", padding: "2rem" }}>
        <ActionCards />
        <JobTable />
      </main>

      <Footer />
    </div>
  );
}
