import { Fragment, ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="p-6 rounded-full box-shadow-lg">{children}</div>;
}

export function Listbox({ list, children }: { list: unknown[]; children: (el: unknown) => ReactNode }) {
  return (
    <ul>
      {list.map((el) => (
        <Fragment key={String(el)}>{children(el)}</Fragment>
      ))}
    </ul>
  );
}

export function withSearchbar<Props extends object>(Component: (props: Props) => JSX.Element) {
  function ComponentWithSearchbar(props: Props): JSX.Element {
    return (
      <div>
        <input type="search" />
        <Component {...props} />
      </div>
    );
  }

  return ComponentWithSearchbar;
}

const ListboxWithSearchbar = withSearchbar(Listbox);

export function App() {
  return (
    <Card>
      <h1>HELLO</h1>

      <Listbox list={[1, 2, 3]}>{(el) => <li>{String(el)}</li>}</Listbox>

      <ListboxWithSearchbar list={[1, 2, 3]}>{(el) => <li>{String(el)}</li>}</ListboxWithSearchbar>
    </Card>
  );
}
