import Link from "next/link";
import { useRouter } from "next/router";

interface ButtonProps {
  children: React.ReactNode;
  link?: string;
}

const Button = ({ link, children }: ButtonProps) => {
  const Router = useRouter();
  return (
    <>
      {link ? (
        <button className="btn" onClick={() => Router.push(link)}>
          {children}
        </button>
      ) : (
        <button className="btn">{children}</button>
      )}
    </>
  );
};

export default Button;
