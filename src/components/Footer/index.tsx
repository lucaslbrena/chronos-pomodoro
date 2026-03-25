import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="/about-pomodoro">Entenda como funciona a tecnica pomodoro</a>
      <a href="">
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com React
      </a>
    </footer>
  );
}
