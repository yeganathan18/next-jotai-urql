import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{paddingLeft: 20, paddingTop: 10}}>
      <h1>Home</h1>
      <h2>Traditional urql without Jotai </h2>
      <ol>
        <li style={{paddingBottom: 10}}>
        <Link href="/urql/one">Demo One</Link>
        </li>
      </ol>
      <h2>Jotai + Urql Demos </h2>
      <ol>
        <li style={{paddingBottom: 10}}>
          <Link href="/jotai/one">Demo One</Link>
        </li>
        <li style={{paddingBottom: 10}}>
          <Link href="/jotai/two">Demo Two</Link>
        </li>
      </ol>
    </div>
  );
}
