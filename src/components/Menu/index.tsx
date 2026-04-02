import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { RouterLink } from "../RouterLink";

type AvailableThemes = "dark" | "light";
export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storedTheme =
      (localStorage.getItem("theme") as AvailableThemes) || "dark";
    return storedTheme === "light" ? "light" : "dark"; // Define o tema padrão como 'dark' se não houver um tema armazenado ou se o valor armazenado for inválido
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };
  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault(); // Evita o comportamento padrão do link de recarregar a página para href="#"

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "light" ? "dark" : "light";
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]); // O useEffect é usado para executar um efeito colateral (side effect) após a renderização do componente

  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menuLink}
        href="/"
        aria-label="Ir para Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/history/"
        aria-label="History"
        title="History"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/settings/"
        aria-label="Settings"
        title="Settings"
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Dark Mode"
        title="Dark Mode"
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
