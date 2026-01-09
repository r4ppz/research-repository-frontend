import style from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className={style.container}>
      <div className={style.spinner} />
      {message && <p className={style.message}>{message}</p>}
    </div>
  );
};
