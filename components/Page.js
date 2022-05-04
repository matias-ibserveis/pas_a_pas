import Header from "./Header";

export default function Page(props) {
  const { children } = props;

  return (
    <div>
      <Header />
      <h2>I am the page component</h2>
      {children}
    </div>
  );
}
